import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMenuCenterComponent } from './profile-menu-center.component';

describe('ProfileMenuCenterComponent', () => {
  let component: ProfileMenuCenterComponent;
  let fixture: ComponentFixture<ProfileMenuCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileMenuCenterComponent]
    });
    fixture = TestBed.createComponent(ProfileMenuCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
