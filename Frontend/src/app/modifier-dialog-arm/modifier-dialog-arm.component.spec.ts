import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDialogARMComponent } from './modifier-dialog-arm.component';

describe('ModifierDialogARMComponent', () => {
  let component: ModifierDialogARMComponent;
  let fixture: ComponentFixture<ModifierDialogARMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierDialogARMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierDialogARMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
