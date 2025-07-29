import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatNewComponent } from './creat-new.component';

describe('CreatNewComponent', () => {
  let component: CreatNewComponent;
  let fixture: ComponentFixture<CreatNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
