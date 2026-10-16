/* Contenido de la pestaña IDE: Situación N.º 3 – 11 BCB «Galápagos» (IDE/SITUACION_3/SITUACION_3_Datos.xlsx y láminas). */
window.IDE_DATA = (() => {
  "use strict";

  const DIR = "IDE/SITUACION_3/";
  const img = n => `${DIR}Diapositiva_${String(n).padStart(2, "0")}.png`;
  const list = items => `<ul class="ide-list">${items.map(item => `<li>${item}</li>`).join("")}</ul>`;
  const kpis = items => `<div class="kpi-grid ide-kpis">${items.map(([value, label]) => `<div class="kpi"><div class="kpi-value">${value}</div><div class="kpi-label">${label}</div></div>`).join("")}</div>`;
  const cards = items => `<div class="ide-cards">${items.map(([title, body]) => `<article class="ide-card"><h4>${title}</h4>${body}</article>`).join("")}</div>`;
  const table = (headers, rows) => `<div class="table-wrap"><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr class="${row.total ? "total-row" : ""}">${(row.cells || row).map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  const chips = items => `<div class="ide-chips">${items.map(i => `<span>${i}</span>`).join("")}</div>`;

  const SECTIONS = [
    {
      id: "situacion",
      label: "Eventos simultáneos",
      source: "Lámina 3 · eventos múltiples simultáneos",
      image: img(3),
      html: `<p class="ide-lead"><span class="ide-alert">Alerta roja · capacidad civil sobrepasada</span></p>
        ${kpis([["96 horas", "precipitaciones continuas y saturación crítica de suelos"], ["707", "personas aisladas en zonas rurales: Pungalá, Punín, Licán"], ["E487 y E35", "corredores con ruptura total de conectividad vial en el centro del país"]])}
        <h3>Fases de la respuesta</h3>
        <ol class="ide-steps"><li>Evaluación EVIN/EDAN.</li><li>Búsqueda y rescate.</li><li>Evacuación segura.</li><li>Asistencia logística.</li><li>Habilitación vial.</li></ol>`
    },
    {
      id: "jurisdiccion",
      label: "Jurisdicción",
      source: "Lámina 1 · jurisdicción de la 11 BCB «Galápagos»",
      image: img(1),
      html: `<p class="ide-lead">La jurisdicción abarca cantones de tres provincias.</p>
        ${table(["Provincia", "Cantones"], [
          ["Chimborazo", "Riobamba, Guano, Penipe, Chambo, Colta, Pallatanga, Guamote, Cumandá, Alausí, Chunchi"],
          ["Bolívar", "Guaranda, Las Naves, Echeandía, Caluma, Chimbo, San Miguel, Chillanes"],
          ["Tungurahua", "Ambato, Píllaro, Patate, Pelileo, Tisaleo, Cevallos, Mocha, Quero, Baños"]
        ])}
        <p class="table-note">Ambato aparece con trama en el mapa (posible exclusión de la jurisdicción).</p>`
    },
    {
      id: "impacto",
      label: "Zonas de impacto",
      source: "Lámina 4 · zonas de impacto y tipologías de riesgo",
      image: img(4),
      html: `${table(["Sector / eje vial", "Tipología del evento", "Estado actual", "Prioridad táctica"], [
          ["Cruz del Hueso (Cumandá)", "Deslizamiento de talud", "Bloqueo total", "<strong>ALTA</strong> · paso provisional"],
          ["Panza Redonda (Pallatanga)", "Pérdida de mesa vial", "Aislamiento", "<strong>ALTA</strong> · búsqueda y rescate"],
          ["Puninhuayco (Riobamba)", "Aluvión", "Vía interrumpida", "<strong>ALTA</strong> · recuperación rural"],
          ["Casual – La Esperanza (E35)", "Hundimiento / grietas", "Restricción total", "MEDIA · estudio geotécnico"],
          ["Chitaquiz (E35)", "Flujo de lodo", "Tránsito restringido", "MEDIA · limpieza de calzada"]
        ])}`
    },
    {
      id: "personal",
      label: "Personal militar",
      source: "Lámina 5 · despliegue del Puesto de Mando 11BCB «Galápagos» y unidades asignadas",
      image: img(5),
      html: `${kpis([["323", "efectivos militares empleados"], ["15 + 8", "Puesto de Mando + oficiales de enlace"]])}
        ${cards([
          ["GCB-32 · 140 efectivos", "<p>Eje de responsabilidad: Riobamba, Guamote, Alausí y Chunchi.</p>"],
          ["ERS-11 · 80 efectivos", "<p>Eje de responsabilidad: Pallatanga y Cumandá.</p>"],
          ["Fuerza de Reacción · 80 efectivos", "<p>Disponibles para contingencias inmediatas.</p>"]
        ])}`
    },
    {
      id: "medios",
      label: "Medios",
      source: "Lámina 6 · medios de las instituciones empleados",
      image: img(6),
      html: `${table(["Medios 11 BCB", "Maquinaria civil / interinstitucional"], [
          ["04 camiones tácticos HOWO 4x4 / 6x6 (movilidad extrema)", "MIT: 7 máquinas pesadas (retroexcavadoras, volquetas)"],
          ["02 camiones 3.5 t (transporte logístico)", "GADs: 25 vehículos operativos en la red vial"],
          ["", "GAD Riobamba: 1 vacuum (hidrosuccionador) para hospitales"],
          ["", "Salud / Bomberos: 4 vehículos de rescate y 2 ambulancias"]
        ])}
        <p class="table-note">MIT y GADs suman 32 equipos pesados en los corredores E487 y E35.</p>`
    },
    {
      id: "instituciones",
      label: "Instituciones",
      source: "Lámina 7 · instituciones empleadas",
      image: img(7),
      html: `<p class="ide-lead">Puesto de Mando 11BCB (8 oficiales de enlace), conectado con el COE Provincial de Chimborazo, 6 COEs cantonales, ECU 911 y el PMU.</p>
        ${cards([
          ["Instituciones de apoyo", chips(["Policía Nacional (control vial)", "Bomberos (búsqueda / rescate)", "SNGR (fichas EVIN)", "MIT / GADs (maquinaria pesada)", "MDH / MIES (kits de ayuda)", "MSP / Cruz Roja (atención médica)"])]
        ])}`
    },
    {
      id: "alojamientos",
      label: "Alojamientos temporales",
      source: "Lámina 8 · alojamientos temporales (AT)",
      image: img(8),
      html: `${table(["Parroquia", "Familias", "Personas"], [["Pungalá", "150", "380"], ["Punín", "87", "213"], ["Licán", "36", "114"], { total: true, cells: ["Total impacto", "273", "707"] }])}
        ${cards([
          ["Gestión y seguridad militar (línea COE nivel 2/3)", list(["Despliegue táctico para garantizar la seguridad perimetral de los AT habilitados.", "Acompañamiento interinstitucional con MIES y MSP para censo y atención prehospitalaria in situ."])]
        ])}`
    },
    {
      id: "rescate",
      label: "Búsqueda y evacuación",
      source: "Lámina 9 · búsqueda, salvamento y evacuación",
      image: img(9),
      html: cards([
        ["Operaciones de rescate", "<p>Liderazgo operativo del Cuerpo de Bomberos (<strong>30 efectivos</strong>) apoyado por Fuerza Terrestre.</p><p class=\"ide-tag\">Prioridad 1: Panza Redonda y La Armenia-Huataxí</p>"],
        ["Evacuación segura", "<p>Empleo de Equipos de Combate (ECO) para el transporte seguro de aislados, con prioridad a grupos vulnerables hacia alojamientos temporales.</p><p class=\"ide-tag\">04 vehículos militares en trochas y rutas alternas</p>"]
      ])
    },
    {
      id: "asistencia",
      label: "Asistencia humanitaria",
      source: "Lámina 10 · asistencia humanitaria y logística",
      image: img(10),
      html: `<ol class="ide-steps"><li><strong>Evaluación:</strong> fichas EVIN/EDAN por 10 técnicos SNGR en 8 zonas críticas.</li><li><strong>Provisión:</strong> armado de kits (MIES) e insumos agropecuarios (MAGAP) para Licto y parroquias rurales.</li><li><strong>Transporte táctico (11BCB):</strong> camiones militares de 3.5 t para atravesar zonas anegadas e intransitables para vehículos civiles.</li><li><strong>Distribución segura:</strong> 40 efectivos militares dan seguridad de área durante la entrega a 273 familias.</li></ol>`
    },
    {
      id: "seguridad",
      label: "Seguridad territorial",
      source: "Lámina 11 · seguridad y control territorial",
      image: img(11),
      html: cards([
        ["Centros de salud", "<p>Seguridad perimetral y despeje urgente de accesos anegados en los Centros Tipo C ESPOCH–Lizarzaburu y San Antonio. Garantizar corredores para ambulancias.</p>"],
        ["Corredores E487 y E35", "<p>Policía Nacional (<strong>60 efectivos</strong>) establece cierres intercantonales. Vehículos pesados retenidos; prohibición total de paso en sectores inestables.</p>"]
      ])
    },
    {
      id: "operaciones",
      label: "Operaciones institucionales",
      source: "Lámina 12 · operaciones de las instituciones",
      image: img(12),
      html: cards([
        ["Evaluación inicial (EVIN/EDAN)", "<p><strong>SNGR</strong> despliega 10 técnicos territoriales evaluando 8 zonas cero simultáneas (Cruz del Hueso, Pungalá, etc.).</p>"],
        ["Rehabilitación y escombros", "<p><strong>MIT y GADs</strong> operan 32 equipos pesados en los corredores E487 y E35.</p><p class=\"ide-tag\">Alerta: capacidad civil de despeje geotécnico sobrepasada</p>"],
        ["Monitoreo estratégico y salud", "<p><strong>ECU 911</strong> canaliza llamadas masivas. <strong>MSP y Cruz Roja</strong> (20 profesionales) aseguran la red de salud pese a los accesos anegados.</p>"]
      ])
    },
    {
      id: "conclusiones",
      label: "Conclusiones",
      source: "Lámina 13 · conclusiones y recomendaciones",
      image: img(13),
      html: `<p class="ide-lead">La simultaneidad de eventos (movimientos en masa y pérdida de vías) ha <strong>sobrepasado</strong> las capacidades de respuesta civil y maquinaria pesada del COE Provincial.</p>
        ${table(["N.º", "Dirigido a", "Recomendación"], [
          ["1", "COE Nacional", "Formalizar de inmediato la asignación complementaria de equipo pesado del MIT para habilitar de forma segura Cruz del Hueso, Chaguarpata y Siltur."],
          ["2", "Unidades GCB 32 / ERS 11", "Ejecutar apertura urgente de trochas y caminos vecinales junto a SNGR en Panza Redonda y La Armenia-Huataxí. Prioridad: abastecimiento logístico y evacuación médica de poblados totalmente aislados."]
        ])}`
    }
  ];

  return { SECTIONS };
})();
