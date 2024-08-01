import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizafficheComponent } from './quizaffiche.component';

describe('QuizafficheComponent', () => {
  let component: QuizafficheComponent;
  let fixture: ComponentFixture<QuizafficheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizafficheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizafficheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
