import { Component, OnInit } from '@angular/core';
import { MethodeServiceService } from '../../app/methode-service.service';
import { SharedDataService } from '../../app/shared-data.service';
import { ChangeDetectorRef } from '@angular/core';

interface Methode {
  introduction?: string;
  what?: string;
  how?: string;
  what_if?: string;
  conclusion?: string;
  advantages?: string;
}

@Component({
  selector: 'ngx-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  methode: Methode = {};
  temporaryIntroduction: string = '';
  temporaryAdvantages: string = '';
  isEditingIntroduction: boolean = false;
  isEditingAdvantages: boolean = false;

  constructor(
    private methodeService: MethodeServiceService,
    private sharedDataService: SharedDataService,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit() {
    this.sharedDataService.currentMethode.subscribe(methode => {
      if (methode) {
        this.methode = methode;
        this.temporaryIntroduction = this.methode.introduction || '';
        this.temporaryAdvantages = this.methode.advantages || '';
      } else {
        this.loadMethode();
      }
    });
  }

  loadMethode(): void {
    this.methodeService.getMethodes().subscribe(data => {
      this.methode = data[0] || {};
      this.temporaryIntroduction = this.methode.introduction || '';
      this.temporaryAdvantages = this.methode.advantages || '';
      this.sharedDataService.updateMethode(this.methode); // Ensure shared service is updated
    });
  }

  startEditIntroduction() {
    this.isEditingIntroduction = true;
  }

  cancelEditIntroduction() {
    this.isEditingIntroduction = false;
    this.temporaryIntroduction = this.methode.introduction || '';
  }

  confirmEditIntroduction() {
    const confirmSave = confirm('Are you sure you want to edit the introduction?');
    if (confirmSave) {
      this.saveIntroduction();
    }
  }

  saveIntroduction() {
    this.methode.introduction = this.temporaryIntroduction;
    this.methodeService.saveMethode(this.methode).subscribe((response) => {
      console.log('Method saved successfully', response);
      this.methode = response;
      this.sharedDataService.updateMethode(this.methode); // Update shared service
      this.isEditingIntroduction = false;
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  startEditAdvantages() {
    this.isEditingAdvantages = true;
  }

  cancelEditAdvantages() {
    this.isEditingAdvantages = false;
    this.temporaryAdvantages = this.methode.advantages || '';
  }

  confirmEditAdvantages() {
    const confirmSave = confirm('Are you sure you want to edit the advantages?');
    if (confirmSave) {
      this.saveAdvantages();
    }
  }

  saveAdvantages() {
    this.methode.advantages = this.temporaryAdvantages;
    this.methodeService.saveMethode(this.methode).subscribe((response) => {
      console.log('Advantages saved successfully', response);
      this.methode = response;
      this.sharedDataService.updateMethode(this.methode); // Update shared service
      this.isEditingAdvantages = false;
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }
}
