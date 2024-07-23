import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MethodeServiceService } from '../../../methode-service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SharedDataService } from '../../../shared-data.service';

@Component({
  selector: 'ngx-fdd',
  templateUrl: './fdd.component.html',
  styleUrls: ['./fdd.component.css']
})
export class FddComponent implements OnInit {
  methode: any = null;
  introductionContent: string = '';
  advantagesContent: string = ''; // Add this
  isEditingIntroduction: boolean = false;
  isEditingAdvantages: boolean = false; // Add this
  editIntroductionForm: FormGroup;
  editAdvantagesForm: FormGroup; // Add this
  introductionId: number | undefined;
  advantagesId: number | undefined; // Add this

  editorConfig: AngularEditorConfig = {
    // your editor configuration
  };

  constructor(
    private fb: FormBuilder,
    private methodeService: MethodeServiceService,
    private sharedDataService: SharedDataService
  ) {
    this.editIntroductionForm = this.fb.group({
      introduction: ['']
    });
    this.editAdvantagesForm = this.fb.group({
      advantages: ['']
    });
  }

  ngOnInit(): void {
    this.loadMethode();
    this.sharedDataService.currentMethode.subscribe(methode => {
      if (methode) {
        this.introductionContent = methode.introduction;
        this.advantagesContent = methode.advantages; 
      }
    });
  }

  loadMethode(): void {
    this.methodeService.getMethode().subscribe(data => {
      this.methode = data;
      this.introductionId = this.methode.id;
      this.advantagesId = this.methode.id; 
      this.introductionContent = this.methode.introduction;
      this.advantagesContent = this.methode.advantages; 
      this.editIntroductionForm.controls['introduction'].setValue(this.methode.introduction);
      this.editAdvantagesForm.controls['advantages'].setValue(this.methode.advantages);
      this.sharedDataService.updateMethode(this.methode); 
    });
  }

}
