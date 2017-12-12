import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
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
          console.log(res, 'ok');
        },
        err => {
          console.log('error');
        }
      );
  }

}
