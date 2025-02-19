import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterBandeComponent } from './ajouter-bande.component';

describe('AjouterBandeComponent', () => {
  let component: AjouterBandeComponent;
  let fixture: ComponentFixture<AjouterBandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterBandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterBandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
