import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMeasurementComponent } from './add-new-measurement.component';

describe('AddNewMeasurementComponent', () => {
  let component: AddNewMeasurementComponent;
  let fixture: ComponentFixture<AddNewMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewMeasurementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
