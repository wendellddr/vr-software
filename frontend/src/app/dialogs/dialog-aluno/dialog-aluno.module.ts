import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomCardModule } from 'src/app/custom-components/custom-card/custom-card.module';
import { CustomInputModule } from 'src/app/custom-components/custom-input/custom-input.module';
import { CustomSelectModule } from 'src/app/custom-components/custom-select/custom-select.module';

import { DialogAlunoComponent } from './dialog-aluno.component';

@NgModule({
  declarations: [DialogAlunoComponent],
  imports: [
    CommonModule,
    CustomInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    CustomCardModule,
    MatSnackBarModule,
    CustomSelectModule,
  ],
})
export class DialogAlunoModule {}
