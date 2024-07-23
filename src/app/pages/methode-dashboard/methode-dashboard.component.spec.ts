import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodeDashboardComponent } from './methode-dashboard.component';

describe('MethodeDashboardComponent', () => {
  let component: MethodeDashboardComponent;
  let fixture: ComponentFixture<MethodeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MethodeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MethodeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
