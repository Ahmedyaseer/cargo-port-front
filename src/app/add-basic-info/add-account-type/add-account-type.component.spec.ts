import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountTypeComponent } from './add-account-type.component';

describe('AddAccountTypeComponent', () => {
  let component: AddAccountTypeComponent;
  let fixture: ComponentFixture<AddAccountTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAccountTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
