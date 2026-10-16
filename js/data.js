// Datos transcritos directamente de las hojas Excel de PN (Evento 3) y AMT.
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
    "sheets": {
      "Datos generales": [
        [
          "DESPLIEGUE OPERATIVO AMT – EVENTO 8",
          null
        ],
        [
          null,
          null
        ],
        [
          "Campo",
          "Detalle"
        ],
        [
          "Institución",
          "AMT – Agencia Metropolitana de Tránsito"
        ],
        [
          "Evento",
          "Despliegue Operativo AMT – Evento 8"
        ],
        [
          "Tipo de evento",
          "Inundaciones, deslizamientos y colapsos de infraestructura"
        ],
        [
          "Fecha y hora del evento",
          "02/11/2028 – 01:00"
        ],
        [
          "Ámbito (mapa)",
          "Distrito Metropolitano de Quito (DMQ)"
        ],
        [
          "Provincias limítrofes (mapa)",
          "Pichincha, Imbabura, Sucumbíos, Napo, Cotopaxi, Manabí"
        ],
        [
          "Escala del mapa",
          "0 – 5 – 10 – 15 km"
        ],
        [
          "Objetivo operativo",
          "Reducir la exposición al riesgo, prevenir siniestros y garantizar el acceso seguro de los organismos de primera respuesta."
        ],
        [
          "Mensaje institucional",
          "La AMT garantiza la movilidad segura, el control del tránsito y el apoyo a los organismos de primera respuesta."
        ]
      ],
      "Recursos totales": [
        [
          "RECURSOS TOTALES",
          null,
          null
        ],
        [
          null,
          null,
          null
        ],
        [
          "Recurso",
          "Cantidad",
          "Observación"
        ],
        [
          "Total agentes AMT",
          1333,
          null
        ],
        [
          "Agentes por turno de 8 horas",
          933,
          "70%"
        ],
        [
          "Agentes por turno de 12 horas",
          400,
          "30%"
        ],
        [
          "Motos",
          187,
          "Aproximado"
        ],
        [
          "Patrulleros",
          47,
          "Aproximado"
        ],
        [
          "Puntos de emergencia",
          15,
          null
        ]
      ],
      "Distribución por punto": [
        [
          "DISTRIBUCIÓN DE ACTS, MOTOS Y PATRULLEROS POR PUNTO DE EMERGENCIA",
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null
        ],
        [
          "N.º",
          "Punto de emergencia",
          "ACTS asignados",
          "Motos",
          "Patrulleros"
        ],
        [
          1,
          "Centro Histórico",
          12,
          4,
          2
        ],
        [
          2,
          "Comité del Pueblo",
          8,
          3,
          1
        ],
        [
          3,
          "Concepción",
          6,
          2,
          1
        ],
        [
          4,
          "Cotocollao",
          7,
          3,
          1
        ],
        [
          5,
          "Puengasí",
          5,
          2,
          1
        ],
        [
          6,
          "Guamaní",
          6,
          2,
          1
        ],
        [
          7,
          "La Argelia",
          7,
          3,
          1
        ],
        [
          8,
          "La Ecuatoriana",
          6,
          2,
          1
        ],
        [
          9,
          "La Ferroviaria",
          4,
          1,
          1
        ],
        [
          10,
          "Cuenca del río Monjas y Pomasquí",
          12,
          4,
          2
        ],
        [
          11,
          "Prolongación Av. Simón Bolívar y Av. Carlos Fortines",
          12,
          4,
          2
        ],
        [
          12,
          "La Capilla (Calderón) y La Bota",
          10,
          3,
          2
        ],
        [
          13,
          "La Gasca, La Comuna, Atucucho y San Juan",
          12,
          4,
          2
        ],
        [
          14,
          "Monjas, El Madrigal, parque Cuscungo y autopista General Rumiñahui",
          10,
          3,
          2
        ],
        [
          15,
          "Vía Quito–Cayambe (peaje)",
          6,
          2,
          1
        ],
        [
          null,
          "SUBTOTAL PUNTOS",
          123,
          42,
          21
        ],
        [
          null,
          "RESERVA OPERATIVA",
          30,
          10,
          5
        ],
        [
          null,
          "TOTAL (puntos + reserva)",
          153,
          52,
          26
        ],
        [
          null,
          null,
          null,
          null,
          null
        ],
        [
          "Nota de la imagen: la distribución de recursos se refiere y puede ajustarse a la disponibilidad real del personal y medios.",
          null,
          null,
          null,
          null
        ]
      ],
      "Actividades AMT": [
        [
          "ACTIVIDADES ESPECÍFICAS AMT – SEGURIDAD VIAL Y GESTIÓN DEL RIESGO",
          null
        ],
        [
          null,
          null
        ],
        [
          "N.º",
          "Actividad"
        ],
        [
          1,
          "Desplegar agentes en puntos críticos y accesos a zonas afectadas."
        ],
        [
          2,
          "Ejecutar cierres preventivos y desvíos coordinados ante inundaciones, deslizamientos o colapsos."
        ],
        [
          3,
          "Controlar tránsito y mantener corredores libres para Bomberos, Salud, Policía y equipos de respuesta."
        ],
        [
          4,
          "Monitorear condiciones viales y reportar novedades georreferenciadas al ECU 911 / COE-M."
        ],
        [
          5,
          "Coordinar con EPMMOP, administraciones zonales y organismos de respuesta la señalización, delimitación y reapertura segura."
        ],
        [
          6,
          "Gestionar rutas alternas, movilidad peatonal y protección de usuarios vulnerables."
        ],
        [
          7,
          "Mantener enlace operativo y actualización de información durante todo el evento."
        ],
        [
          8,
          "Activar reserva, motos y patrulleros según evolución del incidente y priorización."
        ]
      ],
      "Puntos del mapa": [
        [
          "PUNTOS SEÑALADOS EN EL MAPA",
          null
        ],
        [
          null,
          null
        ],
        [
          "Punto en el mapa",
          "Color del marcador"
        ],
        [
          "Vía Quito–Cayambe (peaje)",
          "Amarillo"
        ],
        [
          "Pomasquí",
          "Azul"
        ],
        [
          "Calderón (La Capilla)",
          "Morado"
        ],
        [
          "La Bota",
          "Azul"
        ],
        [
          "Cotocollao",
          "Rojo"
        ],
        [
          "Atucucho, La Comuna, San Juan",
          "Azul"
        ],
        [
          "Comité del Pueblo",
          "Rojo"
        ],
        [
          "Concepción",
          "Rojo"
        ],
        [
          "Monjas (Cuscungo / El Madrigal)",
          "Naranja"
        ],
        [
          "DMQ (Centro Histórico)",
          "Ícono de iglesia"
        ],
        [
          "Av. Carlos Fortines (Prolongación Simón Bolívar)",
          "Amarillo"
        ],
        [
          "El Madrigal",
          "Naranja"
        ],
        [
          "Puengasí",
          "Morado"
        ],
        [
          "La Argelia",
          "Rojo"
        ],
        [
          "Parque Cuscungo",
          "Azul"
        ],
        [
          "La Ecuatoriana",
          "Verde"
        ],
        [
          "Guamaní",
          "Verde"
        ],
        [
          "La Ferroviaria",
          "Rojo"
        ],
        [
          "La Capilla (Calderón) y La Bota",
          "Morado"
        ],
        [
          "Autopista General Rumiñahui (Corredor dentro del DMQ)",
          "Amarillo"
        ]
      ],
      "Simbología": [
        [
          "SIMBOLOGÍA DEL MAPA",
          null
        ],
        [
          null,
          null
        ],
        [
          "Símbolo",
          "Significado"
        ],
        [
          "Marcador rojo",
          "Inundación"
        ],
        [
          "Marcador amarillo",
          "Deslizamiento / Colapso"
        ],
        [
          "Marcador morado",
          "Control vial"
        ],
        [
          "Línea amarilla",
          "Corredor prioritario"
        ],
        [
          "Contorno blanco",
          "Límite DMQ"
        ],
        [
          "Línea azul",
          "Vías principales"
        ]
      ]
    }
  }
};
