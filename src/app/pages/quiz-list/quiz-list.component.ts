import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizzService } from '../../service/quizz-service/quizz.service';
import { QuizPlay } from './create-quiz.payload';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


//@Component({
//  selector: 'app-quiz-list',
//  templateUrl: './quiz-list.component.html',
//  styleUrls: ['./quiz-list.component.css'],
//})
//export class QuizListComponent  {
//}


