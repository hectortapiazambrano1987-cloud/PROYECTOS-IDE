/* Interfaz compartida para las unidades operativas PN y AMT. */
(() => {
  "use strict";

  const DATA = window.ENOS_DATA;
  const IDE = window.IDE_DATA;
  const PLAN = window.PLAN_DATA;
  const BOMB = window.BOMBEROS_DATA;
  const MAIN = document.querySelector("#app-main");
  const NAV_LINKS = [...document.querySelectorAll("[data-route]")];
  const MAPS = {
    ide: { path: "IDE/SITUACION_3/Diapositiva_02.png", width: 2001, height: 1125, title: "11 BCB «Galápagos» · Cantones afectados", short: "IDE", dataKey: "IDE", ratio: 2001 / 1125, event: "Situación N.º 3", date: "Alerta roja", place: "Provincia de Chimborazo", subtitle: "Situación N.º 3 · Provincia de Chimborazo · eventos múltiples simultáneos", flag: "SITUACIÓN 3" },
    pn: { path: "PN/PN MAPA EVENTO 3.jpeg", width: 1536, height: 1024, title: "Policía Nacional", short: "PN", dataKey: "PN", ratio: 1.5, event: "Evento 3", date: "27/11/2028 – 03:00" },
    amt: { path: "PN/AMT MAPA DESPLIEGUE.jpg", width: 1264, height: 843, title: "Agencia Metropolitana de Tránsito", short: "AMT", dataKey: "AMT", ratio: 1264 / 843, event: "Despliegue operativo", date: "Vía E28 – Noroccidente", place: "", subtitle: "Control, seguridad y movilidad · Vía E28 y desvíos hacia el sur", flag: "VÍA E28" },
    dmgr: { path: "MDMQ/MAPA MDMQ.jpeg", width: 1536, height: 1024, title: "Secretaría de Seguridad y Gestión de Riesgos", short: "DMGR", dataKey: "DMGR", ratio: 1.5 }
  };
  const ROUTES = ["ide", "dmgr", "pn", "bomberos", "amt"];
  const TABS = {
    ide: ["Resumen", "Cantones", "Zonas de impacto", "Población", "Personal", "Medios", "Instituciones", "Puntos"],
    dmgr: ["Resumen", "Acciones", "Inundaciones", "Por AZ", "Movimientos", "Recursos", "Puntos", "Simbología"],
    pn: ["Resumen", "Personal", "Detalle por punto", "Logística", "Coordinación", "Turnos", "Puntos", "Simbología + Nota"],
    amt: ["Resumen", "Puntos de control", "Desvíos", "Cierre especial", "Logística", "Puntos", "Simbología", "Observaciones"]
  };
  const COLORS = {
    red: "#e53935", amber: "#f5a623", purple: "#8e44ad", blue: "#1e88e5",
    orange: "#f57c00", green: "#2e9e4f", yellow: "#f2c94c", white: "#ffffff"
  };
  // Coordenadas de los puntos indicadas sobre las dimensiones originales de cada mapa.
  // IDE · Situación N.º 3: coordenadas en píxeles sobre "IDE/SITUACION_3/Diapositiva_02.png" (2001 × 1125).
  // Los cantones con alerta se marcan sobre su triángulo; sectors enlaza con la primera columna de las hojas IDE.
  const IDE_POINTS = [
    { name: "Pallatanga", x: 407, y: 665, type: "Alerta roja", color: "red", sectors: ["Pallatanga", "ERS-11"] },
    { name: "Cumandá", x: 266, y: 797, type: "Alerta roja", color: "red", sectors: ["Cumandá", "ERS-11"] },
    { name: "Alausí", x: 538, y: 708, type: "Alerta naranja", color: "orange", sectors: ["Alausí", "GCB-32"] },
    { name: "Chunchi", x: 486, y: 812, type: "Alerta naranja", color: "orange", sectors: ["Chunchi", "GCB-32"] },
    { name: "Riobamba", x: 692, y: 437, type: "Inundaciones (sin nivel)", color: "blue", sectors: ["Riobamba", "GCB-32"] },
    { name: "Guamote", x: 765, y: 655, type: "Sin alerta", color: "white", sectors: ["Guamote", "GCB-32"] },
    { name: "Colta", x: 436, y: 496, type: "Sin alerta", color: "white", sectors: ["Colta"] },
    { name: "Guano", x: 690, y: 283, type: "Sin alerta", color: "white", sectors: ["Guano"] },
    { name: "Penipe", x: 900, y: 277, type: "Sin alerta", color: "white", sectors: ["Penipe"] },
    { name: "Chambo", x: 885, y: 449, type: "Sin alerta", color: "white", sectors: ["Chambo"] }
  ];
  // Paneles clicables de la lámina 2 (x, y, ancho, alto en píxeles de la imagen).
  const IDE_LEGENDS = [
    { id: "riobamba", label: "Riobamba – inundaciones", box: [1160, 115, 775, 260], tab: "Población", sectors: ["Riobamba"] },
    { id: "alausi", label: "Alausí & Chunchi – movimientos en masa", box: [1160, 430, 775, 255], tab: "Cantones", sectors: ["Alausí", "Chunchi"] },
    { id: "pallatanga", label: "Pallatanga & Cumandá – bloqueos viales", box: [1160, 730, 775, 230], tab: "Zonas de impacto", sectors: ["Pallatanga", "Cumandá"] },
    { id: "alertas", label: "Leyenda: alerta naranja / alerta roja", box: [895, 838, 147, 228], tab: "Cantones", related: ["Alerta roja", "Alerta naranja"] },
    { id: "titulo", label: "Cantones afectados – Provincia de Chimborazo", box: [65, 65, 750, 140], tab: "Resumen", related: ["Alerta roja", "Alerta naranja", "Inundaciones (sin nivel)"] }
  ];
  // PN · Evento 3: coordenadas en píxeles sobre "PN/PN MAPA EVENTO 3.jpeg" (1536 × 1024).
  // sectors: valores de la primera columna de las hojas de PN relacionados con el punto.
  const PN_POINTS = [
    { name: "E28 Calacalí", x: 897, y: 390, type: "Control de tránsito", color: "red", sectors: ["E28 Calacalí"] },
    { name: "Nanegal", x: 672, y: 367, type: "Control de tránsito", color: "red", sectors: ["Nanegal"] },
    { name: "Redondel Mitad del Mundo", x: 858, y: 478, type: "Control de tránsito", color: "red", sectors: ["Redondel Mitad del Mundo"] },
    { name: "Quito urbano", x: 800, y: 537, type: "Infraestructura estratégica", color: "blue", sectors: ["Quito urbano"] },
    { name: "La Independencia", x: 891, y: 422, type: "Referencia vía E28", color: "white", sectors: ["La Independencia"], reference: true },
    { name: "Zona de afectación E28", x: 712, y: 342, type: "Incidente", color: "amber", sectors: ["Zona de afectación E28"], incident: true },
    { name: "Rumiñahui", x: 823, y: 725, type: "Coordinación fuera del DMQ", color: "yellow", sectors: ["Rumiñahui"] },
    { name: "Mejía", x: 788, y: 830, type: "Coordinación fuera del DMQ", color: "yellow", sectors: ["Mejía"] },
    { name: "Pedro Vicente Maldonado", x: 384, y: 437, type: "Coordinación fuera del DMQ", color: "yellow", sectors: ["Pedro Vicente Maldonado"] },
    { name: "Puerto Quito", x: 384, y: 330, type: "Coordinación fuera del DMQ", color: "yellow", sectors: ["Puerto Quito"] }
  ];
  // Paneles clicables de la lámina PN (x, y, ancho, alto en píxeles de la imagen).
  const PN_LEGENDS = [
    { id: "talento", label: "Talento humano", box: [8, 118, 346, 130], tab: "Personal" },
    { id: "distribucion", label: "Distribución del personal", box: [8, 255, 346, 262], tab: "Personal", related: ["Control de tránsito", "Infraestructura estratégica"] },
    { id: "logistica", label: "Medios logísticos", box: [8, 525, 346, 185], tab: "Logística" },
    { id: "turnos", label: "Turnos operativos", box: [8, 715, 346, 168], tab: "Turnos" },
    { id: "nota", label: "Nota", box: [8, 890, 346, 112], tab: "Simbología + Nota", related: ["Coordinación fuera del DMQ"] },
    { id: "simbologia", label: "Simbología", box: [372, 692, 315, 250], tab: "Simbología + Nota" },
    { id: "detalle", label: "Detalle por punto de intervención", box: [1140, 152, 390, 395], tab: "Detalle por punto", related: ["Control de tránsito", "Infraestructura estratégica"] },
    { id: "fuera", label: "Zonas fuera del DMQ – Coordinación", box: [1140, 555, 390, 197], tab: "Coordinación", related: ["Coordinación fuera del DMQ"] },
    { id: "resumen", label: "Resumen total Zona 9 DMQ", box: [1140, 762, 390, 225], tab: "Resumen" },
    { id: "via", label: "Vía E28 con afectación / cierre", box: [700, 360, 190, 90], tab: "Puntos", related: ["Incidente", "Referencia vía E28", "Control de tránsito"] }
  ];
  // AMT · coordenadas en píxeles sobre "PN/AMT MAPA DESPLIEGUE.jpg" (1264 × 843).
  // sectors: valores de la primera columna de las hojas AMT relacionados con el punto.
  const AMT_POINTS = [
    { name: "Punto de control 1 · Nanegalito", x: 550, y: 262, type: "Punto de control", color: "blue", sectors: ["Punto de control 1"] },
    { name: "Punto de control 2 · Km 78 Tulipe / Gualea", x: 500, y: 365, type: "Punto de control", color: "blue", sectors: ["Punto de control 2"] },
    { name: "Punto de control 3 · Pacto – Mashpi", x: 611, y: 152, type: "Punto de control", color: "blue", sectors: ["Punto de control 3"] },
    { name: "1.er filtro · Redondel del Condado", x: 573, y: 541, type: "Filtro de desvío", color: "green", sectors: ["1.er filtro"] },
    { name: "2.º filtro · Intercambiador Portal Shopping", x: 568, y: 488, type: "Filtro de desvío", color: "green", sectors: ["2.º filtro"] },
    { name: "3.er filtro · Redondel de San Antonio de Pichincha", x: 540, y: 434, type: "Filtro de desvío", color: "green", sectors: ["3.er filtro"] },
    { name: "Cierre especial · Y de Cusubamba", x: 736, y: 490, type: "Cierre especial", color: "orange", sectors: ["Cierre especial"] },
    { name: "Deslizamiento · Tulipe / Gualea", x: 742, y: 364, type: "Deslizamiento", color: "red", sectors: ["Deslizamiento"], incident: true },
    { name: "Mashpi", x: 580, y: 230, type: "Referencia", color: "white", sectors: [], reference: "Localidad sobre el eje central Pacto – Mashpi (Punto de control 3)." },
    { name: "Quito", x: 402, y: 587, type: "Referencia", color: "white", sectors: [], reference: "Origen de los desvíos hacia el sur." },
    { name: "Alóag – Santo Domingo", x: 590, y: 592, type: "Referencia", color: "white", sectors: [], reference: "Vía de destino de los desvíos de transporte pesado." }
  ];
  // Paneles clicables de la lámina AMT (x, y, ancho, alto en píxeles de la imagen).
  const AMT_LEGENDS = [
    { id: "pc1", label: "Punto de control 1 – Nanegalito, Vía E28", box: [8, 95, 370, 298], tab: "Puntos de control", sectors: ["Punto de control 1"] },
    { id: "desvios", label: "Desvíos hacia el sur (Vía Alóag – Santo Domingo)", box: [8, 398, 370, 252], tab: "Desvíos", related: ["Filtro de desvío"] },
    { id: "mision", label: "Nuestra misión", box: [8, 655, 370, 75], tab: "Resumen" },
    { id: "resumen", label: "Resumen de logística y personal", box: [8, 733, 566, 72], tab: "Logística", related: ["Punto de control", "Filtro de desvío"] },
    { id: "total", label: "Total logística y personal", box: [580, 733, 392, 72], tab: "Logística", related: ["Punto de control", "Filtro de desvío"] },
    { id: "pc2", label: "Punto de control 2 – Desvío Km 78, Tulipe / Gualea", box: [843, 95, 413, 245], tab: "Puntos de control", sectors: ["Punto de control 2", "Deslizamiento"] },
    { id: "pc3", label: "Punto de control 3 – Eje central Pacto – Mashpi", box: [843, 345, 413, 220], tab: "Puntos de control", sectors: ["Punto de control 3"] },
    { id: "cierre", label: "Cierre especial – Vía Cusubamba", box: [843, 570, 413, 155], tab: "Cierre especial", related: ["Cierre especial"] },
    { id: "simbologia", label: "Simbología", box: [385, 618, 452, 112], tab: "Simbología" }
  ];
  // floodRow: N.º de la hoja "Inundaciones en barrios"; rows: N.º de la hoja "Movimientos en masa".
  const DMGR_POINTS = [
    ...[["Cotocollao", 745, 305, 3], ["Comité del Pueblo", 750, 366, 1], ["Concepción", 755, 398, 2], ["Centro Histórico", 780, 462, 4], ["Puengasí", 684, 532, 5], ["La Argelia", 657, 565, 8], ["Guamaní", 650, 598, 6], ["La Ecuatoriana", 672, 633, 7], ["La Ferroviaria", 634, 661, 9]]
      .map(([name, x, y, floodRow]) => ({ name, x, y, floodRow, type: "Zonas de inundaciones", color: "red" })),
    ...[["Pomasqui", 893, 249, [5]], ["Calderón (La Capilla)", 895, 302, [2]], ["La Bota", 896, 345, [3]], ["Atucucho", 598, 347, [4]], ["La Comuna", 591, 380, [12]], ["San Juan", 612, 410, [10]], ["Monjas (Cuenca del río Monjas)", 570, 443, [6, 5]], ["El Madrigal", 591, 494, [7]], ["Av. Carlos Fortines", 854, 516, [1]], ["Parque Cuscungo", 820, 556, [8]], ["Prolongación Av. Simón Bolívar", 757, 594, [1]], ["Autopista General Rumiñahui", 852, 737, [9]]]
      .map(([name, x, y, rows]) => ({ name, x, y, rows, type: "Movimientos en masa", color: "amber" }))
  ];
  // Zonas clicables de la leyenda y paneles del mapa DMGR (x, y, ancho, alto en píxeles de la imagen).
  const DMGR_LEGENDS = [
    { id: "inundaciones", label: "Zonas de inundaciones", box: [435, 706, 205, 21], tab: "Inundaciones", related: "Zonas de inundaciones" },
    { id: "movimientos", label: "Movimientos en masa", box: [435, 727, 205, 21], tab: "Movimientos", related: "Movimientos en masa" },
    { id: "vias", label: "Vías principales", box: [435, 748, 205, 20], tab: "Simbología" },
    { id: "rios", label: "Ríos y quebradas principales", box: [435, 768, 205, 21], tab: "Simbología" },
    { id: "parroquial", label: "Límite parroquial (DMQ)", box: [435, 789, 205, 21], tab: "Simbología" },
    { id: "limite", label: "Límite del DMQ", box: [435, 810, 205, 17], tab: "Simbología" },
    ...[[155, 80], [240, 66], [310, 92], [405, 96], [505, 86], [595, 96], [695, 110]].map(([y, h], index) => ({ id: `accion-${index + 1}`, label: `Acción principal ${index + 1}`, box: [15, y, 393, h], tab: "Acciones", action: String(index + 1) })),
    { id: "panel-inundaciones", label: "Zonas de inundaciones en barrios", box: [1043, 118, 483, 338], tab: "Inundaciones", related: "Zonas de inundaciones" },
    { id: "panel-movimientos", label: "Zonas de movimientos en masa", box: [1043, 462, 483, 350], tab: "Movimientos", related: "Movimientos en masa" },
    { id: "recursos", label: "Recursos e instituciones desplegadas", box: [15, 828, 1511, 178], tab: "Recursos" }
  ];
  const KPI = {
    ide: [["323", "efectivos militares"], ["707", "personas aisladas"], ["273", "familias en AT"], ["5", "cantones con alerta"]],
    dmgr: [["1.296", "personas afectadas"], ["324", "familias afectadas"], ["684", "personal servidores"], ["354", "recursos totales"]],
    pn: [["24", "servidores por turno"], ["4", "puntos de intervención"], ["5", "patrulleros"], ["4", "motocicletas"]],
    amt: [["22", "agentes"], ["4", "patrulleros"], ["11", "motorizados"], ["37", "recursos totales"]]
  };
  const state = { route: "ide", subtab: {}, filters: {}, circles: true, zoom: 1, panX: 0, panY: 0, selectedPoint: null, relatedPoints: [], search: "", mapLegend: null, bombView: null, ideSection: "situacion", planHover: null, planPin: null, planOpen: false, planTab: "totales", planSort: null, planSearch: "", planExpanded: null };

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function sheetRows(unit, sheetName) {
    const sheet = DATA[unit].sheets[sheetName] || [];
    return { headers: sheet[2] || [], rows: sheet.slice(3).filter(row => row.some(value => value !== null && value !== "")) };
  }

  function renderTable(unit, sheetName, options = {}) {
    const { headers, rows } = sheetRows(unit, sheetName);
    if (!rows.length) return '<p class="map-empty-state">Sin registros en esta hoja.</p>';
    const body = rows.map(row => {
      const isTotal = String(row[0] || row[1] || "").toLowerCase().includes("total") || String(row[1] || "").toLowerCase().includes("subtotal");
      let relation = "";
      if (options.kind === "pn-sectors") relation = escapeHTML(row[0] || "");
      if (["amt-distribution", "dmgr-flood", "dmgr-mass"].includes(options.kind)) relation = escapeHTML(row[0] || "");
      return `<tr class="${options.kind ? "clickable" : ""} ${isTotal ? "total-row" : ""}" ${options.kind ? `data-row-kind="${options.kind}" data-row-value="${relation}"` : ""}>${row.map(value => `<td>${escapeHTML(value)}</td>`).join("")}</tr>`;
    }).join("");
    return `<div class="table-wrap"><table><thead><tr>${headers.map(value => `<th>${escapeHTML(value)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>`;
  }

  const NUMBER = new Intl.NumberFormat("es-EC");
  const PLAN_TABS = [["totales", "Resultados totales"], ["operaciones", "Operaciones"], ["semanal", "Resumen semanal"]];
  let planGrid = null;

  // Grupo del plan bajo una posición relativa del mapa (0–1), según la cuadrícula precalculada.
  function planGroupAt(fx, fy) {
    if (!planGrid) {
      const [dims, rows] = PLAN.MAP.grid.split("#");
      const [width, height] = dims.split("x").map(Number);
      const cells = new Uint8Array(width * height);
      rows.split("|").forEach((row, y) => {
        let x = 0;
        row.split(",").forEach(run => { const value = Number(run[0]), count = Number(run.slice(1)); cells.fill(value, y * width + x, y * width + x + count); x += count; });
      });
      planGrid = { width, height, cells };
    }
    if (fx < 0 || fy < 0 || fx >= 1 || fy >= 1) return 0;
    const x = Math.floor(fx * PLAN.MAP.width / 8), y = Math.floor(fy * PLAN.MAP.height / 8);
    return x < planGrid.width && y < planGrid.height ? planGrid.cells[y * planGrid.width + x] : 0;
  }

  function renderHome() {
    const { MAP, GROUPS, OPERATIONS, WEEKLY } = PLAN;
    const overlays = Object.keys(GROUPS).map(id => `<img class="plan-overlay" data-group-overlay="${id}" src="IDE/sectores/grupo-${id}.png" alt="">`).join("");
    const markers = OPERATIONS.map(op => `<button class="map-marker plan-op" type="button" data-op="${op.n}" title="Operación ${op.n}: ${escapeHTML(op.place)}" aria-label="Operación ${op.n}: ${escapeHTML(op.place)}" style="left:${op.x / MAP.width * 100}%;top:${op.y / MAP.height * 100}%;--marker-color:#e53935"></button>`).join("");
    const chips = Object.entries(GROUPS).map(([id, group]) => `<button class="filter-chip plan-chip" type="button" data-group="${id}" aria-pressed="false"><span class="filter-swatch" style="--swatch:${group.color}"></span>${group.name}</button>`).join("");
    const kpis = [[NUMBER.format(WEEKLY[1][1]), "operaciones en la semana"], [NUMBER.format(WEEKLY[2][1]), "personal empleado"], [OPERATIONS.length, "operaciones con resultados"], [NUMBER.format(PLAN.RESULTS.find(r => r.name === "Aprehendidos").total), "aprehendidos"]];
    return `<section class="map-layout plan-layout"><div class="map-column"><div class="map-topline"><div class="map-heading"><h2>Plan Defensa de Quito</h2><p>Pase el mouse sobre cada sector de color · clic para fijarlo</p></div><button class="plan-totals-button" type="button" aria-expanded="${state.planOpen}">▦ Resultados totales</button></div>
      <div class="map-toolbar"><div class="filter-list">${chips}</div>${renderZoomControls(false)}</div>
      <div class="map-viewport" aria-label="Visor interactivo del mapa"><div class="map-content" style="--map-ratio:${MAP.width / MAP.height}"><img class="map-image" src="${MAP.path}" alt="Plan Defensa de Quito: sectores por grupos"><div class="plan-overlays">${overlays}</div><div class="marker-layer">${markers}</div></div></div>
      <div class="map-caption"><span>Ctrl + rueda para zoom · arrastre para desplazarse</span><span>${OPERATIONS.length} operaciones marcadas</span></div></div>
      <aside class="side-panel"><div class="panel-title-row"><div><h2>Resultados</h2><p>Operaciones por sector</p></div><span class="unit-flag">SEMANA</span></div>
      <div class="kpi-grid">${kpis.map(([value, label]) => `<div class="kpi"><div class="kpi-value">${value}</div><div class="kpi-label">${label}</div></div>`).join("")}</div>
      <section class="detail-box plan-detail" aria-live="polite">${renderPlanDetail(state.planPin)}</section></aside></section>
      <section class="page-shell plan-results" ${state.planOpen ? "" : "hidden"}><div class="section-heading"><h2>Resultados del Plan Defensa de Quito</h2><p>Fuente: Resultados_Plan_Defensa_Quito_por_Sector.xlsx</p></div>
      <nav class="data-tabs ide-tabs" aria-label="Resultados">${PLAN_TABS.map(([id, label]) => `<button class="data-tab ${state.planTab === id ? "active" : ""}" type="button" data-plan-tab="${id}">${label}</button>`).join("")}</nav>
      <section class="plan-tab-content">${renderPlanTab()}</section></section>
      <section class="page-shell ide-page"><div class="section-heading"><h2>Información de la carpeta IDE</h2><p>Situación N.º 3, concepto de la operación y láminas del Evento 8.</p></div>
      <nav class="data-tabs ide-tabs" aria-label="Información IDE">${IDE.SECTIONS.map(section => `<button class="data-tab ${state.ideSection === section.id ? "active" : ""}" type="button" data-ide-section="${section.id}">${escapeHTML(section.label)}</button>`).join("")}</nav>
      <section class="ide-section">${renderIdeSection(state.ideSection)}</section></section>`;
  }

  // Resultados con cantidad > 0 de los sectores indicados, con barra de participación sobre el total.
  function renderSectorResults(sectors) {
    const rows = PLAN.RESULTS.map(result => ({ ...result, value: sectors.reduce((sum, index) => sum + result.bySector[index], 0) })).filter(row => row.value > 0);
    return `<div class="plan-result-list">${rows.map(row => `<div class="plan-result-row"><div class="plan-result-top"><span>${escapeHTML(row.name)}</span><strong>${NUMBER.format(row.value)} <small>${escapeHTML(row.unit)}</small></strong></div><div class="plan-bar" title="${Math.round(row.value / row.total * 100)} % del total (${NUMBER.format(row.total)})"><span style="width:${Math.max(2, row.value / row.total * 100)}%"></span></div></div>`).join("")}</div><p class="detail-meta plan-note">Barra: participación sobre el resultado total. ${escapeHTML(PLAN.ESTIMATE_NOTE)}</p>`;
  }

  function renderPlanDetail(focus) {
    const meta = (label, value) => `<p class="detail-meta"><strong>${escapeHTML(label)}:</strong> ${escapeHTML(value)}</p>`;
    if (!focus) {
      const summary = Object.entries(PLAN.GROUPS).map(([id, group]) => { const ops = PLAN.OPERATIONS.filter(op => op.group === Number(id)).length; return `<button class="plan-group-row" type="button" data-group="${id}"><span class="filter-swatch" style="--swatch:${group.color}"></span><span>${group.name}</span><span>${ops ? `${ops} operación${ops > 1 ? "es" : ""}` : "sin resultados"}</span></button>`; }).join("");
      return `<p class="detail-label">Sectores del plan</p><p class="detail-empty">Pase el mouse sobre un sector de color del mapa o un punto rojo para ver sus resultados.</p><div class="plan-group-list">${summary}</div><p class="detail-meta plan-note">${escapeHTML(PLAN.GROUP_1)}</p>`;
    }
    const [kind, id] = focus.split(":");
    if (kind === "g") {
      const group = PLAN.GROUPS[id];
      const ops = PLAN.OPERATIONS.filter(op => op.group === Number(id));
      const body = group.sectors.length
        ? `<p class="detail-label plan-sub">Operaciones con resultados</p>${ops.map(op => `<button class="plan-op-link" type="button" data-op="${op.n}"><b>${op.n}</b> ${escapeHTML(PLAN.SECTORS[op.sector])}</button>`).join("")}<p class="detail-label plan-sub">Resultados del grupo</p>${renderSectorResults(group.sectors)}`
        : '<p class="detail-empty plan-sub">Sin operaciones con resultados registradas para este grupo.</p>';
      return `<div class="plan-detail-head" style="--group-color:${group.color}"><span></span><h3 class="detail-name">${group.name}</h3></div>${meta("Parroquias", group.parishes)}${body}`;
    }
    const op = PLAN.OPERATIONS.find(item => item.n === Number(id));
    const group = PLAN.GROUPS[op.group];
    return `<div class="plan-detail-head" style="--group-color:${group.color}"><span>${op.n}</span><h3 class="detail-name">${escapeHTML(PLAN.SECTORS[op.sector])}</h3></div>${meta("Rótulo", op.label)}${meta("Sector del mapa", op.place)}${meta("Grupo", `${group.name} – ${op.limit}`)}${meta("Fecha y hora (foto)", op.date)}${meta("Coordenadas", op.lat === "-" ? "No visibles" : `${op.lat}, ${op.lon}`)}${meta("La foto muestra", op.photo)}<p class="detail-label plan-sub">Resultados de la operación</p>${renderSectorResults([op.sector])}`;
  }

  function renderPlanTab() {
    if (state.planTab === "operaciones") {
      return `<div class="plan-op-grid">${PLAN.OPERATIONS.map(op => { const group = PLAN.GROUPS[op.group]; const main = PLAN.RESULTS.map(r => [r, r.bySector[op.sector]]).filter(([, v]) => v > 0).sort((a, b) => b[1] / b[0].total - a[1] / a[0].total).slice(0, 3); return `<article class="plan-op-card" style="--group-color:${group.color}"><header><span>${op.n}</span><div><h3>${escapeHTML(PLAN.SECTORS[op.sector])}</h3><p>${escapeHTML(op.place)} · ${group.name}</p></div></header><p><strong>Fecha y hora:</strong> ${escapeHTML(op.date)}</p><p><strong>Coordenadas:</strong> ${op.lat === "-" ? "No visibles" : `${escapeHTML(op.lat)}, ${escapeHTML(op.lon)}`}</p><p><strong>La foto muestra:</strong> ${escapeHTML(op.photo)}</p><div class="ide-chips">${main.map(([r, v]) => `<span>${escapeHTML(r.name)}: ${NUMBER.format(v)} ${escapeHTML(r.unit)}</span>`).join("")}</div><button class="plan-locate" type="button" data-locate="${op.n}">⌖ Ver en el mapa</button></article>`; }).join("")}</div>`;
    }
    if (state.planTab === "semanal") {
      return `<div class="plan-week-grid">${PLAN.WEEKLY.map(([label, value, detail], index) => `<${index === PLAN.WEEKLY.length - 1 ? 'button type="button" data-plan-tab="operaciones"' : "div"} class="plan-week-tile ${value === 0 ? "zero" : ""}"><strong>${NUMBER.format(value)}</strong><span>${escapeHTML(label)}</span>${detail ? `<small>${escapeHTML(detail)}</small>` : ""}</${index === PLAN.WEEKLY.length - 1 ? "button" : "div"}>`).join("")}</div><p class="table-note">Cifras tal como aparecen en la diapositiva. Seleccione el último indicador para ver las operaciones.</p>`;
    }
    const sort = state.planSort;
    const query = state.planSearch.trim().toLowerCase();
    let rows = PLAN.RESULTS.map((result, index) => ({ ...result, index })).filter(row => !query || row.name.toLowerCase().includes(query) || row.unit.toLowerCase().includes(query));
    if (sort) rows = [...rows].sort((a, b) => (sort.key === "total" ? a.total - b.total : a[sort.key].localeCompare(b[sort.key], "es")) * sort.dir);
    const header = (key, label) => `<th><button class="plan-sort" type="button" data-sort="${key}">${label} ${sort?.key === key ? (sort.dir > 0 ? "▲" : "▼") : "↕"}</button></th>`;
    const body = rows.map(row => {
      const open = state.planExpanded === row.index;
      const breakdown = open ? `<tr class="plan-breakdown"><td colspan="3">${PLAN.SECTORS.map((sector, i) => `<div class="plan-bar-row"><span>${escapeHTML(sector)}</span><div class="plan-bar"><span style="width:${row.bySector[i] / row.total * 100}%"></span></div><strong>${NUMBER.format(row.bySector[i])}</strong></div>`).join("")}<p class="table-note">${escapeHTML(PLAN.ESTIMATE_NOTE)}</p></td></tr>` : "";
      return `<tr class="clickable ${open ? "row-selected" : ""}" data-result="${row.index}" aria-expanded="${open}"><td>${open ? "▾" : "▸"} ${escapeHTML(row.name)}</td><td>${escapeHTML(row.unit)}</td><td class="plan-total">${NUMBER.format(row.total)}</td></tr>${breakdown}`;
    }).join("") || '<tr><td colspan="3">Sin coincidencias.</td></tr>';
    return `<input class="search-input plan-search" type="search" placeholder="Buscar resultado o unidad…" aria-label="Buscar resultado" value="${escapeHTML(state.planSearch)}"><div class="table-wrap"><table class="plan-table"><thead><tr>${header("name", "Resultado")}${header("unit", "Unidad")}${header("total", "Resultado total")}</tr></thead><tbody>${body}</tbody></table></div><p class="table-note">Seleccione una fila para ver su distribución por sector. Pase el mouse sobre una fila para iluminar en el mapa los grupos donde se obtuvo.</p>`;
  }

  function renderIdeSection(id) {
    const section = IDE.SECTIONS.find(item => item.id === id) || IDE.SECTIONS[0];
    const images = [section.image, section.extraImage, section.thirdImage].filter(Boolean);
    return `<p class="eyebrow">${escapeHTML(section.source)}</p>${section.html}
      <details class="ide-originals"><summary>Ver lámina${images.length > 1 ? "s" : ""} original${images.length > 1 ? "es" : ""}</summary><div class="ide-original-grid">${images.map(src => `<a href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="Lámina original: ${escapeHTML(section.label)}" loading="lazy"></a>`).join("")}</div></details>`;
  }

  // Pestaña IDE · Situación N.º 3: secciones con la información de cada lámina, debajo del mapa.
  function renderIdeInfo() {
    if (!IDE.SECTIONS.some(section => section.id === state.ideSection)) state.ideSection = IDE.SECTIONS[0].id;
    return `<section class="page-shell ide-page"><div class="section-heading"><h2>Situación N.º 3 · 11 BCB «Galápagos»</h2><p>Fuente: SITUACION_3.pptx · IDE/SITUACION_3/SITUACION_3_Datos.xlsx</p></div>
      <nav class="data-tabs ide-tabs" aria-label="Información de la situación">${IDE.SECTIONS.map(section => `<button class="ide-tab-button data-tab ${state.ideSection === section.id ? "active" : ""}" type="button" data-ide-section="${section.id}">${escapeHTML(section.label)}</button>`).join("")}</nav>
      <section class="ide-section">${renderIdeSection(state.ideSection)}</section></section>`;
  }

  function bindIdeInfo() {
    MAIN.querySelectorAll("[data-ide-section]").forEach(button => button.addEventListener("click", () => {
      state.ideSection = button.dataset.ideSection;
      MAIN.querySelectorAll("[data-ide-section]").forEach(tab => tab.classList.toggle("active", tab === button));
      MAIN.querySelector(".ide-section").innerHTML = renderIdeSection(state.ideSection);
    }));
  }

  function bindHome() {
    bindPanZoom();
    const viewport = MAIN.querySelector(".map-viewport");
    const image = MAIN.querySelector(".map-image");
    const detail = MAIN.querySelector(".plan-detail");
    const results = MAIN.querySelector(".plan-results");
    const tabContent = MAIN.querySelector(".plan-tab-content");
    let shownFocus;

    const groupOf = focus => !focus ? 0 : focus.startsWith("g:") ? Number(focus.slice(2)) : PLAN.OPERATIONS.find(op => op.n === Number(focus.slice(3))).group;
    const showOverlays = ids => MAIN.querySelectorAll("[data-group-overlay]").forEach(img => img.classList.toggle("active", ids.includes(Number(img.dataset.groupOverlay))));
    // Enfoque visible: lo que está bajo el mouse o, si no hay nada, lo que el usuario fijó con un clic.
    const refresh = () => {
      const focus = state.planHover || state.planPin;
      showOverlays(focus ? [groupOf(focus)] : []);
      MAIN.querySelectorAll(".plan-op").forEach(marker => marker.classList.toggle("selected", focus === `op:${marker.dataset.op}`));
      MAIN.querySelectorAll(".plan-chip").forEach(chip => chip.setAttribute("aria-pressed", String(state.planPin === `g:${chip.dataset.group}`)));
      viewport.classList.toggle("plan-hovering", Boolean(state.planHover));
      if (focus !== shownFocus) { detail.innerHTML = renderPlanDetail(focus); shownFocus = focus; }
    };
    const hover = focus => { if (state.planHover !== focus) { state.planHover = focus; refresh(); } };
    const pin = focus => { state.planPin = state.planPin === focus ? null : focus; refresh(); };
    const groupUnder = event => { const r = image.getBoundingClientRect(); return planGroupAt((event.clientX - r.left) / r.width, (event.clientY - r.top) / r.height); };

    let down = null;
    viewport.addEventListener("pointerdown", event => { down = { x: event.clientX, y: event.clientY }; });
    viewport.addEventListener("pointermove", event => {
      if (event.target.closest(".plan-op")) return;
      const group = groupUnder(event);
      hover(group ? `g:${group}` : null);
    });
    viewport.addEventListener("pointerleave", () => hover(null));
    viewport.addEventListener("click", event => {
      if (event.target.closest(".plan-op") || !down || Math.hypot(event.clientX - down.x, event.clientY - down.y) > 5) return;
      const group = groupUnder(event);
      if (group) pin(`g:${group}`);
    });
    MAIN.querySelectorAll(".plan-op").forEach(marker => {
      marker.addEventListener("mouseenter", () => hover(`op:${marker.dataset.op}`));
      marker.addEventListener("mouseleave", () => hover(null));
      marker.addEventListener("click", () => pin(`op:${marker.dataset.op}`));
    });
    MAIN.querySelectorAll(".plan-chip").forEach(chip => {
      chip.addEventListener("mouseenter", () => hover(`g:${chip.dataset.group}`));
      chip.addEventListener("mouseleave", () => hover(null));
      chip.addEventListener("click", () => pin(`g:${chip.dataset.group}`));
    });
    detail.addEventListener("click", event => {
      const target = event.target.closest("[data-group], [data-op]");
      if (!target) return;
      state.planHover = null;
      pin(target.dataset.group ? `g:${target.dataset.group}` : `op:${target.dataset.op}`);
    });

    MAIN.querySelector(".plan-totals-button").addEventListener("click", event => {
      state.planOpen = !state.planOpen;
      results.hidden = !state.planOpen;
      event.currentTarget.setAttribute("aria-expanded", String(state.planOpen));
      if (state.planOpen) results.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    const setTab = tab => {
      state.planTab = tab;
      MAIN.querySelectorAll(".plan-results .data-tab").forEach(button => button.classList.toggle("active", button.dataset.planTab === tab));
      tabContent.innerHTML = renderPlanTab();
    };
    MAIN.querySelectorAll(".plan-results .data-tab").forEach(button => button.addEventListener("click", () => setTab(button.dataset.planTab)));
    // Delegación: el contenido de la pestaña se vuelve a dibujar con cada cambio.
    tabContent.addEventListener("click", event => {
      const sortButton = event.target.closest("[data-sort]");
      const row = event.target.closest("[data-result]");
      const locate = event.target.closest("[data-locate]");
      const tile = event.target.closest("[data-plan-tab]");
      if (sortButton) {
        // Cada clic en el encabezado alterna: primer orden → orden inverso → orden original.
        const key = sortButton.dataset.sort;
        const first = key === "total" ? -1 : 1;
        state.planSort = state.planSort?.key !== key ? { key, dir: first } : state.planSort.dir === first ? { key, dir: -first } : null;
      } else if (row) {
        state.planExpanded = state.planExpanded === Number(row.dataset.result) ? null : Number(row.dataset.result);
      } else if (locate) {
        state.planHover = null;
        state.planPin = `op:${locate.dataset.locate}`;
        refresh();
        viewport.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      } else if (tile) {
        setTab(tile.dataset.planTab);
        return;
      } else return;
      tabContent.innerHTML = renderPlanTab();
    });
    tabContent.addEventListener("input", event => {
      if (!event.target.classList.contains("plan-search")) return;
      state.planSearch = event.target.value;
      const position = event.target.selectionStart;
      tabContent.innerHTML = renderPlanTab();
      const search = tabContent.querySelector(".plan-search");
      search.focus();
      search.setSelectionRange(position, position);
    });
    // Al pasar sobre una fila de resultados se iluminan los grupos donde se obtuvo ese resultado.
    tabContent.addEventListener("mouseover", event => {
      const row = event.target.closest("[data-result]");
      if (!row) return;
      const result = PLAN.RESULTS[Number(row.dataset.result)];
      showOverlays(Object.entries(PLAN.GROUPS).filter(([, group]) => group.sectors.some(index => result.bySector[index] > 0)).map(([id]) => Number(id)));
    });
    tabContent.addEventListener("mouseleave", refresh);
    refresh();

    MAIN.querySelectorAll("[data-ide-section]").forEach(button => button.addEventListener("click", () => {
      state.ideSection = button.dataset.ideSection;
      MAIN.querySelectorAll("[data-ide-section]").forEach(tab => tab.classList.toggle("active", tab === button));
      MAIN.querySelector(".ide-section").innerHTML = renderIdeSection(state.ideSection);
    }));
  }

  const BOMB_ICONS = {
    recursos: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 30V16h22v14M26 20h9l7 8v6H26zM4 30h22v4H4z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="12" cy="36" r="4" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="34" cy="36" r="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M8 12h14" stroke="currentColor" stroke-width="2.5"/></svg>',
    estaciones: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 20 24 8l18 12M10 18v22h28V18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M17 40V28h14v12M17 34h14" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="24" cy="20" r="2.5" fill="currentColor"/></svg>'
  };

  function renderBomberos() {
    const { WIDTH, HEIGHT, VIEWS } = BOMB;
    const switcher = `<div class="bomb-switch">${Object.entries(VIEWS).map(([id, view]) => `<button class="bomb-option ${state.bombView === id ? "active" : ""}" type="button" data-bomb-view="${id}" aria-pressed="${state.bombView === id}">${BOMB_ICONS[id]}<span>${view.label}</span></button>`).join("")}</div>`;
    const view = VIEWS[state.bombView];
    if (!view) return `<section class="page-shell bomb-page"><div class="section-heading"><h2>Cuerpo de Bomberos de Quito</h2><p>Seleccione una opción para desplegar su lámina interactiva.</p></div>${switcher}</section>`;
    const hotspots = view.hotspots.map((spot, index) => { const [x, y, w, h] = spot.box; return `<button class="bomb-hotspot ${spot.marker ? "marker" : ""}" type="button" data-hotspot="${index}" aria-label="${escapeHTML(spot.info.title)}" style="left:${x / WIDTH * 100}%;top:${y / HEIGHT * 100}%;width:${w / WIDTH * 100}%;height:${h / HEIGHT * 100}%"></button>`; }).join("");
    return `<section class="page-shell bomb-page">${switcher}
      <div class="map-toolbar"><div class="map-heading"><h2>${escapeHTML(view.title)}</h2></div>${renderZoomControls(false)}</div>
      <div class="map-viewport" aria-label="Visor interactivo"><div class="map-content" style="--map-ratio:${WIDTH / HEIGHT}"><img class="map-image" src="${view.path}" alt="${escapeHTML(view.title)}"><div class="marker-layer">${hotspots}</div></div></div>
      <div class="map-caption"><span>Pase el mouse (o toque) sobre cada elemento para ver su información · Ctrl + rueda para zoom · arrastre para desplazarse</span><span>${view.hotspots.length} elementos</span></div>
      <div class="bomb-tip" role="tooltip" hidden></div></section>`;
  }

  function renderBombTip(info) {
    const rows = info.rows.map(([label, value]) => `<p class="detail-meta"><strong>${escapeHTML(label)}:</strong> ${escapeHTML(value)}</p>`).join("");
    const list = info.list ? `<p class="detail-label bomb-tip-sub">${escapeHTML(info.list.heading)}</p>${info.list.items.map(([label, value]) => `<p class="detail-meta"><strong>${escapeHTML(label)}:</strong> ${escapeHTML(value)}</p>`).join("")}` : "";
    return `<h3 class="detail-name">${escapeHTML(info.title)}</h3>${rows}${list}${info.note ? `<p class="detail-meta bomb-tip-note">${escapeHTML(info.note)}</p>` : ""}`;
  }

  function bindBomberos() {
    MAIN.querySelectorAll("[data-bomb-view]").forEach(button => button.addEventListener("click", () => {
      state.bombView = button.dataset.bombView;
      render();
    }));
    if (!BOMB.VIEWS[state.bombView]) return;
    bindPanZoom();
    const tip = MAIN.querySelector(".bomb-tip");
    const spots = BOMB.VIEWS[state.bombView].hotspots;
    const place = (clientX, clientY) => {
      const gap = 16;
      const { width, height } = tip.getBoundingClientRect();
      const left = clientX + gap + width > window.innerWidth ? clientX - gap - width : clientX + gap;
      const top = Math.min(Math.max(8, clientY - height / 2), window.innerHeight - height - 8);
      tip.style.left = `${Math.max(8, left)}px`;
      tip.style.top = `${top}px`;
    };
    const show = (button, clientX, clientY) => {
      MAIN.querySelectorAll(".bomb-hotspot.active").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      tip.innerHTML = renderBombTip(spots[Number(button.dataset.hotspot)].info);
      tip.hidden = false;
      place(clientX, clientY);
    };
    const hide = () => { tip.hidden = true; MAIN.querySelectorAll(".bomb-hotspot.active").forEach(item => item.classList.remove("active")); };
    MAIN.querySelectorAll(".bomb-hotspot").forEach(button => {
      button.addEventListener("mouseenter", event => show(button, event.clientX, event.clientY));
      button.addEventListener("mousemove", event => place(event.clientX, event.clientY));
      button.addEventListener("mouseleave", hide);
      button.addEventListener("focus", () => { const r = button.getBoundingClientRect(); show(button, r.right, r.top + r.height / 2); });
      button.addEventListener("blur", hide);
      // En pantallas táctiles no hay hover: el toque muestra la información.
      button.addEventListener("click", event => show(button, event.clientX, event.clientY));
    });
    MAIN.querySelector(".map-viewport").addEventListener("pointerdown", event => { if (!event.target.closest(".bomb-hotspot")) hide(); });
  }

  function legendSet(route) { return { dmgr: DMGR_LEGENDS, pn: PN_LEGENDS, amt: AMT_LEGENDS, ide: IDE_LEGENDS }[route] || []; }

  // Detalle de un cantón de la Situación N.º 3 a partir de las hojas IDE.
  function ideCantonBody(name) {
    const meta = (label, value) => `<p class="detail-meta"><strong>${escapeHTML(label)}:</strong> ${escapeHTML(value)}</p>`;
    const canton = sheetRows("IDE", "Cantones afectados").rows.find(row => row[0] === name);
    const unit = sheetRows("IDE", "Personal militar").rows.find(row => String(row[2] || "").includes(name));
    const zones = sheetRows("IDE", "Zonas de impacto").rows.filter(row => row[0] === name);
    const people = sheetRows("IDE", "Población aislada").rows.filter(row => row[0] === name);
    let html = canton ? meta("Evento", canton[1]) + meta("Alerta", canton[2]) + `<p class="detail-meta">${escapeHTML(canton[4])}</p>` : '<p class="detail-meta">Sin alerta registrada en la lámina.</p>';
    if (unit) html += meta("Unidad responsable", `${unit[0]} (${unit[1]} efectivos)`);
    if (zones.length) html += `<p class="detail-label bomb-tip-sub">Zonas de impacto</p><ul class="detail-list">${zones.map(row => `<li>${escapeHTML(row[1])}: ${escapeHTML(row[2])} · ${escapeHTML(row[3])} · prioridad ${escapeHTML(row[4])}</li>`).join("")}</ul>`;
    if (people.length) html += `<p class="detail-label bomb-tip-sub">Población aislada</p><ul class="detail-list">${people.map(row => `<li>${escapeHTML(row[1])}: ${escapeHTML(row[2])} familias · ${escapeHTML(row[3])} personas</li>`).join("")}</ul>`;
    return html;
  }

  function renderIdeLegendDetail(legend) {
    const meta = (label, value) => `<p class="detail-meta"><strong>${escapeHTML(label)}:</strong> ${escapeHTML(value)}</p>`;
    let body = "";
    if (legend.sectors) body = legend.sectors.map(name => `<p class="detail-label bomb-tip-sub">${escapeHTML(name)}</p>${ideCantonBody(name)}`).join("");
    else if (legend.id === "alertas") body = sheetRows("IDE", "Cantones afectados").rows.map(row => meta(row[0], `${row[2]} · ${row[1]}`)).join("") + '<p class="detail-meta">Nivel interpretado por el color de cada recuadro de la lámina.</p>';
    else body = sheetRows("IDE", "Datos generales").rows.slice(1, 7).map(row => meta(row[0], row[1])).join("");
    return `<h3 class="detail-name">${escapeHTML(legend.label)}</h3>${body}<p class="detail-meta detail-hint">Información ampliada en la pestaña «${escapeHTML(legend.tab)}».</p>`;
  }

  // Detalle de un punto AMT a partir de las hojas, enlazado por su primera columna.
  function amtPointBody(key) {
    const meta = (label, value) => `<p class="detail-meta"><strong>${escapeHTML(label)}:</strong> ${escapeHTML(value)}</p>`;
    const control = sheetRows("AMT", "Puntos de control").rows.find(row => row[0] === key);
    if (control) {
      const tasks = sheetRows("AMT", "Funciones").rows.filter(row => row[0] === key);
      return meta("Ubicación", control[1]) + meta("Agentes", control[2]) + meta("Patrulleros", control[3]) + meta("Motos", control[4]) + meta("Total recursos", control[5]) + `<ul class="detail-list">${tasks.map(row => `<li>${escapeHTML(row[1])}</li>`).join("")}</ul>`;
    }
    const filter = sheetRows("AMT", "Desvíos hacia el sur").rows.find(row => row[0] === key);
    if (filter) return meta("Ubicación", filter[1]) + meta("Agentes", filter[2]) + meta("Motorizados", filter[3]) + '<p class="detail-meta">Controlan el flujo vehicular hacia la vía Alóag – Santo Domingo.</p>';
    if (key === "Cierre especial") return `<ul class="detail-list">${sheetRows("AMT", "Cierre especial").rows.map(row => `<li>${escapeHTML(row[1])}</li>`).join("")}</ul><p class="detail-meta">La lámina no indica recursos asignados a este cierre.</p>`;
    if (key === "Deslizamiento") return meta("Sector", "Tulipe / Gualea") + meta("Punto de control a cargo", "Punto de control 2 · Desvío Km 78") + '<p class="detail-meta">El perímetro del deslizamiento lo controlan 4 agentes y 4 motos.</p>';
    return "";
  }

  function renderAmtLegendDetail(legend) {
    const meta = (label, value) => `<p class="detail-meta"><strong>${escapeHTML(label)}:</strong> ${escapeHTML(value)}</p>`;
    let body = "";
    if (legend.sectors) body = legend.sectors.map(key => (legend.sectors.length > 1 ? `<p class="detail-label bomb-tip-sub">${escapeHTML(key)}</p>` : "") + amtPointBody(key)).join("");
    else if (legend.id === "desvios") body = sheetRows("AMT", "Desvíos hacia el sur").rows.map(row => meta(row[0] === "TOTAL" ? "Total" : `${row[0]} · ${row[1]}`, `${row[2]} agentes · ${row[3]} motorizado${row[3] > 1 ? "s" : ""}`)).join("");
    else if (legend.id === "resumen" || legend.id === "total") body = sheetRows("AMT", "Resumen logística").rows.map(row => meta(row[0], `${row[3]} (control ${row[1]} + desvíos ${row[2]})`)).join("");
    else if (legend.id === "cierre") body = amtPointBody("Cierre especial");
    else if (legend.id === "mision") body = sheetRows("AMT", "Datos generales").rows.filter(row => ["Nuestra misión", "Lema", "Mensaje"].includes(row[0])).map(row => meta(row[0], row[1])).join("");
    else body = sheetRows("AMT", "Simbología").rows.map(row => meta(row[0], row[1])).join("");
    return `<h3 class="detail-name">${escapeHTML(legend.label)}</h3>${body}<p class="detail-meta detail-hint">Información ampliada en la pestaña «${escapeHTML(legend.tab)}».</p>`;
  }

  function renderPnLegendDetail(legend) {
    const meta = (label, value) => `<p class="detail-meta"><strong>${escapeHTML(label)}:</strong> ${escapeHTML(value)}</p>`;
    const rowsOf = sheet => sheetRows("PN", sheet).rows;
    let body = "";
    if (legend.id === "talento" || legend.id === "resumen") body = meta("Servidores policiales", "24") + meta("Patrulleros", "5") + meta("Motocicletas", "4") + meta("Unidades logísticas", "9");
    else if (legend.id === "distribucion" || legend.id === "detalle") body = rowsOf("Distribución personal").map(row => meta(row[0], `${row[2]} servidores${row[1] ? ` · ${row[1]}` : ""}`)).join("");
    else if (legend.id === "logistica") body = rowsOf("Medios logísticos").map(row => meta(row[0], `${row[1]}${row[0] === "TOTAL" ? " unidades" : ` · ${row[2]}`}`)).join("");
    else if (legend.id === "turnos") body = rowsOf("Turnos").map(row => meta(row[0], `${row[1]} · ${row[2]}`)).join("");
    else if (legend.id === "nota" || legend.id === "fuera") body = rowsOf("Zonas fuera del DMQ").map(row => meta(row[0], row[1])).join("");
    else if (legend.id === "via") body = meta("Vía", "E28 Calacalí – Nanegal") + meta("Estado", "Afectación / cierre") + meta("Puntos de control", "E28 Calacalí y Nanegal (8 servidores c/u)") + `<p class="detail-meta">El triángulo rojo marca la zona de afectación sobre la vía.</p>`;
    else body = rowsOf("Simbología y nota").filter(row => row[0] !== "NOTA").map(row => meta(row[0], row[1])).join("");
    return `<h3 class="detail-name">${escapeHTML(legend.label)}</h3>${body}<p class="detail-meta detail-hint">Información ampliada en la pestaña «${escapeHTML(legend.tab)}».</p>`;
  }

  function renderMapLegendDetail(id) {
    if (state.route === "pn") return renderPnLegendDetail(PN_LEGENDS.find(item => item.id === id));
    if (state.route === "ide") return renderIdeLegendDetail(IDE_LEGENDS.find(item => item.id === id));
    if (state.route === "amt") return renderAmtLegendDetail(AMT_LEGENDS.find(item => item.id === id));
    const legend = DMGR_LEGENDS.find(item => item.id === id);
    const meta = (label, value) => `<p class="detail-meta"><strong>${escapeHTML(label)}:</strong> ${escapeHTML(value)}</p>`;
    let body = "";
    if (legend.related === "Zonas de inundaciones") {
      body = meta("Barrios", "9") + meta("Familias afectadas", "324") + meta("Personas afectadas", "1.296") + sheetRows("DMGR", "Inundaciones por AZ").rows.filter(row => row[0] !== "TOTAL").map(row => meta(`AZ ${row[0]}`, `${row[1]} barrios · ${row[2]} familias · ${row[3]} personas`)).join("");
    } else if (legend.related === "Movimientos en masa") {
      const rows = sheetRows("DMGR", "Movimientos en masa").rows;
      const count = text => rows.filter(row => row[3] === text).length;
      body = meta("Sectores", String(rows.length)) + meta("Con personas atrapadas", String(count("Atrapados"))) + meta("Con caos vehicular", String(count("Caos vehicular"))) + `<p class="detail-meta">La Gasca figura en el listado pero no tiene marcador en el mapa.</p>`;
    } else if (legend.action) {
      const rows = sheetRows("DMGR", "Acciones principales").rows.filter(row => row[0] === legend.action);
      body = `<p class="detail-meta"><strong>${escapeHTML(rows[0][1])}</strong></p><ul class="detail-list">${rows.map(row => `<li>${escapeHTML(row[2])}</li>`).join("")}</ul>`;
    } else if (legend.id === "recursos") {
      body = meta("Personal servidores (gráfica)", "684") + meta("Recursos totales (gráfica)", "354") + meta("Suma de la tabla", "700 personal · 359 recursos") + `<p class="detail-meta">Los totales de la gráfica no coinciden con la suma de la tabla. IDE (FF.AA.) aparece con «-» en personal.</p>`;
    } else {
      body = meta("Categoría", "Simbología del mapa") + meta("Escala", "0 – 5 – 10 – 15 km") + meta("Orientación", "Norte hacia arriba");
    }
    return `<h3 class="detail-name">${escapeHTML(legend.label)}</h3>${body}<p class="detail-meta detail-hint">Información ampliada en la pestaña «${escapeHTML(legend.tab)}».</p>`;
  }

  function renderDetail(unit, point) {
    if (!point && state.mapLegend) return renderMapLegendDetail(state.mapLegend);
    if (!point) return `<p class="detail-empty">Haz clic en la simbología, en los paneles del mapa o en un punto para consultar su información.</p>`;
    if (unit === "DMGR") {
      if (point.floodRow) {
        const row = sheetRows("DMGR", "Inundaciones en barrios").rows.find(item => Number(item[0]) === point.floodRow);
        return `<h3 class="detail-name">${escapeHTML(point.name)}</h3><p class="detail-meta"><strong>Categoría:</strong> Zona de inundación</p><p class="detail-meta"><strong>Familias:</strong> ${escapeHTML(row[2])}</p><p class="detail-meta"><strong>Personas:</strong> ${escapeHTML(row[3])}</p><p class="detail-meta"><strong>Administración zonal:</strong> ${escapeHTML(row[4])}</p>`;
      }
      const rows = sheetRows("DMGR", "Movimientos en masa").rows.filter(item => point.rows.includes(Number(item[0])));
      return `<h3 class="detail-name">${escapeHTML(point.name)}</h3><p class="detail-meta"><strong>Categoría:</strong> Movimiento en masa</p>${rows.map(row => `<p class="detail-meta"><strong>N.º ${escapeHTML(row[0])} · ${escapeHTML(row[1])}:</strong> AZ ${escapeHTML(row[2])} · situación: ${escapeHTML(row[3])}</p>`).join("")}`;
    }
    if (unit === "IDE") {
      const coords = sheetRows("IDE", "Puntos del mapa").rows.find(row => row[0] === point.name);
      return `<h3 class="detail-name">${escapeHTML(point.name)}</h3>${ideCantonBody(point.name)}${coords ? `<p class="detail-meta"><strong>Coordenadas aprox.:</strong> ${escapeHTML(coords[2])}</p>` : ""}`;
    }
    if (unit === "PN") {
      const meta = (label, value) => `<p class="detail-meta"><strong>${escapeHTML(label)}:</strong> ${escapeHTML(value)}</p>`;
      const coords = sheetRows("PN", "Puntos del mapa").rows.find(row => row[0] === point.name);
      const where = coords ? meta("Coordenadas aprox.", coords[2]) : "";
      const head = `<h3 class="detail-name">${escapeHTML(point.name)}</h3>${meta("Categoría", point.type)}`;
      if (point.incident) return `${head}${meta("Vía", "E28 Calacalí – Nanegal")}${meta("Estado", "Afectación / cierre")}${where}<p class="detail-meta">Los puntos de control de tránsito de Nanegal y E28 Calacalí cubren este tramo.</p>`;
      if (point.reference) return `${head}${meta("Vía", "E28")}${where}<p class="detail-meta">Punto de referencia sobre la vía afectada, sin personal asignado en la lámina.</p>`;
      const outside = sheetRows("PN", "Zonas fuera del DMQ").rows.find(row => row[0] === point.name);
      if (outside) return `${head}${meta("Ámbito", "Fuera del DMQ")}${meta("Acción", outside[1])}${where}`;
      const staff = sheetRows("PN", "Distribución personal").rows.find(row => row[0] === point.name);
      const resources = sheetRows("PN", "Detalle por punto").rows.filter(row => row[0] === point.name);
      return `${head}${meta("Tarea", staff[1])}${meta("Total servidores", staff[2])}${where}<p class="detail-label bomb-tip-sub">Recursos policiales</p><ul class="detail-list">${resources.map(row => `<li>${escapeHTML(row[2])} · ${escapeHTML(row[1])}</li>`).join("")}</ul>${point.name === "Redondel Mitad del Mundo" ? '<p class="detail-meta">La lámina indica 2 servidores en total: el mismo personal de tránsito opera el patrullero.</p>' : ""}`;
    }
    // AMT
    const head = `<h3 class="detail-name">${escapeHTML(point.name)}</h3><p class="detail-meta"><strong>Categoría:</strong> ${escapeHTML(point.type)}</p>`;
    if (point.reference) return `${head}<p class="detail-meta">${escapeHTML(point.reference)}</p>`;
    const coords = sheetRows("AMT", "Puntos del mapa").rows.find(row => row[0] === point.sectors[0]);
    return `${head}${amtPointBody(point.sectors[0])}${coords ? `<p class="detail-meta"><strong>Coordenadas aprox.:</strong> ${escapeHTML(coords[2])}</p>` : ""}`;
  }

  function renderSubtab(unit, tab) {
    if (unit === "IDE") {
      const link = { kind: "pn-sectors" };
      if (tab === "Resumen") return `<h3>Datos generales</h3>${renderTable("IDE", "Datos generales")}`;
      if (tab === "Cantones") return `<h3>Cantones afectados · seleccione una fila</h3>${renderTable("IDE", "Cantones afectados", link)}<p class="table-note">Nivel de alerta interpretado por el color de cada recuadro de la lámina 2.</p>`;
      if (tab === "Zonas de impacto") return `<h3>Zonas de impacto · seleccione una fila</h3>${renderTable("IDE", "Zonas de impacto", link)}<p class="table-note">Los sectores del eje E35 no están señalados en el mapa.</p>`;
      if (tab === "Población") return `<h3>Población aislada · seleccione una fila</h3>${renderTable("IDE", "Población aislada", link)}`;
      if (tab === "Personal") return `<h3>Personal militar · seleccione una unidad</h3>${renderTable("IDE", "Personal militar", link)}<p class="table-note">Al seleccionar GCB-32 o ERS-11 se resaltan sus cantones de responsabilidad.</p>`;
      if (tab === "Medios") return `<h3>Medios empleados</h3>${renderTable("IDE", "Medios")}<p class="table-note">MIT y GADs suman 32 equipos pesados en los corredores E487 y E35.</p>`;
      if (tab === "Instituciones") return `<h3>Instituciones empleadas</h3>${renderTable("IDE", "Instituciones")}`;
      return `${renderPointList("IDE")}<h3>Coordenadas de referencia</h3>${renderTable("IDE", "Puntos del mapa", link)}<p class="table-note">Coordenadas aproximadas de las cabeceras cantonales.</p>`;
    }
    if (unit === "DMGR") {
      if (tab === "Resumen") return `<h3>Datos generales</h3>${renderTable("DMGR", "Datos generales")}`;
      if (tab === "Acciones") return `<h3>Acciones principales</h3>${renderTable("DMGR", "Acciones principales")}`;
      if (tab === "Inundaciones") return `<h3>Inundaciones en barrios · seleccione una fila</h3>${renderTable("DMGR", "Inundaciones en barrios", { kind: "dmgr-flood" })}<p class="table-note">Totales reportados en la gráfica: 1.296 personas y 324 familias afectadas.</p>`;
      if (tab === "Por AZ") return `<h3>Resumen por administración zonal</h3>${renderTable("DMGR", "Inundaciones por AZ")}`;
      if (tab === "Movimientos") return `<h3>Movimientos en masa · seleccione una fila</h3>${renderTable("DMGR", "Movimientos en masa", { kind: "dmgr-mass" })}<p class="table-note">La Gasca no tiene marcador en el mapa.</p>`;
      if (tab === "Recursos") return `<h3>Recursos e instituciones desplegadas</h3>${renderTable("DMGR", "Recursos e instituciones")}<p class="table-note">Totales reportados en la gráfica: 684 personal servidores y 354 recursos. La suma de la tabla da 700 y 359. IDE (FF.AA.) aparece con «-» en personal y una columna entre SIS y EMASEO no tiene sigla visible.</p>`;
      if (tab === "Puntos") return renderPointList("DMGR");
      return `<h3>Mapa y simbología</h3>${renderTable("DMGR", "Mapa y simbología")}`;
    }
    if (unit === "PN") {
      if (tab === "Resumen") return `<h3>Datos generales</h3>${renderTable("PN", "Datos generales")}<h3>Distribución del personal · seleccione una fila</h3>${renderTable("PN", "Distribución personal", { kind: "pn-sectors" })}`;
      if (tab === "Personal") return `<h3>Distribución del personal · seleccione una fila</h3>${renderTable("PN", "Distribución personal", { kind: "pn-sectors" })}<p class="table-note">El punto relacionado se resalta sobre el mapa.</p>`;
      if (tab === "Detalle por punto") return `<h3>Recursos por punto de intervención · seleccione una fila</h3>${renderTable("PN", "Detalle por punto", { kind: "pn-sectors" })}<p class="table-note">«—»: recurso tripulado por personal ya contado. En el Redondel Mitad del Mundo la lámina indica 2 servidores en total.</p>`;
      if (tab === "Logística") return `<h3>Medios logísticos</h3>${renderTable("PN", "Medios logísticos")}`;
      if (tab === "Coordinación") return `<h3>Zonas fuera del DMQ · seleccione una fila</h3>${renderTable("PN", "Zonas fuera del DMQ", { kind: "pn-sectors" })}`;
      if (tab === "Turnos") return `<h3>Turnos operativos</h3>${renderTable("PN", "Turnos")}`;
      if (tab === "Puntos") return `${renderPointList("PN")}<h3>Coordenadas de referencia</h3>${renderTable("PN", "Puntos del mapa", { kind: "pn-sectors" })}<p class="table-note">Coordenadas aproximadas para un mapa georreferenciado; verificar antes de usar en campo.</p>`;
      return `<h3>Simbología y nota operativa</h3>${renderTable("PN", "Simbología y nota")}`;
    }
    if (tab === "Resumen") return `<h3>Datos generales</h3>${renderTable("AMT", "Datos generales")}<h3>Resumen de logística y personal</h3>${renderTable("AMT", "Resumen logística")}`;
    if (tab === "Puntos de control") return `<h3>Puntos de control · seleccione una fila</h3>${renderTable("AMT", "Puntos de control", { kind: "pn-sectors" })}<h3>Funciones y acciones</h3>${renderTable("AMT", "Funciones", { kind: "pn-sectors" })}`;
    if (tab === "Desvíos") return `<h3>Desvíos hacia el sur · seleccione una fila</h3>${renderTable("AMT", "Desvíos hacia el sur", { kind: "pn-sectors" })}<p class="table-note">En estos desvíos se controla el flujo vehicular hacia la vía Alóag – Santo Domingo.</p>`;
    if (tab === "Cierre especial") return `<h3>Cierre especial – vía Cusubamba</h3>${renderTable("AMT", "Cierre especial", { kind: "pn-sectors" })}`;
    if (tab === "Logística") return `<h3>Resumen de logística y personal</h3>${renderTable("AMT", "Resumen logística")}<p class="table-note">22 agentes (16 de control + 6 de desvíos) · 4 patrulleros (2 en el punto 1 + 2 en el punto 3) · 11 motorizados (8 de control + 3 de desvíos).</p>`;
    if (tab === "Puntos") return `${renderPointList("AMT")}<h3>Coordenadas de referencia</h3>${renderTable("AMT", "Puntos del mapa", { kind: "pn-sectors" })}<p class="table-note">Coordenadas aproximadas; verificar antes de usar en campo.</p>`;
    if (tab === "Simbología") return `<h3>Simbología del mapa</h3>${renderTable("AMT", "Simbología")}`;
    return `<h3>Observaciones de la lámina</h3>${renderTable("AMT", "Observaciones")}`;
  }

  function pointSet(unit) { return { PN: PN_POINTS, AMT: AMT_POINTS, DMGR: DMGR_POINTS, IDE: IDE_POINTS }[unit]; }

  function renderPointList(unit) {
    return `<input class="search-input" type="search" placeholder="Buscar punto…" aria-label="Buscar punto" value="${escapeHTML(state.search)}"><div class="point-list">${pointSet(unit).map((point, index) => `<button class="point-list-item" type="button" data-point-index="${index}" data-point-unit="${unit}"><span class="point-dot" style="--point-color:${COLORS[point.color]}"></span><span>${escapeHTML(point.name)}</span></button>`).join("")}</div>`;
  }

  function colorLabel(point, unit) {
    if (point.type) return point.type;
    return { yellow: "Amarillo", blue: "Azul", purple: "Morado", red: "Rojo", orange: "Naranja", white: "Blanco", green: "Verde" }[point.color];
  }

  function renderZoomControls(withCircles) {
    const circles = withCircles ? `<button class="tool-button circles-toggle" type="button" aria-label="Ocultar o mostrar círculos" title="Ocultar o mostrar círculos" aria-pressed="${state.circles}">◎</button>` : "";
    return `<div class="zoom-controls">${circles}<button class="tool-button" type="button" data-zoom="out" aria-label="Alejar" title="Alejar">−</button><button class="tool-button" type="button" data-zoom="in" aria-label="Acercar" title="Acercar">+</button><button class="tool-button" type="button" data-zoom="fit" aria-label="Ajustar mapa" title="Ajustar mapa">⌗</button></div>`;
  }

  function renderMap(route) {
    const map = MAPS[route];
    const points = pointSet(map.dataKey);
    const filters = [...new Set(points.map(point => colorLabel(point, map.dataKey)))];
    if (!state.filters[route]) state.filters[route] = new Set(filters);
    if (!state.subtab[route]) state.subtab[route] = TABS[route][0];
    const markers = points.map((point, index) => `<button class="map-marker ${state.selectedPoint === index ? "selected" : ""} ${state.relatedPoints.includes(index) ? "related" : ""}" type="button" data-point-index="${index}" data-point-unit="${map.dataKey}" title="${escapeHTML(point.name)}" aria-label="${escapeHTML(point.name)}" style="left:${point.x / map.width * 100}%;top:${point.y / map.height * 100}%;--marker-color:${COLORS[point.color]}"></button>`).join("");
    const legends = legendSet(route).map(({ id, label, box: [x, y, w, h] }) => `<button class="map-hotspot ${state.mapLegend === id ? "active" : ""}" type="button" data-map-legend="${id}" title="${escapeHTML(label)}" aria-label="${escapeHTML(label)}" style="left:${x / map.width * 100}%;top:${y / map.height * 100}%;width:${w / map.width * 100}%;height:${h / map.height * 100}%"></button>`).join("");
    return `<section class="map-layout" data-map-route="${route}"><div class="map-column"><div class="map-topline"><div class="map-heading"><h2>${map.title}</h2><p>${map.subtitle || `${map.event || "Evento 8"} · Distrito Metropolitano de Quito`}</p></div><span class="map-badge">MAPA OPERATIVO</span></div>
      <div class="map-toolbar"><div class="filter-list">${filters.map(filter => `<button class="filter-chip" type="button" data-filter="${escapeHTML(filter)}" aria-pressed="${state.filters[route].has(filter)}"><span class="filter-swatch" style="--swatch:${COLORS[points.find(point => colorLabel(point, map.dataKey) === filter).color]}"></span>${escapeHTML(filter)}</button>`).join("")}</div>
      ${renderZoomControls(true)}</div>
      <div class="map-viewport" aria-label="Visor interactivo del mapa"><div class="map-content" style="--map-ratio:${map.ratio}"><img class="map-image" src="${map.path}" alt="Mapa operativo ${map.short}"><div class="marker-layer">${legends}${markers}</div></div></div>
      <div class="map-caption"><span>${legendSet(route).length ? "Clic en la simbología o en los paneles para desplegar información · " : ""}Ctrl + rueda para zoom · arrastre para desplazarse</span><span>${points.length} puntos</span></div></div>
      <aside class="side-panel"><div class="panel-title-row"><div><h2>${map.short}</h2><p>${map.title}</p></div><span class="unit-flag">${(map.flag || map.event || "Evento 8").toUpperCase()}</span></div>
      <div class="kpi-grid">${KPI[route].map(([value, label]) => `<div class="kpi"><div class="kpi-value">${value}</div><div class="kpi-label">${label}</div></div>`).join("")}</div>
      <section class="detail-box" aria-live="polite"><p class="detail-label">${legendSet(route).length ? "Detalle" : "Detalle del punto"}</p>${renderDetail(map.dataKey, state.selectedPoint === null ? null : points[state.selectedPoint])}</section>
      <nav class="data-tabs" aria-label="Datos de ${map.short}">${TABS[route].map(tab => `<button class="data-tab ${state.subtab[route] === tab ? "active" : ""}" type="button" data-subtab="${escapeHTML(tab)}">${escapeHTML(tab)}</button>`).join("")}</nav>
      <section class="data-content">${renderSubtab(map.dataKey, state.subtab[route])}</section></aside></section>`;
  }

  function updateNav(route) {
    NAV_LINKS.forEach(link => {
      const active = link.dataset.route === route;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  // El encabezado muestra el evento propio de la pestaña cuando lo tiene (PN: Evento 3).
  const EVENT_META = document.querySelector(".event-meta");
  const DEFAULT_EVENT_META = EVENT_META.innerHTML;
  function updateEventMeta(route) {
    const map = MAPS[route];
    const place = map?.place ?? "Distrito Metropolitano de Quito";
    EVENT_META.innerHTML = map?.event ? `${escapeHTML(map.event)} <span>·</span> ${escapeHTML(map.date)}${place ? ` <span>·</span> ${escapeHTML(place)}` : ""}` : DEFAULT_EVENT_META;
  }

  function render() {
    const route = location.hash.slice(1).toLowerCase();
    state.route = ROUTES.includes(route) ? route : "ide";
    updateNav(state.route);
    updateEventMeta(state.route);
    document.title = `ENOS 2026 IDE "SHYRIS" · ${state.route.toUpperCase()}`;
    if (state.route === "ide") { MAIN.innerHTML = renderMap("ide") + renderIdeInfo(); bindMap("ide"); bindIdeInfo(); }
    else if (MAPS[state.route]) { MAIN.innerHTML = renderMap(state.route); bindMap(state.route); }
    else { MAIN.innerHTML = renderBomberos(); bindBomberos(); }
  }

  function refreshMap() { render(); }

  function selectPoint(unit, index) {
    state.selectedPoint = index;
    state.relatedPoints = [index];
    state.mapLegend = null;
    const route = unit.toLowerCase();
    if (state.route !== route) location.hash = route;
    else refreshMap();
  }

  function markerIndicesForRow(unit, kind, value) {
    const points = pointSet(unit);
    if (kind === "pn-sectors") return points.map((point, index) => point.sectors?.includes(value) ? index : -1).filter(index => index >= 0);
    const rowNumber = Number(value);
    if (kind === "dmgr-flood") return points.map((point, index) => point.floodRow === rowNumber ? index : -1).filter(index => index >= 0);
    return points.map((point, index) => point.rows?.includes(rowNumber) ? index : -1).filter(index => index >= 0);
  }

  function bindMap(route) {
    const unit = MAPS[route].dataKey;
    const content = MAIN.querySelector(".map-content");
    const image = MAIN.querySelector(".map-image");
    image.addEventListener("error", () => {
      const message = document.createElement("div");
      message.className = "map-error";
      message.textContent = `No se pudo cargar el mapa. Ruta esperada: ${MAPS[route].path}`;
      content.prepend(message);
    }, { once: true });
    MAIN.querySelectorAll(".map-marker").forEach(marker => {
      const point = pointSet(unit)[Number(marker.dataset.pointIndex)];
      if (!state.filters[route].has(colorLabel(point, unit))) marker.classList.add("hidden");
      if (state.relatedPoints.length && !state.relatedPoints.includes(Number(marker.dataset.pointIndex))) marker.classList.add("dimmed");
      marker.addEventListener("click", () => selectPoint(unit, Number(marker.dataset.pointIndex)));
    });
    MAIN.querySelectorAll(".filter-chip").forEach(button => button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      if (state.filters[route].has(filter)) state.filters[route].delete(filter);
      else state.filters[route].add(filter);
      refreshMap();
    }));
    MAIN.querySelector(".circles-toggle").addEventListener("click", () => {
      state.circles = !state.circles;
      MAIN.querySelector(".map-layout").classList.toggle("circles-off", !state.circles);
      MAIN.querySelector(".circles-toggle").setAttribute("aria-pressed", String(state.circles));
    });
    MAIN.querySelectorAll("[data-subtab]").forEach(button => button.addEventListener("click", () => {
      state.subtab[route] = button.dataset.subtab;
      state.search = "";
      refreshMap();
    }));
    MAIN.querySelectorAll("tr[data-row-kind]").forEach(row => row.addEventListener("click", () => {
      const indices = markerIndicesForRow(unit, row.dataset.rowKind, row.dataset.rowValue);
      state.mapLegend = null;
      state.relatedPoints = indices;
      state.selectedPoint = indices.length === 1 ? indices[0] : null;
      refreshMap();
    }));
    MAIN.querySelectorAll(".point-list-item").forEach(button => button.addEventListener("click", () => selectPoint(unit, Number(button.dataset.pointIndex))));
    const search = MAIN.querySelector(".search-input");
    if (search) search.addEventListener("input", () => {
      state.search = search.value;
      MAIN.querySelectorAll(".point-list-item").forEach(button => { button.hidden = !button.textContent.toLowerCase().includes(state.search.toLowerCase()); });
    });
    MAIN.querySelectorAll(".map-hotspot").forEach(button => button.addEventListener("click", () => {
      const legend = legendSet(route).find(item => item.id === button.dataset.mapLegend);
      const closing = state.mapLegend === legend.id;
      state.mapLegend = closing ? null : legend.id;
      state.selectedPoint = null;
      state.relatedPoints = closing ? [] : pointSet(unit).map((point, index) => (legend.related && [].concat(legend.related).includes(point.type)) || (legend.sectors && point.sectors?.some(key => legend.sectors.includes(key))) ? index : -1).filter(index => index >= 0);
      if (!closing) state.subtab[route] = legend.tab;
      refreshMap();
      if (!closing) MAIN.querySelector(".detail-box").scrollIntoView({ behavior: "smooth", block: "nearest" });
    }));
    bindPanZoom();
  }

  function bindPanZoom() {
    const viewport = MAIN.querySelector(".map-viewport");
    const content = MAIN.querySelector(".map-content");
    // Cada render reconstruye el visor; se restaura el zoom y desplazamiento del usuario.
    applyTransform(content);
    MAIN.querySelectorAll("[data-zoom]").forEach(button => button.addEventListener("click", () => applyZoom(button.dataset.zoom, content)));
    // El arrastre solo captura el puntero al moverse, para que los clics en las zonas de la leyenda sigan funcionando.
    let drag = null;
    viewport.addEventListener("pointerdown", event => {
      if (event.target.closest(".map-marker")) return;
      drag = { x: event.clientX - state.panX, y: event.clientY - state.panY, startX: event.clientX, startY: event.clientY, captured: false };
    });
    viewport.addEventListener("pointermove", event => {
      if (!drag) return;
      if (!drag.captured) {
        if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 5) return;
        drag.captured = true;
        viewport.setPointerCapture(event.pointerId);
      }
      state.panX = event.clientX - drag.x;
      state.panY = event.clientY - drag.y;
      applyTransform(content);
    });
    const stopDrag = () => { drag = null; };
    viewport.addEventListener("pointerup", stopDrag);
    viewport.addEventListener("pointercancel", stopDrag);
    viewport.addEventListener("wheel", event => {
      if (!event.ctrlKey) return;
      event.preventDefault();
      changeZoom(event.deltaY < 0 ? 0.15 : -0.15, content);
    }, { passive: false });
  }

  function applyTransform(content) {
    content.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
  }

  function changeZoom(amount, content) {
    state.zoom = Math.max(.65, Math.min(3, state.zoom + amount));
    applyTransform(content);
  }

  function applyZoom(action, content) {
    if (action === "fit") { state.zoom = 1; state.panX = 0; state.panY = 0; applyTransform(content); return; }
    changeZoom(action === "in" ? .2 : -.2, content);
  }

  // El botón muestra el modo al que se cambia; la preferencia se recuerda en este navegador.
  const THEME_BUTTON = document.querySelector(".theme-toggle");
  function applyTheme(theme) {
    const light = theme === "light";
    if (light) document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    THEME_BUTTON.querySelector("[aria-hidden]").textContent = light ? "☾" : "☀";
    THEME_BUTTON.querySelector(".theme-toggle-label").textContent = light ? "Modo oscuro" : "Modo claro";
    THEME_BUTTON.setAttribute("aria-pressed", String(!light));
    THEME_BUTTON.title = light ? "Cambiar a modo oscuro" : "Cambiar a modo claro";
    document.querySelector('meta[name="theme-color"]').content = light ? "#ffffff" : "#07142b";
  }
  THEME_BUTTON.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    applyTheme(next);
    try { localStorage.setItem("enos-theme", next); } catch (error) {}
  });
  applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");

  window.addEventListener("hashchange", () => { state.selectedPoint = null; state.relatedPoints = []; state.mapLegend = null; render(); });
  if (!location.hash) history.replaceState(null, "", "#ide");
  render();
})();