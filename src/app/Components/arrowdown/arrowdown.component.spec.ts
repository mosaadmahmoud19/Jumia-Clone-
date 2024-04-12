import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowdownComponent } from './arrowdown.component';

describe('ArrowdownComponent', () => {
  let component: ArrowdownComponent;
  let fixture: ComponentFixture<ArrowdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrowdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
