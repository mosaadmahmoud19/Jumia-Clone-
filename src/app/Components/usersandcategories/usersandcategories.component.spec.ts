import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersandcategoriesComponent } from './usersandcategories.component';

describe('UsersandcategoriesComponent', () => {
  let component: UsersandcategoriesComponent;
  let fixture: ComponentFixture<UsersandcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersandcategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersandcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
