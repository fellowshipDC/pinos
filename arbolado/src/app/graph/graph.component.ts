import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.styl']
})
export class GraphComponent implements OnInit {

  info: any;
  data = [
    {
      "indicator_id": 14,
      "cartodb_id": 940251,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2001,
      "value": 36.76790697,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940257,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2002,
      "value": 36.34774944,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940263,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2003,
      "value": 33.60308211,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940269,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2004,
      "value": 37.96013524,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940275,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2005,
      "value": 46.85256588,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940281,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2006,
      "value": 39.76199641,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940287,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2007,
      "value": 50.70297395,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940293,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2008,
      "value": 42.58655714,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940299,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2009,
      "value": 62.88570811,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940305,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2010,
      "value": 39.84923655,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940311,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2011,
      "value": 43.49183047,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940317,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2012,
      "value": 41.02147757,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940323,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2013,
      "value": 50.93828439,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940329,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2014,
      "value": 39.71296392,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940335,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2015,
      "value": 45.97435274,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    },
    {
      "indicator_id": 14,
      "cartodb_id": 940341,
      "iso": "MEX",
      "sub_nat_id": "",
      "boundary": "admin",
      "boundary_id": 1,
      "thresh": 10,
      "country": "Mexico",
      "year": 2016,
      "value": 65.00171987,
      "province": "",
      "boundary_name": "administrative boundary",
      "indicator_name": "AGC loss WH in MtC02",
      "units": "MtC02"
    }
  ]
  constructor(private http: HttpClient) { }

  d3graph(){
    //svg width and height
    var margin = {top: 50, right: 50, bottom: 50, left: 50};
    var w = 700 - (margin.left + margin.right);
    var h = 500 - (margin.top + margin.bottom);
    var parse = d3.timeParse("%b %Y");

    var graph = d3.select('#graphid')
      .append('svg')
      .attr('width', w + (margin.left + margin.right))
      .attr('height', h + (margin.top + margin.bottom))
      .attr('id', 'viz')
      .append('g')
        .attr('transform', 'translate('+ margin.left + ',' + margin.top + ')');

    var data = this.data.sort((a,b) => d3.ascending(a.year, b.year));
    var xScale = d3.scaleLinear().domain([0, 15]).range([0, w])
    var yScale = d3.scaleLinear().domain([70, 0]).range([0, h])

    var line = d3.line()
      .x(function(d, i) {console.log(i); return xScale(i);})
      .y(function(d) { console.log(d.value); return yScale(d.value);});

    graph.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisBottom(xScale));

    graph.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale));

    var path = graph.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);

    graph.selectAll('.dot')
      .data(data)
      .enter().append('circle')
        .attr('class', 'dot')
        .attr('cx', function(d, i){ return xScale(i) })
        .attr('cy', function(d){ return yScale(d.value) })
        .attr('r', 5);

    var curtain = graph.append('rect')
      .attr('x', -1 * (w  + margin.left))
      .attr('y', -1 * h)
      .attr('height', h)
      .attr('width', w + margin.left)
      .attr('class', 'curtain')
      .attr('transform', 'rotate(180)')
      .style('fill', '#ffffff');

    var t = graph.transition()
      .delay(750)
      .duration(6000)
      .ease(d3.easeLinear);

    t.select('rect.curtain')
      .attr('width', 0);
    t.select('line.guide')
      .attr('transform', 'translate(' + w + ', 0)')
  }

  ngOnInit() {
    //this.d3graph();
    this.getData();
  }

  getData() {
    this.http.get('http://localhost:3000/forest/')
      .subscribe(
        res => {
          console.log('requested');
          this.info = res.data.filter((obj)=>{
            if (obj.indicator_id == 14 && obj.sub_nat_id == undefined && obj.boundary_id ==1 && obj.thresh == 10){
              return true;
            }
            else{
              return false;
            }
          });
        },
        err => {
          console.log('error');
        }
      )
  }
}
