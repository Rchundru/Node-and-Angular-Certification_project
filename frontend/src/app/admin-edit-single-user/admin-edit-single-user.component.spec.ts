import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditSingleUserComponent } from './admin-edit-single-user.component';

describe('AdminEditSingleUserComponent', () => {
  let component: AdminEditSingleUserComponent;
  let fixture: ComponentFixture<AdminEditSingleUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditSingleUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditSingleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
