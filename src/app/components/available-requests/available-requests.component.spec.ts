import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableRequestsComponent } from './available-requests.component';

describe('AvailableRequestsComponent', () => {
  let component: AvailableRequestsComponent;
  let fixture: ComponentFixture<AvailableRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailableRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
