import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { states } from './mexican_states';
//import { world } from './worldgeojson';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.styl']
})
export class MapComponent implements OnInit {

  data: any;
  map: any;
  corner1 = [40.313701, -130.480714];
  corner2 = [5.156748, -74.840222];
  
  constructor(private http: Http) { }

  setmap(){

    //set base characteristics
    this.map = L.map('mapid',{
      center: [23.132442, -102.852647],
      zoom: 4.5,
      maxZoom: 5.5,
      minZoom: 3,
      zoomSnap: 0,
      zoomDelta: 0.25,
      //maxBounds: [this.corner1, this.corner2],
      maxBoundsViscosity: 0.9,
    });

    //set styles functions
    function getColor1(d) {
      return d > 30 ? '#800026' :
             d > 26  ? '#BD0026' :
             d > 22  ? '#E31A1C' :
             d > 18  ? '#FC4E2A' :
             d > 14   ? '#FD8D3C' :
             d > 10   ? '#FEB24C' :
             d > 6   ? '#FED976' :
                        '#FFEDA0';
    }

    function styleStates1(feature) {
      return {
          fillColor: getColor1(feature.properties.sub_nat_id),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
      };
    }

    function getColor2(d) {
      return d > 30 ? '#034e7b' :
             d > 26  ? '#0570b0' :
             d > 22  ? '#3690c0' :
             d > 18  ? '#74a9cf' :
             d > 14   ? '#a6bddb' :
             d > 10   ? '#d0d1e6' :
             d > 6   ? '#ece7f2' :
                        '#fff7fb';
    }

    function styleStates2(feature) {
      return {
          fillColor: getColor2(feature.properties.sub_nat_id),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
      };
    }

    
  //Map layers 
    //Base layers (deforestation rate & Co2 mt2 emmissions)
    var layer1 = L.geoJson(states, {style: styleStates1, onEachFeature: mouseEffects}).addTo(this.map);
    var layer2 = L.geoJson(states, {style: styleStates2, onEachFeature: mouseEffects});
    
    //Over layers (shows if deforestation occurred in a protected or mining area)
    var overlay11 = L.marker([10.6595382,-100.3494]).bindPopup('This is Littleton, CO.');
    var overlay12 = L.marker([15.3765406,-83.6694021]).bindPopup('This is Littleton, CO.');

    var overlay21 = L.marker([20.6595382,-103.3494]).bindPopup('This is Littleton, CO.');
    var overlay22 = L.marker([7.3765406,-93.6694021]).bindPopup('This is Littleton, CO.');

    var overlay1 = L.layerGroup([overlay11, overlay12]);
    var overlay2 = L.layerGroup([overlay21, overlay22]);

    //Define set of layers
    var baseLayers = {
      "Layer 1": layer1,
      "Layer 2": layer2
    }

    var overLayers = {
      "Over 1": overlay1,
      "Over 2": overlay2
    }

    var currentLayer = "Layer 1";
    

  //info controls
    //details control 
    var details = L.control({position: 'bottomleft'});
    
    details.onAdd = function(map){
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };

    details.update = function(prop){
      this._div.innerHTML = '<h4>Deforestación en México</h4>' + 
      (prop ? '<b>' + prop.admin_name +  '</b><br />' + 'state' + prop.sub_nat_id 
      : 'Hover over a state');
    }

    details.addTo(this.map);
    
    //data scale legend
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function(map){
      this._div = L.DomUtil.create('div', 'info legend');
      this.update();
      /*var grades = [0, 5, 9, 14, 19, 24, 29];
      var labels = [];

      for (var i = 0; i < grades.length; i++){
        this._div.innerHTML += '<i class="fa fa-square" style="color:' + getColor1(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + (grades[i + 1]-1) + '<br>' : '+');
      }*/
      return this._div;
    }

    legend.update = function(layer){
      this._div.innerHTML = '';
      var grades = [0, 5, 9, 14, 19, 24, 29];
      var labels = [];

      if (currentLayer == 'Layer 1'){//change for layer's name
        for (var i = 0; i < grades.length; i++){
          this._div.innerHTML += '<i class="fa fa-square" style="color:' + getColor1(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + (grades[i + 1]-1) + '<br>' : '+');
        }
      }
      else{
        for (var i = 0; i < grades.length; i++){
          this._div.innerHTML += '<i class="fa fa-square" style="color:' + getColor2(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + (grades[i + 1]-1) + '<br>' : '+');
        }
      }

      
    }

    legend.addTo(this.map);
  
  //effects control
    //hover effect
    function highlight(e) {
      var layer = e.target;
  
      layer.setStyle({
          weight: 5,
          color: '#666666',
          dashArray: '',
          fillOpacity: 0.7
      });
  
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
      }

      details.update(layer.feature.properties);
    }

    //mouse out effect
    function resetHighlight(e){
      baseLayers[currentLayer].resetStyle(e.target);
      details.update();
    }

    //function to zoom to clicked state
    function zoomFeature(e) {
      console.log('fit', e.target._bounds._northEast);
      this.map.flyToBounds([[e.target._bounds._northEast.lat, e.target._bounds._northEast.lng],
      e.target._bounds._southWest.lat, e.target._bounds._southWest.lng])
    }

    //function to set effects for eachfeature
    function mouseEffects(feature, layer){
      layer.on({
        mouseover: highlight,
        mouseout: resetHighlight,
        click: zoomFeature
      });
    }

  //layers control
    //tile layer supplier
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.light',
      accessToken: 'pk.eyJ1Ijoic2F0aXJhbWEiLCJhIjoiY2phcmhpZWxjNGppaDJ3cGwyYmp0NGVtZyJ9.1E3t6hV_CYLzQ_0Ba1IFmQ'
    }).addTo(this.map);

    //Add layers with control and track current layer
    L.control.layers(baseLayers, overLayers).addTo(this.map);
    this.map.on('baselayerchange', function(e){
      currentLayer = e.name;//updates layer
      legend.update(currentLayer);//updates legend
    })
  }

  ngOnInit() {
    //this.getData();
    this.setmap();
  }

  getData() {
    this.http.get('http://localhost:3000/forest')
    .subscribe((res: Response) => this.data = res.json())
  }

}
