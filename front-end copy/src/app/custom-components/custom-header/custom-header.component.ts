import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
})
export class CustomHeaderComponent implements OnInit {
  @Input() title: string;

  @Input() subtitle: string;

  @Input() labelButton: string;

  @Input() downloadPdf: boolean;

  @Output() clickButton: EventEmitter<any> = new EventEmitter();

  @Output() clickDownloadPdf: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
