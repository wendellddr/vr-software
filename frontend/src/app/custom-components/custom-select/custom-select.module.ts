import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from './custom-select.component';

@NgModule({
  declarations: [CustomSelectComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatSelectModule],
  exports: [CustomSelectComponent],
})
export class CustomSelectModule {}
