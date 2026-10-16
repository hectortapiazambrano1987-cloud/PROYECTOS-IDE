/* Pestaña BOMBEROS: datos de BOMBEROS/Bomberos_Quito_Recursos_Estaciones.xlsx y zonas interactivas de las diapositivas 3 y 4. */
window.BOMBEROS_DATA = (() => {
  "use strict";

  const PERSONAL = [["Operativos", 135], ["Técnicos", 10], ["Administrativos", 5]];
  const VEHICLES = {
    "Vehículo de comando": 1, "Camión pluma": 1, "Autobombas": 13, "Cabezales": 1, "Camiones": 1, "Camión escalera": 1,
    "Camionetas": 17, "Fuerza de tarea": 1, "Helicóptero": 1, "Drones": 11, "MAT-PEL": 1, "Transporte logística": 1,
    "Transporte de personal": 1, "Motocicletas": 23, "Tanqueros": 14, "Unidades de rescate": 3, "Utilitarios": 1, "Ambulancias": 16
  };
  const BRIGADES = {
    "Eugenio Espejo": { address: "Veintimilla E5 – 66 y Reina Victoria (Sector La Mariscal)", stations: [1, 5, 13, 17, 21, 25, 26], chief: "Cptn. Miguel Llumiquinga" },
    "La Delicia": { address: "Av. Francisco Martín, entre Alejandro Ponce y República Dominicana", stations: [3, 9, 15], chief: "Cptn. Danilo Mendoza" },
    "Manuela Sáenz": { address: "Rocafuerte E1 – 125 y Pasaje Paredes (La Loma)", stations: [2, 12, 20], chief: "Myr. Héctor Jacho" },
    "Calderón": { address: "Ingahuaico y Mariano Godoy, barrio Redín N.º 2 (Calderón)", stations: [14, 27], chief: "Cptn. Danilo Parra" },
    "Eloy Alfaro": { address: "Juan Cueva García y Rother", stations: [4, 7], chief: "Cptn. Freddy Oña" },
    "Quitumbe": { address: "Av. Lirañán y Pasaje E (Quitumbe)", stations: [6, 16], chief: "Cptn. Pablo Andino" }
  };
  const RESOURCE_COLUMNS = ["Bomberos", "Polivalente", "Tanqueros", "UR", "Vehículos logísticos", "Ambulancias", "Motocicletas", "Unidad canina", "Helicóptero", "Escalera aérea", "RPAS"];
  const RESOURCES = {
    "Eugenio Espejo": [60, 5, 5, 0, 5, 4, 10, 0, 1, 1, 1],
    "La Delicia": [17, 2, 2, 1, 3, 3, 1, 1, 0, 0, 0],
    "Manuela Sáenz": [21, 2, 3, 0, 2, 3, 5, 0, 0, 0, 0],
    "Calderón": [14, 2, 2, 1, 2, 2, 3, 0, 0, 0, 0],
    "Eloy Alfaro": [14, 1, 2, 0, 2, 2, 3, 0, 0, 0, 0],
    "Quitumbe": [14, 1, 2, 1, 2, 2, 1, 0, 0, 0, 0]
  };
  const VEHICLE_TOTAL = Object.values(VEHICLES).reduce((sum, value) => sum + value, 0);
  // Tipo de vehículo de la diapositiva 3 → columna de "Recursos por brigada".
  const VEHICLE_COLUMN = { "Tanqueros": "Tanqueros", "Ambulancias": "Ambulancias", "Motocicletas": "Motocicletas", "Unidades de rescate": "UR", "Helicóptero": "Helicóptero", "Drones": "RPAS", "Camión escalera": "Escalera aérea" };

  const byBrigade = column => {
    const index = RESOURCE_COLUMNS.indexOf(column);
    return Object.entries(RESOURCES).filter(([, values]) => values[index] > 0).map(([name, values]) => [name, values[index]]);
  };
  const brigadeOfStation = number => Object.keys(BRIGADES).find(name => BRIGADES[name].stations.includes(number));

  const vehicleInfo = type => {
    const rows = [["Cantidad", VEHICLES[type]], ["Participación en la flota", `${(VEHICLES[type] / VEHICLE_TOTAL * 100).toFixed(1)} %`]];
    const column = VEHICLE_COLUMN[type];
    const distribution = column ? byBrigade(column) : [];
    return { title: type, rows, list: distribution.length ? { heading: `Distribución por brigada (${column})`, items: distribution } : null };
  };
  const brigadeInfo = name => {
    const brigade = BRIGADES[name];
    return {
      title: `Brigada ${name}`,
      rows: [["Dirección", brigade.address], ["Estaciones", `N.º ${brigade.stations.join(", ")} (${brigade.stations.length})`], ["Jefe", brigade.chief]],
      list: { heading: "Recursos en el mapa", items: RESOURCE_COLUMNS.map((column, i) => [column, RESOURCES[name][i]]).filter(([, value]) => value > 0) }
    };
  };
  const stationInfo = number => {
    const name = brigadeOfStation(number);
    return name
      ? { title: `Estación X${number}`, rows: [["Brigada", name], ["Jefe", BRIGADES[name].chief], ["Dirección de la brigada", BRIGADES[name].address]] }
      : { title: `Estación X${number}`, rows: [["Brigada", "No figura en el listado de brigadas de la lámina"]] };
  };

  // Cajas en coordenadas de una imagen de 2000 × 1125 (proporción de las diapositivas 2667 × 1500).
  const vehicleBoxes = [
    ["Vehículo de comando", [1095, 250, 140, 95]], ["Camión pluma", [1220, 200, 150, 95]], ["Autobombas", [1375, 185, 155, 100]],
    ["Cabezales", [1550, 225, 130, 100]], ["Camiones", [1660, 350, 120, 90]], ["Camión escalera", [1700, 455, 120, 105]],
    ["Camionetas", [1710, 580, 150, 80]], ["Fuerza de tarea", [1715, 695, 110, 100]], ["Helicóptero", [1630, 825, 145, 100]],
    ["Drones", [1525, 910, 100, 85]], ["MAT-PEL", [1395, 950, 110, 90]], ["Transporte logística", [1250, 945, 135, 95]],
    ["Transporte de personal", [1110, 895, 135, 95]], ["Motocicletas", [1010, 785, 160, 105]], ["Tanqueros", [970, 685, 145, 95]],
    ["Unidades de rescate", [960, 560, 125, 100]], ["Utilitarios", [970, 455, 125, 75]], ["Ambulancias", [980, 350, 165, 80]]
  ];
  const stationMarkers = [
    [22, 1305, 245], [15, 1540, 347], [23, 1452, 424], [9, 1562, 429], [14, 1626, 424], [3, 1561, 490], [21, 1596, 508], [13, 1590, 534],
    [10, 1770, 522], [26, 1512, 551], [12, 1468, 579], [13, 1596, 577], [2, 1503, 593], [20, 1528, 612], [1, 1571, 606], [8, 1623, 600],
    [7, 1482, 640], [4, 1524, 660], [5, 1490, 690], [24, 1572, 700], [11, 1635, 705], [16, 1480, 757], [19, 1548, 810]
  ];

  const VIEWS = {
    recursos: {
      label: "Recursos",
      title: "Recursos · funcionarios y vehículos operativos",
      path: "BOMBEROS/Diapositiva_3.png",
      hotspots: [
        { box: [127, 590, 462, 380], info: { title: "Funcionarios", rows: [["Total", 150], ...PERSONAL] } },
        { box: [1220, 430, 365, 365], info: { title: "Vehículos operativos", rows: [["Cifra de la diapositiva", 90], ["Suma de los tipos", VEHICLE_TOTAL], ["Sin contar drones", VEHICLE_TOTAL - VEHICLES.Drones]], note: "La diapositiva indica 90 vehículos; la suma de los tipos no coincide." } },
        ...vehicleBoxes.map(([type, box]) => ({ box, info: vehicleInfo(type) }))
      ]
    },
    estaciones: {
      label: "Estaciones",
      title: "Estaciones · brigadas distritales",
      path: "BOMBEROS/Diapositiva_4.png",
      hotspots: [
        { box: [70, 150, 950, 205], info: { title: "27 estaciones", rows: [["Estaciones (diapositiva)", 27], ["Listadas por brigada", 19]], note: "Contamos con estaciones y equipos especializados distribuidos estratégicamente en todo el Distrito Metropolitano de Quito." } },
        { box: [110, 410, 560, 130], info: { title: "06 brigadas distritales", rows: Object.entries(BRIGADES).map(([name, b]) => [name, `${b.stations.length} estaciones · ${b.chief}`]) } },
        ...[["Eugenio Espejo", [115, 575, 350, 120]], ["La Delicia", [495, 575, 370, 120]], ["Manuela Sáenz", [115, 740, 300, 120]], ["Calderón", [495, 740, 330, 120]], ["Eloy Alfaro", [115, 905, 280, 120]], ["Quitumbe", [495, 905, 300, 120]],
          ["La Delicia", [1508, 40, 193, 298]], ["Calderón", [1712, 248, 192, 268]], ["Manuela Sáenz", [1085, 255, 192, 240]], ["Eugenio Espejo", [1656, 537, 192, 330]], ["Eloy Alfaro", [1077, 615, 190, 238]], ["Quitumbe", [1327, 815, 190, 268]]]
          .map(([name, box]) => ({ box, info: brigadeInfo(name) })),
        ...stationMarkers.map(([number, x, y]) => ({ box: [x - 12, y - 11, 46, 22], marker: true, info: stationInfo(number) }))
      ]
    }
  };

  return { WIDTH: 2000, HEIGHT: 1125, VIEWS };
})();
