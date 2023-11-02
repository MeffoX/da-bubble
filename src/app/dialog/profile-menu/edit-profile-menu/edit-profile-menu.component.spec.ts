import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileMenuComponent } from './edit-profile-menu.component';

describe('EditProfileMenuComponent', () => {
  let component: EditProfileMenuComponent;
  let fixture: ComponentFixture<EditProfileMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileMenuComponent]
    });
    fixture = TestBed.createComponent(EditProfileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
