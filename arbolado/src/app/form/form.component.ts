import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl']
})
export class FormComponent implements OnInit {

  formSent: any;
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
    var target = {
      'Sí': (checkedYes.length / this.graphInfo.length),
      'No': (1 - checkedYes.length / this.graphInfo.length)
    }
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

    var sector = {
      'Industrial' : (checkedIndustrial.length / this.graphInfo.length),
      'Agrícola' : (checkedAgricola.length / this.graphInfo.length),
      'Energético' : (checkedEnergetico.length / this.graphInfo.length),
      'Transporte' : (checkedTransporte.length / this.graphInfo.length)
    }


  }

  submit() {
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
  }

}
