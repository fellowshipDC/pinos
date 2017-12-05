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
    //set the map characteristics
    this.map = L.map('mapid',{
      center: [23.132442, -102.852647],
      zoom: 4.5,
      maxZoom: 5.5,
      minZoom: 4,
      zoomSnap: 0,
      zoomDelta: 0.25,
      maxBounds: [this.corner1, this.corner2],
      maxBoundsViscosity: 0.9
    });

    //tile layer supplier
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoic2F0aXJhbWEiLCJhIjoiY2phcmhpZWxjNGppaDJ3cGwyYmp0NGVtZyJ9.1E3t6hV_CYLzQ_0Ba1IFmQ'
    }).addTo(this.map);

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

    function highlightFeature(e) {
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
  }
  
    //L.geoJson(world, {style: styleWorld}).addTo(this.map);
    var layer1 = L.geoJson(states, {style: styleStates1}).addTo(this.map);
    var layer2 = L.geoJson(states, {style: styleStates2}).addTo(this.map);

    var baseLayers = {
      "Layer 1": layer1,
      "Layer 2": layer2
    }

    L.control.layers(baseLayers).addTo(this.map);

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
