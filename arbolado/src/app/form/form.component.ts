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
  data = { opinion: 'as' };

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submit() {
    this.http
      .post(this.url, this.data)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('error');
        }
      );
  }

}
