import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarAccountComponent } from './declar-account.component';

describe('DeclarAccountComponent', () => {
  let component: DeclarAccountComponent;
  let fixture: ComponentFixture<DeclarAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclarAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
