import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatSliderModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { MapComponent } from './map/map.component';
import { GraphComponent } from './graph/graph.component';
import { IntroComponent } from './intro/intro.component';
import { InfomexicoComponent } from './infomexico/infomexico.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    MapComponent,
    GraphComponent,
    IntroComponent,
    InfomexicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
