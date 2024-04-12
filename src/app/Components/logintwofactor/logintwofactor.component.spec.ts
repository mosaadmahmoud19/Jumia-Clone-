import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintwofactorComponent } from './logintwofactor.component';

describe('LogintwofactorComponent', () => {
  let component: LogintwofactorComponent;
  let fixture: ComponentFixture<LogintwofactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogintwofactorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogintwofactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
