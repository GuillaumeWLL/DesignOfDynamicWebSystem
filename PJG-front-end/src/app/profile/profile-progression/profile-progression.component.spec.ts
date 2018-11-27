import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProgressionComponent } from './profile-progression.component';

describe('ProfileProgressionComponent', () => {
  let component: ProfileProgressionComponent;
  let fixture: ComponentFixture<ProfileProgressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileProgressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
