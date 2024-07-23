import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { NbStepperModule } from '@nebular/theme';
import { methodePayload } from './methode.payload';
import { MethodeServiceService } from '../../methode-service.service';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'ngx-methode-dashboard',
  templateUrl: './methode-dashboard.component.html',
  styleUrls: ['./methode-dashboard.component.scss'],
  standalone: true,
  imports: [AngularEditorModule , NbStepperModule, ReactiveFormsModule]  // Ensure this is an array
})
export class MethodeDashboardComponent implements OnInit {
 editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      }
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  createMethodeForm : FormGroup;
  methodePayload : methodePayload;
  methode : any;
constructor(private router : Router,private methodeService : MethodeServiceService ){
this.createMethodeForm = new FormGroup({
  introduction : new FormControl('',Validators.required),
  why : new FormControl('',Validators.required),
    what : new FormControl('',Validators.required),
    how : new FormControl('',Validators.required),
    what_if: new FormControl('',Validators.required)
})
this.methodePayload = {
  introduction: '',
  why: '',
  what: '',
  how:'',
  what_if: ''
};
}
ngOnInit() {
  this.methodeService.getMethodes()
    .pipe(
      map((data: any) => data[0]), // Extract the first method from the array
      first() // Ensure we only take the first emitted value
    )
    .subscribe((firstMethode: any) => {
      this.methode = firstMethode;
    });
}
createMethode() {
  

    const introductionControl = this.createMethodeForm.get('introduction');
    const whyControl = this.createMethodeForm.get('why');
    const whatControl = this.createMethodeForm.get('what');
    const howControl = this.createMethodeForm.get('how');
    const what_ifControl = this.createMethodeForm.get('what_if');
    console.log(introductionControl.value)

      this.methodePayload.introduction = introductionControl.value || '';
      this.methodePayload.why = whyControl.value || '';
      this.methodePayload.what = whatControl.value || '';
      this.methodePayload.how = howControl.value || '';
      this.methodePayload.what_if = what_ifControl.value || '';

      this.methodeService.createMethode(this.methodePayload).subscribe(
        data => {
          if (data === null) {
console.log("data is null error")
          } else {
            this.router.navigateByUrl('/pages/fdd');
          }
        },
        
        error => {
          console.log(error);
          if (error.error === null) {
console.log("Error 555: Invalid content");
          }
          throwError(error);
          console.error('Error creating methode:', error);
        }
      );
    
  
}



}
