import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { CursoParams } from '../../shared/interfaces/curso.interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  ActionButton,
  ActionColumn,
  TableColumn,
} from 'src/app/custom-components/custom-table/custom-table.component';
import { DialogCursoComponent } from 'src/app/dialogs/dialog-curso/dialog-curso.component';
import { CursoResponse } from 'src/app/shared/interfaces/curso.interfaces';
import { Subscription } from 'rxjs';
import { LoadingControl } from 'src/app/shared/loading/loading.control';
import { CursoService } from 'src/app/services/curso.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Buffer } from 'buffer';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  dataSource: MatTableDataSource<CursoResponse>;

  pageLength = 0;

  proprietary: CursoParams = { page: 0, limit: 10 };

  subscriptions = new Subscription();

  columns: Array<TableColumn> = [
    {
      label: 'Código',
      value: 'codigo',
    },
    {
      label: 'Curso',
      value: 'descricao',
    },
  ];

  columnsActTable: ActionColumn[] = [
    {
      labelColuna: 'Deletar',
      label: 'restore_from_trash',
      action: 'delete',
      color: 'warn',
    },
  ];

  filters: FormGroup = new FormGroup({
    codigo: new FormControl(),
    descricao: new FormControl(),
  });

  constructor(
    private readonly _matDialog: MatDialog,
    private readonly _loadingControl: LoadingControl,
    private readonly _cursoService: CursoService,
    private readonly _alert: AlertsService,
    private readonly _matSnackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.requestData();
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.filters.valueChanges
        .pipe(distinctUntilChanged(), debounceTime(250))
        .subscribe(() => this.requestData()),
    );
  }

  requestData(properties?: CursoParams) {
    this._loadingControl.show();

    properties = Object.assign(this.proprietary, {
      ...properties,
      ...this.filters.getRawValue(),
    });

    this._cursoService.getCursos(properties).subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.cursos);
      this.pageLength = response.count;

      this._loadingControl.hide();
    });
  }

  openDialogCurso(event?: CursoResponse) {
    this._matDialog
      .open(DialogCursoComponent, {
        data: event || null,
        width: '45%',
      })
      .afterClosed()
      .subscribe(() => this.requestData());
  }

  async deleteCurso(event: ActionButton) {
    const codigo = event.value.codigo;

    const result = await this._alert.alert(
      'Atenção',
      'Deseja realmente deletar este curso?',
    );

    if (!result) return;

    this._loadingControl.show();

    this._cursoService.deleteCurso(codigo).subscribe(() => {
      this._matSnackBar.open('Curso deletado com sucesso!', 'Fechar', {
        duration: 3000,
      });

      this.requestData();

      this._loadingControl.hide();
    });
  }

  downloadCursoPdf(properties?: CursoParams) {
    this._loadingControl.show();

    properties = Object.assign(this.proprietary, {
      ...properties,
      ...this.filters.getRawValue(),
    });

    this._cursoService.downloadCursoPdf(properties).subscribe((res: any) => {
      const blob = new Blob([Buffer.from(res.data)], {
        type: 'application/pdf',
      });

      saveAs(blob, `Cursos.pdf`);
      this._loadingControl.hide();
    });
  }
}
