import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogCursoComponent } from './dialog-curso.component';
import { CustomInputModule } from 'src/app/custom-components/custom-input/custom-input.module';
import { MatButtonModule } from '@angular/material/button';
import { CustomCardModule } from 'src/app/custom-components/custom-card/custom-card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [DialogCursoComponent],
  imports: [
    CommonModule,
    CustomInputModule,
    MatButtonModule,
    MatDialogModule,
    CustomCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
})
export class DialogCursoModule {}
