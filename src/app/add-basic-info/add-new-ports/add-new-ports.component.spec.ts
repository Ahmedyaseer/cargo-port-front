import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPortsComponent } from './add-new-ports.component';

describe('AddNewPortsComponent', () => {
  let component: AddNewPortsComponent;
  let fixture: ComponentFixture<AddNewPortsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewPortsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewPortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
