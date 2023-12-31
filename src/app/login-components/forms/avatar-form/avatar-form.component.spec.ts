import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarFormComponent } from './avatar-form.component';

describe('AvatarFormComponent', () => {
  let component: AvatarFormComponent;
  let fixture: ComponentFixture<AvatarFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarFormComponent]
    });
    fixture = TestBed.createComponent(AvatarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
