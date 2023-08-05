import './style.css';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import {Draw, Modify, Snap, DragPan} from 'ol/interaction.js';
import {GeometryCollection, Point, Polygon} from 'ol/geom.js';
import {Map, View} from 'ol';
import {OSM, TileDebug,  Vector as VectorSource, ImageStatic }from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer, Layer} from 'ol/layer.js';
import {circular} from 'ol/geom/Polygon.js';
import {getDistance} from 'ol/sphere.js';
import {transform} from 'ol/proj.js';
import Circle from 'ol/geom/Circle.js';
import Feature from 'ol/Feature.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import {getCenter} from 'ol/extent.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import XYZ from 'ol/source/XYZ.js';
import TileWMS from 'ol/source/TileWMS.js';

import {get as getProjection} from 'ol/proj.js';
import {getWidth} from 'ol/extent.js';

import ImageLayer from 'ol/layer/Image.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic';


/*
const projExtent = getProjection('EPSG:3857').getExtent();
const startResolution = getWidth(projExtent) / 256;
const resolutions = new Array(22);
for (let i = 0, ii = resolutions.length; i < ii; ++i) {
  resolutions[i] = startResolution / Math.pow(2, i);
}
const tileGrid = new TileGrid({
  extent: [-13884991, 2870341, -7455066, 6338219],
  resolutions: resolutions,
  tileSize: [512, 256],
});

const layers = [
  new TileLayer({
    source: new OSM(),
  }),
  new TileLayer({
    source: new TileWMS({
      url: '/escenario/0/0/0.png',
      params: {'LAYERS': 'topp:states', 'TILED': true},
      serverType: 'geoserver',
      tileGrid: tileGrid,
    }),
  }),
];*/
/*
https://openlayers.org/en/latest/examples/offscreen-canvas.html
tener en cuenta al momento de crear mosaicos podria ser util
*/




/*
const image = new CircleStyle({
  radius: 50,
  fill:new Fill({color:'red'}),
  stroke: new Stroke({color: '#000', width: 4}),
});

const styles = {
  'Point': new Style({
    image: image,
  }),

  'Polygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
  
}

const styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

const geojsonObject = {
  'type': 'FeatureCollection',

  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [50, 0],
      },
    },


 

  ],
};

const vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(geojsonObject),
});

vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: styleFunction,
});
*/
/*const extent = [0, 0, 1024, 968];
const projection = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: extent,
});*/

const miview = new View({
  //projection: projection,
  // center: getCenter(extent),


  center: [300, 0],
  //center: transform([-112.18688965, 36.057944835], 'EPSG:4326', 'EPSG:3857'),
   zoom: 0,
   maxZoom:2,
   units: 'pixels'
    
 })
const attributions =
  'de mi autoria';
const map = new Map({
  target: 'map',
  /*layers: [
    /*new TileLayer({
      source: new OSM()
    }),
   vectorLayer,*/
   /*new ImageStatic({
    url:'/escenario/0/0/0.png',
    imageExtent: [0, 0, 300, 300], // Extensión geográfica de la imagen
   })*/
  /* new ImageLayer({
    source:new Static(
      {
        attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
        url: './escenario/0/0/0.png',
        projection: projection,
        imageExtent: extent,
      }
    ),
   })*/
   
 // ],
  //layers:layers,
  layers:[
    new TileLayer({
      source: new XYZ({
        attributions: attributions,
        url:'./escenarios/{z}/{x}/{y}.png',
        tilePixelRatio: 1,
       
      }),
    }),
  ],

  view: miview,
});


map.on('click', (event)=>{
  const coordinate = event.coordinate;
  console.log('has hecho clic en las coordenada',coordinate);
  console.log("el zooom antes ",miview.getZoom());
  miview.setZoom(0);
  console.log("la resolucion es",miview.getResolution());
} );


//creando marcadores
let marker = new Feature({
  geometry: new Circle([0, 0], 12),

});



map.getInteractions().forEach(function (interaction) {
 
});


