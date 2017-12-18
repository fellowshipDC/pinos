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
      var margin = {top: 20, right: 50, bottom: 50, left: 50};
      var w = 700 - (margin.left + margin.right);
      var h = 500 - (margin.top + margin.bottom);

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
      var xScale = d3.scaleLinear().domain([(2001), (2016)]).range([0, w]);
      var yScaleCo2 = d3.scaleLinear().domain([70, 20]).range([0, h]);
      var yScaleHa = d3.scaleLinear().domain([350, 100]).range([0, h]);

      var lineCo2 = d3.line()
        .x(function(d, i) { return xScale((d.year));})
        .y(function(d) { return yScaleCo2(d.value);});

      var lineHa = d3.line()
        .x(function(d, i) { return xScale((d.year));})
        .y(function(d) {return yScaleHa(d.value / 1000);});

    //axes
      var xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
      graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

      var yAxisLeft = d3.axisLeft(yScaleCo2).ticks(5).tickSize(-w);
      graph.append("g")
        .attr("class", "y axis")
        .call(yAxisLeft);

      var yAxisRight = d3.axisRight(yScaleHa).ticks(5);
      graph.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate("+ w + ", 0)")
        .call(yAxisRight);

      var pathCo2 = graph.append('path')
        .data([co2])
        .attr('class', 'lineCo2')
        .attr('d', lineCo2);

      var pathHa = graph.append('path')
        .data([ha])
        .attr('class', 'lineHa')
        .attr('d', lineHa);    

    //tooltip
      var div1 = d3.select("div.graph").append("div")
        .attr("class", "tooltipCo2")
        .style("opacity", 0);

      var div2 = d3.select("div.graph").append("div")
        .attr("class", "tooltipHa")
        .style("opacity", 0);

      var decimals = d3.format(',.1f');
    
      graph.selectAll('.dotCo2')
        .data(co2)
        .enter().append('circle')
          .attr('class', 'dotCo2')
          .attr('cx', function(d){ return xScale(d.year) })
          .attr('cy', function(d){ return yScaleCo2(d.value) })
          .attr('r', 5)
          .on('mouseover', function(d){
            div1.transition()
              .duration(200)
              .style('opacity', 0.9)
            div1.html('<b>'+ d.year + '</b><br>' + decimals(d.value) + ' Mt CO2')
              .style("left", (d3.mouse(d3.event.currentTarget)[0]) + 15 + "px")
              .style("top", (d3.mouse(d3.event.currentTarget)[1]) + "px");
          })
          .on("mouseout", function(d) {
            div1.transition()
              .duration(500)
              .style("opacity", 0);
            });

      graph.selectAll('.dotHa')
        .data(ha)
        .enter().append('circle')
          .attr('class', 'dotHa')
          .attr('cx', function(d){ return xScale(d.year) })
          .attr('cy', function(d){ return yScaleHa(d.value / 1000) })
          .attr('r', 5)
          .on('mouseover', function(d){
            div2.transition()
              .duration(200)
              .style('opacity', 0.9)
            div2.html('<b>'+ d.year + '</b><br>' + decimals(d.value/ 1000) + 'k Ha')
              .style("left", (d3.mouse(d3.event.currentTarget)[0]) + 15 + "px")
              .style("top", (d3.mouse(d3.event.currentTarget)[1]) + "px");
          })
          .on("mouseout", function(d) {
            div2.transition()
              .duration(500)
              .style("opacity", 0);
            });
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
