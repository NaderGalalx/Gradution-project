import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedrequestsComponent } from './rejectedrequests.component';

describe('RejectedrequestsComponent', () => {
  let component: RejectedrequestsComponent;
  let fixture: ComponentFixture<RejectedrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectedrequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejectedrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
