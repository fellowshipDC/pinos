import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfomexicoComponent } from './infomexico.component';

describe('InfomexicoComponent', () => {
  let component: InfomexicoComponent;
  let fixture: ComponentFixture<InfomexicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfomexicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfomexicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
