import { CdkColumnDef } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CustomInputModule } from '../custom-input/custom-input.module';
import { CustomTableComponent } from './custom-table.component';

@NgModule({
  declarations: [CustomTableComponent],
  exports: [CustomTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    CustomInputModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
  ],
  providers: [CdkColumnDef],
})
export class CustomTableModule {}
