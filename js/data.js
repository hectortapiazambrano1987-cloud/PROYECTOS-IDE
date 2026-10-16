// Datos transcritos directamente de las hojas Excel de PN (Evento 3) y AMT (despliegue vía E28).
window.ENOS_DATA = {
  "PN": {
    // Evento 3 · fuente: PN/Despliegue_Evento3_Zona9_DMQ.xlsx (lámina TERCERA SITUACIÓN).
    "sheets": {
      "Datos generales": [
        ["DESPLIEGUE OPERATIVO POLICIAL – EVENTO 3", null], [null, null],
        ["Campo", "Detalle"],
        ["Institución", "Policía Nacional del Ecuador – Zona 9 – DMQ"],
        ["Evento", "Despliegue Operativo Policial – Evento 3"],
        ["Tipo de evento", "Inundaciones, deslizamientos, colapsos de infraestructura y alteraciones del orden público"],
        ["Fecha y hora del evento", "27/11/2028 – 03:00"],
        ["Ámbito territorial", "Distrito Metropolitano de Quito (DMQ)"],
        ["Jurisdicción", "Policía Nacional – Zona 9"],
        ["Talento humano por turno", "24 servidores policiales"],
        ["Medios logísticos", "9 unidades (5 patrulleros y 4 motocicletas)"],
        ["Provincias / zonas en el mapa", "Pichincha, Imbabura, Napo, Cotopaxi, Santo Domingo (Zona 8)"],
        ["Vía afectada", "E28 (Calacalí – Nanegal)"],
        ["Escala del mapa", "0 – 5 – 10 – 15 km"]
      ],
      "Distribución personal": [
        ["DISTRIBUCIÓN DEL PERSONAL (PUNTOS DEL DMQ)", null, null], [null, null, null],
        ["Punto / Sector", "Tarea", "Servidores"],
        ["E28 Calacalí", "Control de tránsito", 8],
        ["Nanegal", "Control de tránsito", 8],
        ["Quito urbano", "Infraestructura estratégica", 6],
        ["Redondel Mitad del Mundo", "Control de tránsito y desvíos", 2],
        ["TOTAL", null, 24]
      ],
      "Detalle por punto": [
        ["DETALLE POR PUNTO DE INTERVENCIÓN (DMQ)", null, null, null], [null, null, null, null],
        ["Punto / Sector", "Recurso policial", "Cantidad", "Personal"],
        ["E28 Calacalí", "Personal de tránsito", 4, 4],
        ["E28 Calacalí", "Patrullero (2 personal)", 1, 2],
        ["E28 Calacalí", "Motos (1 personal c/u)", 2, 2],
        ["Nanegal", "Personal de tránsito", 4, 4],
        ["Nanegal", "Patrullero (2 personal)", 1, 2],
        ["Nanegal", "Motos (1 personal c/u)", 2, 2],
        ["Quito urbano", "Equipos de 3 servidores", 2, 6],
        ["Quito urbano", "Patrulleros", 2, "—"],
        ["Quito urbano", "Vigilancia y control preventivo", "—", "—"],
        ["Redondel Mitad del Mundo", "Personal de tránsito", 2, 2],
        ["Redondel Mitad del Mundo", "Patrullero (2 personal)", 1, "—"],
        ["TOTAL", null, null, 24]
      ],
      "Medios logísticos": [
        ["MEDIOS LOGÍSTICOS", null, null], [null, null, null],
        ["Medio", "Cantidad", "Distribución"],
        ["Patrulleros", 5, "E28 Calacalí 1 · Nanegal 1 · Quito urbano 2 · Redondel Mitad del Mundo 1"],
        ["Motocicletas", 4, "E28 Calacalí 2 · Nanegal 2"],
        ["TOTAL", 9, "Unidades logísticas"]
      ],
      "Zonas fuera del DMQ": [
        ["ZONAS FUERA DEL DMQ – COORDINACIÓN", null], [null, null],
        ["Cantón", "Coordinación"],
        ["Rumiñahui", "Coordinar con la zona policial competente y COE cantonal."],
        ["Mejía", "Coordinar con la zona policial competente y COE cantonal."],
        ["Pedro Vicente Maldonado", "Coordinar con la zona policial competente y COE cantonal / parroquial."],
        ["Puerto Quito", "Coordinar con la zona policial competente y COE cantonal / parroquial."]
      ],
      "Turnos": [
        ["TURNOS OPERATIVOS (24 servidores por turno)", null, null], [null, null, null],
        ["Turno", "Horario", "Personal"],
        ["Turno 1", "00:00 – 08:00", "24 servidores"],
        ["Turno 2", "08:00 – 16:00", "24 servidores"],
        ["Turno 3", "16:00 – 00:00", "24 servidores"]
      ],
      "Puntos del mapa": [
        ["PUNTOS SEÑALADOS EN EL MAPA", null, null], [null, null, null],
        ["Punto", "Símbolo en el mapa", "Coordenadas aprox. (lat, lon)"],
        ["E28 Calacalí", "Control de tránsito", "-0.0003, -78.5133"],
        ["Nanegal", "Control de tránsito", "0.1290, -78.6680"],
        ["Quito urbano", "Infraestructura estratégica", "-0.2200, -78.5125"],
        ["Redondel Mitad del Mundo", "Control de tránsito y desvíos", "-0.0060, -78.4520"],
        ["La Independencia", "Referencia (vía E28)", "-0.0200, -78.5000"],
        ["Zona de afectación E28", "Incidente", "0.0850, -78.6000"],
        ["Rumiñahui", "Coordinación (fuera del DMQ)", "-0.3126, -78.4453"],
        ["Mejía", "Coordinación (fuera del DMQ)", "-0.5104, -78.5672"],
        ["Pedro Vicente Maldonado", "Coordinación (fuera del DMQ)", "0.0861, -79.0510"],
        ["Puerto Quito", "Coordinación (fuera del DMQ)", "0.1236, -79.2531"]
      ],
      "Simbología y nota": [
        ["SIMBOLOGÍA Y NOTA", null], [null, null],
        ["Elemento", "Descripción"],
        ["Triángulo rojo", "Zonas de afectación / incidentes"],
        ["Línea roja discontinua", "Vía con afectación / cierre (E28)"],
        ["Línea amarilla", "Ejes viales principales"],
        ["Línea celeste", "Ríos y quebradas principales"],
        ["Contorno blanco", "Límite del DMQ (Zona 9)"],
        ["Contorno amarillo", "Límite cantonal"],
        ["Contorno amarillo discontinuo", "Otros cantones (zona correspondiente)"],
        ["NOTA", "Rumiñahui, Mejía, Pedro Vicente Maldonado y Puerto Quito se coordinan con las zonas policiales correspondientes y los COE cantonales y parroquiales."]
      ]
    }
  },
  "AMT": {
    // Despliegue operativo AMT · fuente: PN/AMT_Despliegue_Control_Seguridad_Movilidad.xlsx (lámina AMT).
    // La primera columna de cada hoja enlaza con los marcadores del mapa (campo sectors de AMT_POINTS).
    "sheets": {
      "Datos generales": [
        ["DESPLIEGUE OPERATIVO AMT – CONTROL, SEGURIDAD Y MOVILIDAD", null], [null, null],
        ["Campo", "Detalle"],
        ["Institución", "AMT – Agencia Metropolitana de Tránsito"],
        ["Despliegue", "Control, seguridad y movilidad dentro de nuestra jurisdicción"],
        ["Eje vial", "Vía E28 (Nanegalito – Tulipe/Gualea – Pacto – Mashpi)"],
        ["Desvíos", "Hacia el sur por la vía Alóag – Santo Domingo (3 filtros)"],
        ["Incidente", "Deslizamiento en el sector Tulipe / Gualea"],
        ["Total logística y personal", "37 recursos (22 agentes + 4 patrulleros + 11 motorizados)"],
        ["Nuestra misión", "Garantizar la seguridad vial, facilitar la circulación y apoyar a la ciudadanía en situaciones de emergencia, dentro de nuestra jurisdicción."],
        ["Lema", "Por una movilidad segura y solidaria"],
        ["Mensaje", "Trabajamos por una ciudad más segura y ordenada"]
      ],
      "Puntos de control": [
        ["PUNTOS DE CONTROL", null, null, null, null, null], [null, null, null, null, null, null],
        ["Punto", "Ubicación", "Agentes", "Patrulleros", "Motos", "Total"],
        ["Punto de control 1", "Nanegalito – Vía E28", 6, 2, 0, 8],
        ["Punto de control 2", "Desvío Km 78 – Entrada a Tulipe / Gualea", 4, 0, 4, 8],
        ["Punto de control 3", "Eje central Pacto – Mashpi", 6, 2, 4, 12],
        ["TOTAL", null, 16, 4, 8, 28]
      ],
      "Funciones": [
        ["FUNCIONES Y ACCIONES POR PUNTO", null], [null, null],
        ["Punto", "Función / acción"],
        ["Punto de control 1", "Agentes: cierre de vía."],
        ["Punto de control 1", "Desvían el transporte pesado hacia la vía Alóag – Santo Domingo."],
        ["Punto de control 1", "Retienen el tráfico liviano en zona segura."],
        ["Punto de control 2", "Agentes: cierre y control · motos: avanzadas y apoyo."],
        ["Punto de control 2", "Controlan el perímetro del deslizamiento."],
        ["Punto de control 2", "Guían a los vehículos de asistencia humanitaria y maquinaria pesada de la Prefectura."],
        ["Punto de control 3", "Patrulleros: área urbana y rural · motos: avanzadas y apoyo."],
        ["Punto de control 3", "Desplegados en el área urbana de Pacto y accesos rurales."],
        ["Punto de control 3", "Coordinan el traslado seguro de víveres a los albergues de 25 de Septiembre y La Sexta."]
      ],
      "Desvíos hacia el sur": [
        ["DESVÍOS HACIA EL SUR (VÍA ALÓAG – SANTO DOMINGO)", null, null, null], [null, null, null, null],
        ["Filtro", "Ubicación", "Agentes", "Motorizados"],
        ["1.er filtro", "Redondel del Condado", 2, 1],
        ["2.º filtro", "Intercambiador del Portal Shopping", 2, 1],
        ["3.er filtro", "Redondel de San Antonio de Pichincha", 2, 1],
        ["TOTAL", null, 6, 3]
      ],
      "Cierre especial": [
        ["CIERRE ESPECIAL – VÍA CUSUBAMBA", null], [null, null],
        ["Punto", "Detalle"],
        ["Cierre especial", "Desvío de vehículos pesados hacia la vía Alóag – Santo Domingo, para evitar que lleguen a la Panamericana Norte y generen congestión."],
        ["Cierre especial", "Desvío adicional en la Y de Cusubamba para vehículos pesados."],
        ["Cierre especial", "Se gestiona en coordinación con el Escuadrón de Carretera."]
      ],
      "Resumen logística": [
        ["RESUMEN DE LOGÍSTICA Y PERSONAL", null, null, null], [null, null, null, null],
        ["Recurso", "Puntos de control", "Desvíos", "Total"],
        ["Agentes", 16, 6, 22],
        ["Patrulleros", 4, 0, 4],
        ["Motorizados", 8, 3, 11],
        ["TOTAL LOGÍSTICA Y PERSONAL", 28, 9, 37]
      ],
      "Puntos del mapa": [
        ["PUNTOS SEÑALADOS EN EL MAPA", null, null], [null, null, null],
        ["Punto", "Tipo", "Coordenadas aprox. (lat, lon)"],
        ["Punto de control 1", "Punto de control", "0.0675, -78.6790"],
        ["Punto de control 2", "Punto de control", "0.0850, -78.7150"],
        ["Punto de control 3", "Punto de control", "0.1610, -78.7860"],
        ["1.er filtro", "Filtro de desvío", "-0.1010, -78.4990"],
        ["2.º filtro", "Filtro de desvío", "-0.0880, -78.4790"],
        ["3.er filtro", "Filtro de desvío", "-0.0090, -78.4450"],
        ["Cierre especial", "Desvío de vehículos pesados", "-0.0050, -78.5200 (sin verificar)"],
        ["Deslizamiento", "Incidente", "0.0950, -78.7300"]
      ],
      "Simbología": [
        ["SIMBOLOGÍA DEL MAPA", null], [null, null],
        ["Símbolo", "Significado"],
        ["Línea naranja", "Vía E28"],
        ["Línea amarilla", "Ruta principal"],
        ["Flecha azul", "Desvíos vía Alóag – Santo Domingo"],
        ["Flecha morada", "Desvío a Cusubamba (vehículos pesados)"],
        ["Contorno blanco punteado", "Límite de jurisdicción AMT"],
        ["Triángulo rojo", "Deslizamiento"],
        ["Señal de prohibido", "Desvío para pesados (Y de Cusubamba)"],
        ["Ícono de camión", "Desvío de vehículos pesados"]
      ],
      "Observaciones": [
        ["OBSERVACIONES DE LA LÁMINA", null], [null, null],
        ["Tema", "Observación"],
        ["Numeración", "En el mapa, el recuadro del punto 3 dice «Punto de control 2 Pacto – Mashpi»; el panel lateral lo identifica como Punto de control 3."],
        ["Filtros", "Los círculos de los filtros en el mapa muestran 3, 2, 2; se usó el orden de los rótulos (1.er, 2.º y 3.er filtro)."],
        ["Textos", "«tráfico fulono» se interpretó como tráfico liviano y «prolectura» como Prefectura."],
        ["Albergues", "25 de Septiembre y La Sexta se mencionan sin ubicación en el mapa."]
      ]
    }
  }
};
