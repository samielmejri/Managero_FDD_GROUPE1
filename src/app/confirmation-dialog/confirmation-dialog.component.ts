import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-confirmation-dialog',
  template: `
    <div class="confirmation-dialog-overlay">
      <div class="confirmation-dialog-container">
        <h2 mat-dialog-title class="dialog-title">{{ data.title }}</h2>
        <div mat-dialog-content class="dialog-content">{{ data.message }}</div>
        <div mat-dialog-actions class="dialog-actions">
          <button mat-button (click)="onNoClick()">Cancel</button>
          <button mat-button [mat-dialog-close]="true" cdkFocusInitial class="confirm-button">Confirm</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    '.confirmation-dialog-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }',
    '.confirmation-dialog-container { background-color: #fff; padding: 20px; border-radius: 8px; width: 400px; }',
    '.dialog-title { color: #333; }',
    '.dialog-content { color: #555; }',
    '.dialog-actions { justify-content: flex-end; }',
    '.confirm-button { background-color: #FFC107; color: #fff; margin-left: 10px; }',
  ],
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
