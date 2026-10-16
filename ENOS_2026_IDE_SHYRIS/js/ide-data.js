/* Contenido de la pestaña IDE: información ordenada de las láminas de la carpeta IDE. */
window.IDE_DATA = (() => {
  "use strict";

  const list = items => `<ul class="ide-list">${items.map(item => `<li>${item}</li>`).join("")}</ul>`;
  const kpis = items => `<div class="kpi-grid ide-kpis">${items.map(([value, label]) => `<div class="kpi"><div class="kpi-value">${value}</div><div class="kpi-label">${label}</div></div>`).join("")}</div>`;
  const cards = items => `<div class="ide-cards">${items.map(([title, body]) => `<article class="ide-card"><h4>${title}</h4>${body}</article>`).join("")}</div>`;
  const table = (headers, rows) => `<div class="table-wrap"><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr class="${row.total ? "total-row" : ""}">${(row.cells || row).map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;

  const SECTIONS = [
    {
      id: "situacion",
      label: "Situación N.º 3",
      source: "Matriz de decisión · 33 B.C.",
      image: "IDE/MATRIZ DECISION SITUACION 3.jpg",
      html: `<p class="ide-lead">Ejercicio de Gestión de Riesgos ante el Fenómeno de El Niño 2028–2029. Sector del evento: ladera de Guápulo y centro norte de Quito.</p>
        ${cards([
          ["Extracto de la situación", list(["<strong>Deslave en Guápulo:</strong> tres viviendas afectadas, personas atrapadas, obstrucción parcial de vía y riesgo de nuevo deslizamiento; resistencia inicial de residentes a evacuar.", "<strong>Incendio en centro comercial del norte de Quito:</strong> evacuación masiva, personas atrapadas y heridas, congestión, corte eléctrico y pérdida temporal de contacto con trabajadores. Ubicación exacta y cifras consolidadas no especificadas."])],
          ["Análisis ejecutivo", list(["Lluvias saturan el suelo en Guápulo y generan riesgo de nuevos movimientos en masa.", "El incendio exige respuesta especializada y evacuación segura.", "La simultaneidad de incidentes, cuatro equipos de combate disponibles y medios logísticos limitados obligan a priorizar apoyo humanitario, seguridad periférica y comunicaciones.", "La 33 B.C. no reemplaza a Bomberos, Policía, tránsito ni equipos SAR."])]
        ])}
        <h3>Decisiones tomadas (propuestas) y acciones a ejecutar</h3>
        ${table(["N.º", "Decisión", "Acción a ejecutar / verificar"], [
          ["1", "Disponer al B.C. 98 evaluar de inmediato sus capacidades para apoyar la emergencia en Guápulo, previa coordinación mediante IDE y autorización del escalón superior.", "Establecer enlace con IDE y organismos técnicos; verificar accesos seguros y, si se autoriza, apoyar delimitación preventiva, evacuación asistida y traslado humanitario, sin ingresar al terreno inestable."],
          ["2", "Disponer al B.C. 98 apoyo en la seguridad al incidente del centro comercial del norte de Quito, sujeto a ubicación confirmada y requerimiento formal.", "Mantener seguridad en accesos para equipos de emergencia y apoyar orientación y evacuación exterior conforme al mando del incidente."],
          ["3", "Priorizar los cuatro equipos de combate según riesgo vital, accesibilidad y autorización, conservando capacidad de reacción territorial.", "Confirmar ubicación, dotación, transporte y sostenimiento reales de cada ECO; proponer asignación escalonada e informar limitaciones o solicitudes de refuerzo."],
          ["4", "Mantener la continuidad de mando y control y la protección de sistemas e infraestructura crítica de comunicaciones.", "Comprobar enlaces principales y alternos, energía de respaldo y seguridad física de medios propios; solicitar asistencia técnica ante interrupciones."]
        ])}
        ${cards([
          ["Coordinaciones", `<div class="ide-chips">${["Bomberos Quito", "Policía Nacional", "AMT", "EPMMOP", "Secretaría de Seguridad", "MSP", "Cruz Roja", "Autoridad de gestión de riesgos"].map(i => `<span>${i}</span>`).join("")}</div>`],
          ["Recomendaciones", list(["Priorizar vidas humanas y la seguridad de las evacuaciones a sitios seguros.", "Evitar exposición de personal militar a fuego, humo o taludes sin capacitación y equipo adecuado.", "Solicitar medios de transporte, equipos especializados en rescate y refuerzos al escalón superior cuando se excedan las capacidades."])]
        ])}`
    },
    {
      id: "concepto",
      label: "Concepto de la operación",
      source: "Zona de Defensa N.º 1",
      image: "IDE/concepto-operacion.jpg",
      html: `<p class="ide-lead">La IDE ejerce el mando de la Zona de Defensa 1 (ZD 1), dividida en cuatro subzonas asignadas a sus brigadas.</p>
        ${table(["Subzona", "Unidad", "Provincias de referencia"], [
          ["SZDA", "33 B.C.", "Pichincha (sector oriental)"],
          ["SZDB", "Brigada 13", "Pichincha (sector occidental) y Santo Domingo de los Tsáchilas"],
          ["SZDC", "Brigada 9 (SF)", "Cotopaxi y Los Ríos"],
          ["SZDD", "Brigada 11", "Tungurahua, Bolívar y Chimborazo"]
        ])}`
    },
    {
      id: "contexto",
      label: "Evento 8: contexto",
      source: "Contexto operacional · evento múltiple simultáneo",
      image: "IDE/lamina-02-contexto.jpg",
      html: `<p class="ide-lead"><span class="ide-alert">Alerta roja · estado de excepción</span></p>
        ${kpis([["72 horas", "precipitaciones persistentes y saturación de suelos"], ["1.018", "personas afectadas reportadas"], ["Decreto 343", "Res. SNGR-193 · marcos legales activados"], ["652", "personas a evacuar"]])}
        <h3>Prioridades del apoyo militar</h3>
        <ol class="ide-steps"><li>Búsqueda y rescate de atrapados.</li><li>Evacuación segura (652 personas).</li><li>Activación de alojamientos temporales (AT) y ayuda humanitaria.</li><li>Seguridad integral (población, viviendas, AT).</li><li>Control de taludes y habilitación vial.</li></ol>`
    },
    {
      id: "afectacion",
      label: "Zonas afectadas",
      source: "Mapas 1 y 2 · ubicación general y lugares afectados",
      image: "IDE/lamina-03-cantones.jpg",
      extraImage: "IDE/lamina-04-zonas-impacto.jpg",
      html: `<h3>Cinco cantones de Pichincha con afectación</h3>
        ${cards([
          ["DMQ (Quito)", "<p>Inundaciones en 6 parroquias urbanas; deslizamientos y aluviones en el sector oriental.</p>"],
          ["Rumiñahui", "<p>Taludes y desprendimientos; enlace con el COE cantonal (GCB31).</p>"],
          ["Mejía", "<p>Sector de responsabilidad del GA13.</p>"],
          ["P. V. Maldonado y Puerto Quito", "<p>Noroccidente: ECU 911 monitorea la vía Calacalí – La Independencia.</p>"]
        ])}
        <h3>Seis parroquias del sur y centro de Quito inundadas</h3>
        ${table(["Sector", "Familias", "Personas", "Unidad"], [
          ["Centro Histórico", "95", "310", "BIMOT 37"],
          ["La Argelia", "37", "114", "GA11"],
          ["La Ecuatoriana", "23", "74", "GA13"],
          ["Guamaní", "21", "74", "GA13"],
          ["Puengasí", "12", "45", "BIMOT 37"],
          ["La Ferroviaria", "7", "35", "GA11"],
          { total: true, cells: ["Total", "195", "652", ""] }
        ])}
        <p class="table-note"><strong>Aluviones y deslizamientos:</strong> 1 Monjas / río Monjas · 2 El Madrigal · 3 parque Cuscungo · 4 San Juan; taludes de la prolongación de la Av. Simón Bolívar.</p>`
    },
    {
      id: "alojamientos",
      label: "Alojamientos temporales",
      source: "Mapa 4 · evacuación y alojamientos temporales",
      image: "IDE/lamina-05-alojamientos.jpg",
      html: `<h3>Cuatro alojamientos temporales en el Centro Histórico</h3>
        ${table(["AT", "Alojamiento"], [["1", "Unidad Patronato Municipal San José (destino de evacuados)"], ["2", "San Juan de Dios"], ["3", "Casa sin Fronteras"], ["4", "Casa Somos San Diego"]])}
        ${list(["Evacuación por sectores con prioridad a niños, adultos mayores, personas con discapacidad y embarazadas.", "03 HOWO, 01 bus y 02 camionetas por rutas habilitadas por la AMT.", "10 efectivos de seguridad en cada AT (40 en total).", "Agua segura: EPMAPS (MTT1) · salud: MSP (MTT2).", "1.018 personas identificadas y registradas."])}
        <p class="table-note">Ubicación de los AT referencial, por verificar con la MTT4. Rutas esquemáticas.</p>`
    },
    {
      id: "lineas",
      label: "Líneas de acción",
      source: "Líneas de acción 1, 2 y 3",
      image: "IDE/lamina-06-busqueda-evacuacion.jpg",
      extraImage: "IDE/lamina-07-asistencia-humanitaria.jpg",
      thirdImage: "IDE/lamina-08-seguridad-control.jpg",
      html: `<h3>Línea de acción 1 · Búsqueda, salvamento y evacuación</h3>
        ${cards([
          ["Rescate", `<p>Apoyo a GT2 y GT3. Despliegue de <strong>02 equipos FF.AA.</strong> (10 efectivos) junto a <strong>9 unidades de rescate</strong> y <strong>45 efectivos</strong> del Cuerpo de Bomberos.</p><p class="ide-tag">Prioridad: Centro Histórico y La Argelia</p>`],
          ["Evacuación", `<p>Triage → transporte → zona segura. Empleo de <strong>01 equipo de combate (ECO)</strong> para organizar, registrar y conducir a evacuados.</p><p class="ide-tag">Prioridad a grupos vulnerables</p>`]
        ])}
        <p class="table-note">03 camiones HOWO, 01 bus y 02 camionetas militares en rutas seguras · 2 ambulancias en sitio (MSP / Cruz Roja).</p>
        <h3>Línea de acción 2 · Asistencia humanitaria y logística</h3>
        <ol class="ide-steps"><li><strong>Cuantificación:</strong> identificación de necesidades con MTT4 y equipos territoriales.</li><li><strong>Provisión:</strong> recepción de kits de alimentos y limpieza vía GT1 Logística (SNGR, MIES, Cruz Roja).</li><li><strong>Transporte:</strong> despliegue de 03 camiones militares para distribución.</li><li><strong>Seguridad y entrega:</strong> 20 efectivos brindan seguridad durante la entrega del MIES (registro estricto para evitar duplicidad) y 10 efectivos custodian el transporte.</li></ol>
        <h3>Línea de acción 3 · Seguridad y control territorial</h3>
        ${cards([
          ["Entorno urbano: prevención y albergues", "<p>Patrullajes mixtos (FF.AA. + Policía Nacional) en zonas evacuadas para prevención de saqueos. Seguridad perimetral con 10 efectivos en cada uno de los 4 alojamientos temporales (40 efectivos).</p>"],
          ["Entorno de riesgo: control de taludes y vías", "<p>Cordones de seguridad y restricción de paso en la Av. Simón Bolívar y la cuenca del río Monjas. Despliegue de 05 ECO (02 de BIMOT 37, 03 de GA13) junto a 15 efectivos de la AMT.</p>"]
        ])}`
    },
    {
      id: "fuerza",
      label: "Personal y medios",
      source: "Despliegue de fuerza y parque automotor",
      image: "IDE/lamina-09-personal-militar.jpg",
      extraImage: "IDE/lamina-10-medios.jpg",
      html: `${kpis([["123", "efectivos específicos"], ["11", "ECO desplegados"]])}
        <h3>Efectivos individuales</h3>
        ${table(["Tarea", "Efectivos"], [["Oficiales de enlace (COE / ECU 911)", "3"], ["Búsqueda y rescate (2 equipos)", "10"], ["Seguridad de alojamientos (4 AT × 10)", "40"], ["Seguridad transporte de kits", "10"], ["Seguridad entrega MIES", "20"], ["Fuerzas de reacción (listas para noroccidente)", "40"], { total: true, cells: ["Subtotal", "123"] }])}
        <h3>Equipos de combate (ECO)</h3>
        ${table(["Tarea", "ECO"], [["Organización y registro de evacuación", "1"], ["Seguridad perimetral EVIN", "5"], ["Control de taludes / restricción de tránsito (BIMOT 37 ×2, GA13 ×3)", "5"], { total: true, cells: ["Subtotal", "11"] }])}
        <h3>Parque automotor y medios terrestres</h3>
        ${table(["Fuerzas Armadas", "Interinstitucional (apoyo en sitio)"], [["05 camiones tácticos HOWO (3 evacuación, 2 reserva)", "Cuerpo de Bomberos: 9 unidades de rescate, 3 ambulancias"], ["01 bus militar (evacuación)", "AMT: 9 camionetas de control"], ["02 camionetas de apoyo", "MSP: 5 ambulancias"], ["05+ vehículos ECO (transporte táctico)", "Cruz Roja: 1 ambulancia"]])}`
    },
    {
      id: "mando",
      label: "Mando unificado",
      source: "Ecosistema interinstitucional",
      image: "IDE/lamina-11-instituciones.jpg",
      html: `<p class="ide-lead">Puesto de mando 13BIMOT “Pichincha”, con 3 oficiales de enlace destacados.</p>
        ${cards([
          ["Coordinación directa", list(["COE Provincial de Pichincha", "COE Metropolitano DMQ", "ECU 911 (priorización vial)"])],
          ["Instituciones de apoyo", list(["SNGR", "MIES", "Bomberos (GT3)", "AMT / Policía Nacional", "EPMMOP / EPMAPS", "MSP / Cruz Roja"])]
        ])}`
    },
    {
      id: "operaciones",
      label: "Operaciones concurrentes",
      source: "Evaluación y rehabilitación",
      image: "IDE/lamina-12-operaciones.jpg",
      html: cards([
        ["Evaluación inicial (EVIN)", "<p>Apoyo a MTT4 y MTT1. <strong>Meta:</strong> 324 viviendas a evaluar en sectores afectados. Seguridad garantizada por 05 ECO de FF.AA.</p>"],
        ["Remoción de escombros", "<p>MTT3 coordinando con EPMMOP y MTOP. Despliegue activo de 02 hidrosuccionadoras y personal técnico. Zonas de enfoque: San Juan y Monjas.</p>"],
        ["Monitoreo estratégico", "<p>Vigilancia constante del eje noroccidental: monitoreo vía ECU 911 de la vía Calacalí – La Independencia para prevenir cierres por nuevos deslizamientos.</p>"]
      ])
    }
  ];

  return { SECTIONS };
})();
