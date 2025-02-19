import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierbandeComponent } from './modifierbande.component';

describe('ModifierbandeComponent', () => {
  let component: ModifierbandeComponent;
  let fixture: ComponentFixture<ModifierbandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierbandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierbandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
