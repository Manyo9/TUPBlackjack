import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarSesionButtonComponent } from './iniciar-sesion-button.component';

describe('IniciarSesionButtonComponent', () => {
  let component: IniciarSesionButtonComponent;
  let fixture: ComponentFixture<IniciarSesionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciarSesionButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciarSesionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
