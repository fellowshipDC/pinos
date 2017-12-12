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
  dataCo2: Array<any>;
  dataHa: Array<any>;

  constructor(private http: HttpClient) { }

  d3graph(){
    //svg width and height
    var margin = {top: 50, right: 50, bottom: 50, left: 50};
    var w = 700 - (margin.left + margin.right);
    var h = 500 - (margin.top + margin.bottom);
    var parse = d3.timeParse("%b %Y");

    //graph svg
    var graph = d3.select('#graphid')
      .append('svg')
      .attr('width', w + (margin.left + margin.right))
      .attr('height', h + (margin.top + margin.bottom))
      .attr('id', 'viz')
      .append('g')
        .attr('transform', 'translate('+ margin.left + ',' + margin.top + ')');

    //sort
    var co2 = this.dataCo2.sort((a,b) => d3.ascending(a.year, b.year));
    var ha = this.dataHa.sort((a,b) => d3.ascending(a.year, b.year));

    //scales
    var xScale = d3.scaleLinear().domain([0, 15]).range([0, w]);
    var yScaleCo2 = d3.scaleLinear().domain([70, 0]).range([0, h]);
    var yScaleHa = d3.scaleLinear().domain([300, 140]).range([0, h]);

    var line = d3.line()
      .x(function(d, i) {console.log(i); return xScale(i);})
      .y(function(d) { console.log(d.value); return yScaleCo2(d.value);});

    graph.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisBottom(xScale));

    graph.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScaleCo2));

    graph.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+ w + ", 0)")
      .call(d3.axisRight(yScaleHa));

    var path = graph.append('path')
      .datum(co2)
      .attr('class', 'lineCo2')
      .attr('d', line);

    graph.selectAll('.dot')
      .data(co2)
      .enter().append('circle')
        .attr('class', 'dotCo2')
        .attr('cx', function(d, i){ return xScale(i) })
        .attr('cy', function(d){ return yScaleCo2(d.value) })
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
    this.getData();
  }

  getData() {
    this.http.get('http://localhost:3000/forest/')
      .subscribe(
        res => {
          this.info = res;
          if (this.info !== undefined){
            this.dataCo2 = this.info.data.filter((obj)=>{
              if (obj.indicator_id == 14 && obj.sub_nat_id == undefined && obj.boundary_id ==1 && obj.thresh == 10){
                return true;
              }
              else{
                return false;
              }
            });
            this.dataHa = this.info.data.filter((obj)=>{
              if (obj.indicator_id == 1 && obj.sub_nat_id == undefined && obj.boundary_id ==1 && obj.thresh == 10){
                return true;
              }
              else{
                return false;
              }
            });
            if(this.dataCo2.length > 0 && this.dataHa.length > 0){
              this.d3graph();
            }
          }
        },
        err => {
          console.log('error');
        }
      )
  }
}
