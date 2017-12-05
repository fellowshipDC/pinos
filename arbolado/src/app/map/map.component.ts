import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { states } from './mexican_states';
import { world } from './worldgeojson';
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

  ngOnInit() {
    //this.getData();
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

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoic2F0aXJhbWEiLCJhIjoiY2phcmhpZWxjNGppaDJ3cGwyYmp0NGVtZyJ9.1E3t6hV_CYLzQ_0Ba1IFmQ'
    }).addTo(this.map);

    function getColor(d) {
      return d > 30 ? '#800026' :
             d > 26  ? '#BD0026' :
             d > 22  ? '#E31A1C' :
             d > 18  ? '#FC4E2A' :
             d > 14   ? '#FD8D3C' :
             d > 10   ? '#FEB24C' :
             d > 6   ? '#FED976' :
                        '#FFEDA0';
    }

    function styleStates(feature) {
      return {
          fillColor: getColor(feature.properties.sub_nat_id),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
      };
    }

    function styleWorld(){
      return {
        fillColor: '#EEEEEE',
        fillOpacity: 1,
        opacity: 0
      }
    }
  
    L.geoJson(world, {style: styleWorld}).addTo(this.map);
    L.geoJson(states, {style: styleStates}).addTo(this.map);
    
  }

  getData() {
    this.http.get('http://localhost:3000/forest')
    .subscribe((res: Response) => this.data = res.json())
  }

}
