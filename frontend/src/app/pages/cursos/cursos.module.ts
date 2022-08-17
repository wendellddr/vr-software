import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { CustomHeaderModule } from 'src/app/custom-components/custom-header/custom-header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomInputModule } from 'src/app/custom-components/custom-input/custom-input.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogCursoModule } from 'src/app/dialogs/dialog-curso/dialog-curso.module';
import { CustomTableModule } from 'src/app/custom-components/custom-table/custom-table.module';

@NgModule({
  declarations: [CursosComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    CustomHeaderModule,
    CustomInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    DialogCursoModule,
    CustomTableModule,
  ],
})
export class CursosModule {}
