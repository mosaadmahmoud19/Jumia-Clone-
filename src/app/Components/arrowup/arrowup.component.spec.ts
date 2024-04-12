import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowupComponent } from './arrowup.component';

describe('ArrowupComponent', () => {
  let component: ArrowupComponent;
  let fixture: ComponentFixture<ArrowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
