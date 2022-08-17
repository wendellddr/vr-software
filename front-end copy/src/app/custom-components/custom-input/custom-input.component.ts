import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {
  @Input() control: FormControl;

  @Input() type: string;

  @Input() placeholder: string;

  @Input() readonly = false;

  constructor() {}

  ngOnInit() {}
}
