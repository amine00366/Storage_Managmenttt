import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisatuerComponent } from './utilisatuer.component';

describe('UtilisatuerComponent', () => {
  let component: UtilisatuerComponent;
  let fixture: ComponentFixture<UtilisatuerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisatuerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilisatuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
