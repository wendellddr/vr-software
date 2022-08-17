import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCardComponent } from './custom-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CustomCardComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [CustomCardComponent],
})
export class CustomCardModule {}
