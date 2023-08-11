import './style.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ';
import {createStringXY} from 'ol/coordinate';
import Feature from 'ol/Feature.js';
import Polygon from 'ol/geom/Polygon.js';
import Point from 'ol/geom/Point.js';
import VectorLayer from 'ol/layer/Vector'
import {composeCssTransform} from 'ol/transform';
import Geometry from 'ol/geom/Geometry.js';
import { get } from "ol/proj";
import {
addCoordinateTransforms,
addProjection,
transform,

} from 'ol/proj.js';

import {Circle, Fill, Stroke, Style} from 'ol/style.js';
import CanvasVectorLayerRenderer from 'ol/renderer/canvas/VectorLayer.js';
import VectorSource from 'ol/source/Vector';
const tileSize = 512; // Tamaño de tus imágenes de mosaico
const containerWidth = 918; // Ancho del contenedor en píxeles
const containerHeight = 665; // Alto del contenedor en píxele


const resolutions = [];
for (let i = 0; i <= 3; i++) {
  const resolution = tileSize / Math.pow(2, i);
  resolutions.push(resolution);
}

/*funcin para crear las capas o mosaicos que crean el mapa 
  comenzando con el zoom, luego pasa coordenada en x luego coordenada en y 
*/
const layers = new TileLayer({
  source:new XYZ({
  url:'./escenarios/{z}/{x}/{y}.png',
  wrapX: false,
  minResolution:43654.70227187199,
  maxZoom:0,
  }),
  })

  const layers1= new TileLayer({
    source:new XYZ({
    url:'./escenarios/{z}/{x}/{y}.png',
    wrapX: false,
    tileSize: 512,
    }),
    })

const layerss = [layers1]
 


  let miprojection = get("EPSG:3857");


//funcion para crear la vista del mapa
const view = new View({
  center: [0, 0],
  zoom: 0,
  maxZoom:2,
  minZoom:0,
  projection: miprojection,

  extent: [
    -20037508.342789244, -20037508.342789244, 20037508.342789244,
    20037508.342789244,
  ],
  
});

const map = new Map({
  target: 'map',
  layers: layerss,
  view: view,
  
  });




//con esta metodo de una istancia del mapa se captura el evento click del mosaico o de el lienzo de el mapa
map.on('click', (event)=>{
  console.log('click en el lienzo del mapa', view.getZoom());
  console.log('el centro del lienzo es', view.getCenter());
  console.log('la resolucion es', view.getResolution());
  console.log('la proyecion es ', view.getProjection());
  const coordinate = event.coordinate;
  console.log('la Longitud es', coordinate )
  
  //Convertir coordenadas geograficas a coordenadas cartesianas
  const cartesianCoordinates = transform(coordinate, view.getProjection(), 'EPSG:4326');
  console.log('Las coordenadas cartesianas son', cartesianCoordinates);


  //Convertir coordenadas cartesianas a coordenadas de píxeles
  const pixelCoordinates = transform(cartesianCoordinates, view.getProjection(), 'EPSG:3857');
  console.log('Las coordenadas de píxeles son', pixelCoordinates);
  
  });

 /*map.getView().on('change:resolution', ()=>{
    const currentZoom = map.getView().getZoom();
   
    layerss.forEach(layer => layer.setVisible(false));

    if (currentZoom >= 0 && currentZoom < 1) {
      console.log("mayor o igual a cero y menor que 1")
      layerss[0].setVisible(true);
    } else if (currentZoom >= 1 && currentZoom < 2) {
    console.log("mayor o igual a c1 y menor que 2")
    console.log(layerss[1])
    layerss[1].setVisible(true);
    } else if (currentZoom >= 2) {
      layerss[2].setVisible(true);
    }

  })*/
 
  const latitude =  4511952.216451015;  // Cambiar a la latitud deseada
const longitude = -4514936.424614135; // Cambiar a la longitud deseada

// Crear una característica con la coordenada geográfica
const markerFeature = new Feature({
  geometry:  new  Point([longitude, latitude]),
});
// Estilo del marcador (círculo SVG)
const markerStyle = new Style({
  image: new Circle({
    radius: 5, // Cambiar el tamaño del círculo según tus necesidades
    fill: new Fill({ color: 'red' }), // Cambiar el color de relleno
    stroke: new Stroke({ color: 'black', width: 2 }), // Cambiar el color del borde
  }),
});

// Aplicar el estilo al marcador
markerFeature.setStyle(markerStyle);

// Crear una capa vectorial para el marcador
const markerLayer = new VectorLayer({
  source: new VectorSource({
    features: [markerFeature],
  }),
});

// Agregar la capa vectorial al mapa
map.addLayer(markerLayer);

function convertCoordinatesToOpenLayers(coordinates) {
  var lon = coordinates[0];
  var lat = coordinates[1];
  var point = new Point(lon, lat);
  return point;
}


 let  coordinates = [2045, 1657];


var point = convertCoordinatesToOpenLayers(coordinates);
console.log('EL PUNTO', point )


const svgMarkup = `
  <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="10" fill="blue" />
  </svg>`;
const svgIcon = new Icon({
  src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgMarkup),
  anchor: [0.5, 1],
});

// Crear una característica con el elemento SVG como geometría
const feature = new Feature({
  geometry: new Point([0, 0]),
});
feature.setStyle(new Style({ image: svgIcon }));

// Agregar la característica a la capa de vectores



