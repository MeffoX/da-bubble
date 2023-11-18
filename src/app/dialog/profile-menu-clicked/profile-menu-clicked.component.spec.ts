import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMenuClickedComponent } from './profile-menu-clicked.component';

describe('ProfileMenuClickedComponent', () => {
  let component: ProfileMenuClickedComponent;
  let fixture: ComponentFixture<ProfileMenuClickedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileMenuClickedComponent]
    });
    fixture = TestBed.createComponent(ProfileMenuClickedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
