import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcnavComponent } from './offcnav.component';

describe('OffcnavComponent', () => {
  let component: OffcnavComponent;
  let fixture: ComponentFixture<OffcnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffcnavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffcnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
