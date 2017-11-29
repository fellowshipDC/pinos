import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.styl']
})
export class MapComponent implements OnInit {

  data: any;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get('http://localhost:3000/forest').subscribe((res: Response) => this.data = res.json())
  }

}
