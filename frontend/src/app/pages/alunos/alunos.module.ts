import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CustomHeaderModule } from 'src/app/custom-components/custom-header/custom-header.module';
import { CustomTableModule } from 'src/app/custom-components/custom-table/custom-table.module';
import { DialogAlunoModule } from 'src/app/dialogs/dialog-aluno/dialog-aluno.module';

import { CustomInputModule } from '../../custom-components/custom-input/custom-input.module';
import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './alunos.component';

@NgModule({
  declarations: [AlunosComponent],
  imports: [
    CommonModule,
    AlunosRoutingModule,
    CustomHeaderModule,
    CustomInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    DialogAlunoModule,
    MatTableModule,
    CustomTableModule,
  ],
})
export class AlunosModule {}
