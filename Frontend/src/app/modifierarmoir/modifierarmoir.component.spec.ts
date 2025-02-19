import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierarmoirComponent } from './modifierarmoir.component';

describe('ModifierarmoirComponent', () => {
  let component: ModifierarmoirComponent;
  let fixture: ComponentFixture<ModifierarmoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierarmoirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierarmoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
