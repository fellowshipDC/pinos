import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { states } from './mexican_states';
import * as L from 'leaflet';
import { MatSliderModule } from '@angular/material';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.styl']
})
export class MapComponent implements OnInit {

  data: any;
  nationalTL: any;
  nationalCo2: any;
  map = null;
  co2 = [];
  treeLoss = [];
  year = 2001;
  center = [20.132442, -102.852647];
  zoom = 4.5;
  layerOn= true;
  
  constructor(private http: HttpClient) { }

  setmap(){
    //set base characteristics
      this.map = L.map('mapid',{
        maxZoom: 5.5,
        minZoom: 2.5,
        zoomSnap: 0,
        zoomDelta: 0.25,
        maxBoundsViscosity: 0.9,
      });
      this.map.setView(this.center, this.zoom);

    //set styles functions
      function getColorTreeLoss(d) {
        return d >= 9000 ? '#8C2D04' :
              d >= 4000  ? '#CC4C02' :
              d >= 2500  ? '#EC7014' :
              d >= 1500  ? '#FE9929' :
              d >= 800   ? '#FEC44F' :
              d >= 250   ? '#FEE391' :
              d >= 100   ? '#FFF7BC' :
                         '#F4FFCa' ;
      }

      var styleStatesTreeLoss = (feature) => {
        var featureStateId = feature.properties.sub_nat_id;//find the state to be styled
        //find the year wanted
        var forYear = this.treeLoss.filter((obj)=>{ 
          if(obj.year == this.year){
            return true;
          }
        })
        //find the state in data
        for (var i = 0; i < forYear.length; i++){
          if(forYear[i].sub_nat_id == featureStateId){
            return {
              fillColor: getColorTreeLoss(forYear[i].value),
              weight: 2,
              opacity: 1,
              color:  '#fafafa',
              dashArray: '3',
              fillOpacity: 0.7
          };
          }
        }
      }

      function getColorCo2(d) {
        return d >= 1000000 ? '#252525' :
              d >= 500000  ? '#525252' :
              d >= 200000  ? '#737373' :
              d >= 100000  ? '#969696' :
              d >= 50000  ? '#bdbdbd' :
              d >= 20000   ? '#d9d9d9' :
              d >= 10000   ? '#f0f0f0' :
                          '#ffffff';
      }

      var styleStatesCo2 = (feature)=> {
        var featureStateId = feature.properties.sub_nat_id;//find the state to be styled
        //find the year wanted
        var forYear = this.co2.filter((obj)=>{ 
          if(obj.year == this.year){
            return true;
          }
        })
        //find state and year in data
        for (var i = 0; i < forYear.length; i++){
          if(forYear[i].sub_nat_id == featureStateId){
            return {
            fillColor: getColorCo2(forYear[i].value * 1000000),
            weight: 2,
            opacity: 1,
            color: '#fafafa',
            dashArray: '3',
            fillOpacity: 0.7
            }
          }
        };
      }

      
    //Map layers 
      //Base layers (deforestation rate & Co2 mt2 emmissions)
      var layer1 = L.geoJson(states, {style: styleStatesTreeLoss, onEachFeature: mouseEffects});
      var layer2 = L.geoJson(states, {style: styleStatesCo2, onEachFeature: mouseEffects});

      //Define current layer
      var currentLayer = ''
      if(this.layerOn){
        currentLayer = "Hectáreas perdidas";
        layer1.addTo(this.map);
      }
      else{
        currentLayer = "Emisiones de CO2";
        layer2.addTo(this.map);
      }

      //Define set of layers
      var baseLayers = {
        "Hectáreas perdidas": layer1,
        "Emisiones de CO2": layer2
      }

    //info controls
      //details control 
      var details = L.control({position: 'bottomleft'});
      
      details.onAdd = function(map){
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
      };

      details.update = (prop) => {
        //set details according to layer data
        if(currentLayer == 'Hectáreas perdidas'){

          //find state and year wanted
          var propData = prop ? this.treeLoss.filter((obj)=>{
            if(obj.year == this.year && obj.sub_nat_id == prop.sub_nat_id){
              return true;
            }
          })[0].value.toLocaleString('en', {maximumFractionDigits: 2}) : '';

          //write it on 
          details._div.innerHTML = '<h4>Deforestación en México<br>' + this.year + '</h4>' + 
          '<p>' + (prop ? '<b>' + prop.admin_name +  '</b><br />' + propData + ' ha perdidas'
          : 'Selecciona un estado') + '</p>';
        }
        else{

          //find state and year wanted
          var propData = prop ? this.co2.filter((obj)=>{
            if(obj.year == this.year && obj.sub_nat_id == prop.sub_nat_id){
              return true;
            }
          })[0].value : '';

          //scale value
          propData = (propData* 1000000).toLocaleString(undefined, {maximumFractionDigits: 2});
          //write it on

          details._div.innerHTML = '<h4>Deforestación en México<br>' + this.year + '</h4>' + 
          '<p>' + (prop ? '<b>' + prop.admin_name +  '</b><br />' + propData + ' toneladas de CO2 <br>emitidas por deforestación' 
          : 'Selecciona un estado') + '</p>';
        }
      };

      details.addTo(this.map);
      
      //data scale legend
      var legend = L.control({position: 'bottomright'});

      legend.onAdd = function(map){
        this._div = L.DomUtil.create('div', 'info legend');
        this.update();
        
        return this._div;
      };

      legend.update = function(layer){
        this._div.innerHTML = '';

        if (currentLayer == 'Hectáreas perdidas'){//change for layer's name
          var grades = [0, 100, 250, 800, 1500, 2500, 4000, 9000];
          for (var i = 0; i < grades.length; i++){
            this._div.innerHTML += '<i class="fa fa-square" style="color:' + getColorTreeLoss(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? ' +' +'<br>' : ' +');
          }
        }
        else{
          var grades = [0, 10000, 20000, 50000, 100000, 200000, 500000, 1000000];
          for (var i = 0; i < grades.length; i++){
            this._div.innerHTML += '<i class="fa fa-square" style="color:' + getColorCo2(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? ' +' + '<br>' : ' +');
          }
        }

        
      };

      legend.addTo(this.map);
    
    //effects control
      //hover effect
      function highlight(e) {
        var layer = e.target;
    
        layer.setStyle({
            weight: 3,
            color: '#666666',
            dashArray: '',
            fillOpacity: 1
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

      //function to set effects for eachfeature
      function mouseEffects(feature, layer){
        layer.on({
          mouseover: highlight,
          mouseout: resetHighlight,
        });
      }

    //layers control
      //tile layer supplier
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoic2F0aXJhbWEiLCJhIjoiY2phcmhpZWxjNGppaDJ3cGwyYmp0NGVtZyJ9.1E3t6hV_CYLzQ_0Ba1IFmQ'
      }).addTo(this.map);
      
      //Add layers with control and track current layer
      L.control.layers(baseLayers).addTo(this.map);
      this.map.on('baselayerchange', (e) => {
        currentLayer = e.name;//updates layer
        legend.update(currentLayer);//updates legend
        this.layerOn = !this.layerOn;
      })
  }

  ngOnInit() {
    this.getData();
  }

  nationalValues(){
    //if(this.data !== undefined|| this.data !== null){
      this.nationalTL = this.data.data.filter((obj) => {
        if (obj.indicator_id == 1 && isNaN(obj.sub_nat_id) && obj.boundary_id ==1 && obj.thresh == 10 && this.year === obj.year){
          return true;
        }
      })[0].value.toLocaleString('en', {maximumFractionDigits: 2});
      this.nationalCo2 = this.data.data.filter((obj) => {
        if (obj.indicator_id == 14 && isNaN(obj.sub_nat_id) && obj.boundary_id ==1 && obj.thresh == 10 && this.year === obj.year){
          return true;
        }
      })[0].value.toLocaleString('en', {maximumFractionDigits: 2});
   //}
  }

  getData() {
    this.http.get('http://localhost:3000/forest')
    .subscribe(
      res => {
        this.data = res;
        if(this.data !== undefined || this.data !== null){
          this.nationalValues();
          this.treeLoss = this.data.data.filter((obj)=>{
            if (obj.indicator_id == 1 && obj.sub_nat_id > 0 && obj.boundary_id ==1 && obj.thresh == 10){
              return true;
            }
            else{
              return false;
            }
          });
          this.co2 = this.data.data.filter((obj)=>{
            if (obj.indicator_id == 14 && obj.sub_nat_id > 0 && obj.boundary_id ==1 && obj.thresh == 10){
              return true;
            }
            else{
              return false;
            }
          });
          
          if (this.treeLoss.length > 0 && this.co2.length > 0){
            this.setmap();
          }
        }
      },
      err => {
        console.log('error');
      }
    )
  }

  changeYear(year) {
    this.year = year;
    if(this.map !== undefined|| this.map !== null){
      this.center = this.map.getCenter();
      this.zoom = this.map.getZoom();
      this.map.remove();
    }
    this.nationalValues();    
  }
}
