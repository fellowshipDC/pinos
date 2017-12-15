import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl']
})
export class FormComponent implements OnInit {

  formSent = false;
  url = 'http://localhost:3000/forest/form';
  data = {
    target: {
      yes: {
        value: 'si',
        checked: true
      },
      no: {
        value: 'no',
        checked: false
      }
    },
    sector: {
      industrial: {
        value: 'industrial',
        checked: true
      },
      agricola: {
        value: 'agricola',
        checked: false
      },
      energetico: {
        value: 'energetico',
        checked: false
      },
      transporte: {
        value: 'transporte',
        checked: false
      }
    }
  };
  info: any;
  graphInfo: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  checkedRadio1(value){
    value.yes.checked = !value.yes.checked;
    value.no.checked = !value.no.checked;
  }

  checkedRadio2(value){
    const keys = Object.keys(this.data.sector);
    for (var i = 0; i < keys.length; i++){
      if (value !== keys[i] && this.data.sector[keys[i]].checked === true){
        this.data.sector[keys[i]].checked = false;
      }
    }
    value.checked = !value.checked;
  }

  graphTarget(){
    var checkedYes = this.graphInfo.filter((el)=>{
      if (el.target.yes.checked){
        return true;
      }
    })
    var target = [
      { 'option' : 'Sí',
      'value': (checkedYes.length / this.graphInfo.length)
      },
      { 'option' : 'No',
      'value': (1 - (checkedYes.length / this.graphInfo.length))}
    ]

    var format = d3.format(".0%");

    var margin = {top: 15, right: 25 , bottom: 15, left: 35};
    var width = 200 - (margin.left + margin.right),
      height = 150 - (margin.top + margin.bottom);
      
    var svg = d3.select('#targetgraph').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleBand().range([height, 0]);

    var yAxis = d3.axisLeft(y).tickSize([0]);

    x.domain([0, 1]);
    y.domain(target.map((d)=>{ return d.option; })).padding(0.4);

    svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    var barHeight = 30;

    var bar = svg.selectAll('.bar')
        .data(target)
        .enter().append('g')
        .attr('class', 'bar')
          .append('rect')
            .attr('x', 0)
            .attr('height', barHeight)
            .attr('y', function(d){ return y(d.option)})
            .attr('width', function(d){ return x(d.value)})
    
    var text = svg.selectAll('.bar');

    text.append('text')
      .attr('class', 'label')
      .attr('y', function(d){ return y(d.option) + barHeight / 1.8})
      .attr('x', function(d){ return x(d.value) + 4} )
      .attr("dy", ".35em")
      .text(function(d){
        return (format(d.value));
      });
  }

  graphSector(){
    var checkedIndustrial = this.graphInfo.filter((el)=>{
      if (el.sector.industrial.checked){
        return true;
      }
    }),
    checkedAgricola = this.graphInfo.filter((el)=>{
      if (el.sector.agricola.checked){
        return true;
      }
    }),
    checkedEnergetico = this.graphInfo.filter((el)=>{
      if (el.sector.energetico.checked){
        return true;
      }
    }),
    checkedTransporte = this.graphInfo.filter((el)=>{
      if (el.sector.transporte.checked){
        return true;
      }
    });

    var sector = [
      { 
        option: 'Industrial',
        value: (checkedIndustrial.length / this.graphInfo.length)
      },
      { 
        option: 'Agrícola',
        value: (checkedAgricola.length / this.graphInfo.length)
      },
      {
        option: 'Energético',
        value: (checkedEnergetico.length / this.graphInfo.length)
      },
      {
        option: 'Transporte',
        value: (checkedTransporte.length / this.graphInfo.length)
      }
    ]

    var format = d3.format(".0%");
    
    var margin = {top: 15, right: 25 , bottom: 15, left: 80};
    var width = 200 - (margin.left + margin.right),
      height = 300 - (margin.top + margin.bottom);
          
    var svg = d3.select('#sectorgraph').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleBand().range([height, 0]);

    var yAxis = d3.axisLeft(y).tickSize([0]);    

    x.domain([0, 1]);
    y.domain(sector.map((d)=>{ return d.option; })).padding(0.4);

    svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    var barHeight = 30;

    var bar = svg.selectAll('.bar')
      .data(sector)
      .enter().append('g')
      .attr('class', 'bar')
        .append('rect')
          .attr('x', 0)
          .attr('height', barHeight)
          .attr('y', function(d){ return y(d.option)})
          .attr('width', function(d){ return x(d.value)});

    var text = svg.selectAll('.bar');
    text.append('text')
      .attr('class', 'label')
      .attr('y', function(d){ return y(d.option) + barHeight / 1.8})
      .attr('x', function(d){ return x(d.value) + 4} )
      .attr("dy", ".35em")
      .text(function(d){
        return (format(d.value));
      });    
  }

  submit() {
    if (!this.formSent){
      document.getElementById('discover1').style.display = 'inline';
      document.getElementById('discover2').style.display = 'inline';
      document.getElementById('form1').style.display = 'none';
      document.getElementById('form2').style.display = 'none';

      this.http
        .post(this.url, this.data)
        .subscribe(
          res => {
            this.info = res;
            if (this.info !== undefined || this.info !== null){
              this.graphInfo = this.info.response;
              this.graphTarget();
              this.graphSector();
            };
          },
          err => {
            console.log('error');
          }
        );
      this.formSent = true;
    }
    else{}
  }

}
