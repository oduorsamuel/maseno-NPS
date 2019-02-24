import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProgramComponent } from './admin-program.component';

describe('AdminProgramComponent', () => {
  let component: AdminProgramComponent;
  let fixture: ComponentFixture<AdminProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
