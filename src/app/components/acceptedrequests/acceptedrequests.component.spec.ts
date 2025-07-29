import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedrequestsComponent } from './acceptedrequests.component';

describe('AcceptedrequestsComponent', () => {
  let component: AcceptedrequestsComponent;
  let fixture: ComponentFixture<AcceptedrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptedrequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptedrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
