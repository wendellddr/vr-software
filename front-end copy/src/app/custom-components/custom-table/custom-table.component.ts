import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

export class TableColumn {
  //Nome da coluna.
  label: string;

  //Propriedade a ser exibida.
  value: string;
}

//Coluna de ações, representadas por um botão com um ícone do Google Fonts que executa um método.
export class ActionColumn {
  labelColuna?: string;

  label?: string;

  action?: any;

  color?: string;

  value?: string;
}

export class ActionButton {
  value: any;

  action: any;
}

export class ActionChangePage {
  page: number;

  limit: number;

  sort_by?: string;

  order_by?: string;
}

@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements OnInit {
  @Input() columnsAction: Array<ActionColumn> = [];

  @Input() columns: Array<TableColumn> = [];

  @Input() dataTable: MatTableDataSource<any> = new MatTableDataSource();

  @Input() pointer = true;

  @Input() pointerIcon = true;

  @Input() showPagination = false;

  @Input() pageLength = 0;

  @Input() pageSizeOptions: number[] = [5, 10, 25, 100, 200];

  @Input() pageSize = 10;

  @Output() actionEvent: EventEmitter<ActionButton> = new EventEmitter();

  @Output()
  actionChangePage: EventEmitter<ActionChangePage> = new EventEmitter();

  @Output() eventClickRow: EventEmitter<any> = new EventEmitter();

  displayedColumns: Array<string> = [];

  data = '';

  page = 0;

  limit = this.pageSize;

  sort_by = '';

  order_by = '';

  options: any;

  element: any;

  subscription: Subscription[] = [];

  constructor() {}

  ngOnInit() {
    this.columns.forEach((coluna: TableColumn) => {
      this.displayedColumns.push(coluna.value);
    });

    this.columnsAction.forEach((coluna: ActionColumn) => {
      this.displayedColumns.push(coluna.action);
    });
  }

  action(action: any, value: any, element: any) {
    value = element;

    this.actionEvent.emit({
      action,
      value,
    });
  }

  changePage(event: any) {
    this.page = event.pageIndex * event.pageSize;
    this.limit = event.pageSize;

    this.actionChangePage.emit({
      sort_by: this.sort_by,
      order_by: this.order_by,
      page: this.page,
      limit: this.limit,
    });
  }

  clickRow(row: any) {
    this.eventClickRow.emit(row);
  }

  value(element: any, coluna: TableColumn) {
    let result = '';

    result = element[coluna.value];

    if (!result) {
      result = ' - ';
    }

    return result;
  }

  getPageData() {
    return this.dataTable?._pageData(
      this.dataTable._orderData(this.dataTable.filteredData),
    );
  }

  ngOnDestroy() {
    this.subscription.map((s) => s.unsubscribe());
  }
}
