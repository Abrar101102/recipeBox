import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import User from '../../types/users';
// import { ngFor } from '@angular/common';

@Component({
  selector: 'app-dialog',
  imports: [MatSelectModule, MatFormFieldModule,
    MatInputModule,FormsModule,CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  searchQuery: string = '';
  selectedOption: string | null = null;
  filterBy: string='';

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  applyFilter() {
    // Pass data back to the parent component
    this.dialogRef.close({ searchQuery: this.searchQuery, selectedOption: this.selectedOption });
  }
}
