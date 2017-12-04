import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.styl']
})
export class GraphComponent implements OnInit {
  
  data: any;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  getData() {
    this.http.get('http://localhost:3000/forest').subscribe((res: Response) => this.data = res.json())
  }

}
