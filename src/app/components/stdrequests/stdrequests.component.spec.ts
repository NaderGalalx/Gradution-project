import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdrequestsComponent } from './stdrequests.component';

describe('StdrequestsComponent', () => {
  let component: StdrequestsComponent;
  let fixture: ComponentFixture<StdrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StdrequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StdrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
