import { Component, OnInit } from '@angular/core';
import { MethodeServiceService } from '../../app/methode-service.service';
import { SharedDataService } from '../../app/shared-data.service';
import { ChangeDetectorRef } from '@angular/core';

interface Methode {
  introduction?: string;
  what?: string;
  how?: string;
  whatif?: string;
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
  temporaryWhat: string = '';
  temporaryHow: string = '';
  temporaryWhatIf: string = '';
  temporaryConclusion: string = '';
  isEditingIntroduction: boolean = false;
  isEditingAdvantages: boolean = false;
  isEditingWhat: boolean = false;
  isEditingHow: boolean = false;
  isEditingWhatIf: boolean = false;
  isEditingConclusion: boolean = false;

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
        this.temporaryWhat = this.methode.what || '';
        this.temporaryHow = this.methode.how || '';
        this.temporaryWhatIf = this.methode.whatif || '';
        this.temporaryConclusion = this.methode.conclusion || '';
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
      this.temporaryWhat = this.methode.what || '';
      this.temporaryHow = this.methode.how || '';
      this.temporaryWhatIf = this.methode.whatif || '';
      this.temporaryConclusion = this.methode.conclusion || '';
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
      console.log('Introduction saved successfully', response);
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

  startEditWhat() {
    this.isEditingWhat = true;
  }

  cancelEditWhat() {
    this.isEditingWhat = false;
    this.temporaryWhat = this.methode.what || '';
  }

  confirmEditWhat() {
    const confirmSave = confirm('Are you sure you want to edit the what section?');
    if (confirmSave) {
      this.saveWhat();
    }
  }

  saveWhat() {
    this.methode.what = this.temporaryWhat;
    this.methodeService.saveMethode(this.methode).subscribe((response) => {
      console.log('What section saved successfully', response);
      this.methode = response;
      this.sharedDataService.updateMethode(this.methode); // Update shared service
      this.isEditingWhat = false;
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  startEditHow() {
    this.isEditingHow = true;
  }

  cancelEditHow() {
    this.isEditingHow = false;
    this.temporaryHow = this.methode.how || '';
  }

  confirmEditHow() {
    const confirmSave = confirm('Are you sure you want to edit the how section?');
    if (confirmSave) {
      this.saveHow();
    }
  }

  saveHow() {
    this.methode.how = this.temporaryHow;
    this.methodeService.saveMethode(this.methode).subscribe((response) => {
      console.log('How section saved successfully', response);
      this.methode = response;
      this.sharedDataService.updateMethode(this.methode); // Update shared service
      this.isEditingHow = false;
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  startEditWhatIf() {
    this.isEditingWhatIf = true;
  }

  cancelEditWhatIf() {
    this.isEditingWhatIf = false;
    this.temporaryWhatIf = this.methode.whatif || '';
  }

  confirmEditWhatIf() {
    const confirmSave = confirm('Are you sure you want to edit the what if section?');
    if (confirmSave) {
      this.saveWhatIf();
    }
  }

  saveWhatIf() {
    this.methode.whatif = this.temporaryWhatIf;
    this.methodeService.saveMethode(this.methode).subscribe((response) => {
      console.log('What If section saved successfully', response);
      this.methode = response;
      this.sharedDataService.updateMethode(this.methode); // Update shared service
      this.isEditingWhatIf = false;
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  startEditConclusion() {
    this.isEditingConclusion = true;
  }

  cancelEditConclusion() {
    this.isEditingConclusion = false;
    this.temporaryConclusion = this.methode.conclusion || '';
  }

  confirmEditConclusion() {
    const confirmSave = confirm('Are you sure you want to edit the conclusion?');
    if (confirmSave) {
      this.saveConclusion();
    }
  }

  saveConclusion() {
    this.methode.conclusion = this.temporaryConclusion;
    this.methodeService.saveMethode(this.methode).subscribe((response) => {
      console.log('Conclusion saved successfully', response);
      this.methode = response;
      this.sharedDataService.updateMethode(this.methode); // Update shared service
      this.isEditingConclusion = false;
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  deleteIntroduction() {
    const confirmDelete = confirm('Are you sure you want to delete the introduction?');
    if (confirmDelete) {
      this.methode.introduction = '';
      this.methodeService.saveMethode(this.methode).subscribe((response) => {
        console.log('Introduction deleted successfully', response);
        this.methode = response;
        this.sharedDataService.updateMethode(this.methode); // Update shared service
        this.cdr.detectChanges(); // Manually trigger change detection
      });
    }
  }

  deleteAdvantages() {
    const confirmDelete = confirm('Are you sure you want to delete the advantages?');
    if (confirmDelete) {
      this.methode.advantages = '';
      this.methodeService.saveMethode(this.methode).subscribe((response) => {
        console.log('Advantages deleted successfully', response);
        this.methode = response;
        this.sharedDataService.updateMethode(this.methode); // Update shared service
        this.cdr.detectChanges(); // Manually trigger change detection
      });
    }
  }

  deleteHow() {
    const confirmDelete = confirm('Are you sure you want to delete the how section?');
    if (confirmDelete) {
      this.methode.how = '';
      this.methodeService.saveMethode(this.methode).subscribe((response) => {
        console.log('How section deleted successfully', response);
        this.methode = response;
        this.sharedDataService.updateMethode(this.methode); // Update shared service
        this.cdr.detectChanges(); // Manually trigger change detection
      });
    }
  }

  deleteWhatIf() {
    const confirmDelete = confirm('Are you sure you want to delete the what if section?');
    if (confirmDelete) {
      this.methode.whatif = '';
      this.methodeService.saveMethode(this.methode).subscribe((response) => {
        console.log('What If section deleted successfully', response);
        this.methode = response;
        this.sharedDataService.updateMethode(this.methode); // Update shared service
        this.cdr.detectChanges(); // Manually trigger change detection
      });
    }
  }

  deleteConclusion() {
    const confirmDelete = confirm('Are you sure you want to delete the conclusion?');
    if (confirmDelete) {
      this.methode.conclusion = '';
      this.methodeService.saveMethode(this.methode).subscribe((response) => {
        console.log('Conclusion deleted successfully', response);
        this.methode = response;
        this.sharedDataService.updateMethode(this.methode); // Update shared service
        this.cdr.detectChanges(); // Manually trigger change detection
      });
    }
  }
  deleteWhat() {
    const confirmDelete = confirm('Are you sure you want to delete the What section?');
    if (confirmDelete) {
      this.methode.what = ''; // Clear the What section content
      this.methodeService.saveMethode(this.methode).subscribe((response) => {
        console.log('What section deleted successfully', response);
        this.methode = response;
        this.sharedDataService.updateMethode(this.methode); // Update shared service
        this.cdr.detectChanges(); // Manually trigger change detection
      });
    }
  }
  
}
