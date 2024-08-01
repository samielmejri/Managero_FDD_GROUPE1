import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionafficheComponent } from './questionaffiche.component';

describe('QuestionafficheComponent', () => {
  let component: QuestionafficheComponent;
  let fixture: ComponentFixture<QuestionafficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionafficheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionafficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
