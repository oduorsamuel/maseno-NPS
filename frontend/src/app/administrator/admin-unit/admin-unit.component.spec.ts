import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnitComponent } from './admin-unit.component';

describe('AdminUnitComponent', () => {
  let component: AdminUnitComponent;
  let fixture: ComponentFixture<AdminUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
