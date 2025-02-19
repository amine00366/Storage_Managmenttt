import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterArmoireComponent } from './ajouter-armoire.component';

describe('AjouterArmoireComponent', () => {
  let component: AjouterArmoireComponent;
  let fixture: ComponentFixture<AjouterArmoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterArmoireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterArmoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
