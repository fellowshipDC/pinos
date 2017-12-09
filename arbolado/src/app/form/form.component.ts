import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.styl']
})
export class FormComponent implements OnInit {

  formSent: any;
  url= 'http://localhost:3000/forest/form';
  data= {opinion: 'as'};

  constructor(private http: Http) { }

  ngOnInit() {
  }

  submit(){
    console.log('submit button works');
    var headrs = new Headers();
    headrs.append('Content-Type', 'application/json');
    headrs.append('Accept', 'application/json');

    this.http.post(this.url, this.data, {headers: headrs})
    .subscribe((res: Response)=> {this.formSent = res.json(); console.log('done');})
  }

}
