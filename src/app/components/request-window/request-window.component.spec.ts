import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestWindowComponent } from './request-window.component';

describe('RequestWindowComponent', () => {
  let component: RequestWindowComponent;
  let fixture: ComponentFixture<RequestWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
