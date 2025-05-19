import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPortComponent } from './add-edit-port.component';

describe('AddEditPortComponent', () => {
  let component: AddEditPortComponent;
  let fixture: ComponentFixture<AddEditPortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
