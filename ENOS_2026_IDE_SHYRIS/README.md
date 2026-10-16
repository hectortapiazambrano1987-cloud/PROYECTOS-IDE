# ENOS 2026 IDE "SHYRIS"

Interfaz estática para consultar el despliegue operativo del Evento 8 de PN y AMT. Los datos de las hojas de cálculo están incorporados en `js/data.js`; el sitio no requiere frameworks ni librerías externas.

## Abrir localmente

1. Abra la carpeta `ENOS_2026_IDE_SHYRIS` en Visual Studio Code.
2. Instale la extensión **Live Server**, si aún no está instalada.
3. Abra `index.html` y seleccione **Open with Live Server**.

También puede abrir `index.html` directamente en el navegador. Live Server evita restricciones locales de algunos navegadores y facilita la recarga mientras se edita.

## Estructura

- `index.html`: estructura y carga de estilos y scripts.
- `css/styles.css`: presentación adaptable a pantallas pequeñas.
- `js/data.js`: datos originales de las hojas Excel de PN y AMT.
- `js/dmgr-data.js`: datos del Excel `Despliegue_Evento8_Inundaciones_DMQ.xlsx` para la pestaña DMGR.
- `MDMQ/`: mapa de la pestaña DMGR.
- `js/plan-data.js`: mapa "Plan Defensa de Quito" de la pestaña IDE y datos de `Resultados_Plan_Defensa_Quito_por_Sector.xlsx`. Incluye una cuadrícula de 8 px que indica el grupo bajo cada punto del mapa; se generó a partir de los colores de la imagen, por lo que debe regenerarse si se cambia el mapa.
- `IDE/sectores/`: capas de iluminación de cada grupo (se muestran al pasar el mouse).
- `js/ide-data.js`: información ordenada de las láminas de la carpeta IDE.
- `js/app.js`: navegación, mapas, marcadores, filtros y tablas.
- `IDE/`: matriz de decisión, concepto de la operación y láminas del Evento 8.
- `PN/`: imágenes de mapa utilizadas por los visores.

- `js/bomberos-data.js`: datos de `Bomberos_Quito_Recursos_Estaciones.xlsx` y zonas interactivas de las diapositivas de la pestaña BOMBEROS.
- `LOGOS/`: logos institucionales del encabezado (numerados en el orden en que se muestran).
- `BOMBEROS/`: diapositivas de Recursos y Estaciones.