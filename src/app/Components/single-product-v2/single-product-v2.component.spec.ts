import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductV2Component } from './single-product-v2.component';

describe('SingleProductV2Component', () => {
  let component: SingleProductV2Component;
  let fixture: ComponentFixture<SingleProductV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleProductV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleProductV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
