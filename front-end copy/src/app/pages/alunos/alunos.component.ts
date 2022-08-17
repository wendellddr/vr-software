import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DialogAlunoComponent } from 'src/app/dialogs/dialog-aluno/dialog-aluno.component';
import {
  AlunoResponse,
  AlunosParams,
} from 'src/app/shared/interfaces/aluno.interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LoadingControl } from 'src/app/shared/loading/loading.control';
import { AlunoService } from 'src/app/services/aluno.service';
import {
  ActionButton,
  ActionColumn,
  TableColumn,
} from 'src/app/custom-components/custom-table/custom-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsService } from 'src/app/services/alerts.service';
import { Buffer } from 'buffer';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss'],
})
export class AlunosComponent implements OnInit {
  dataSource: MatTableDataSource<AlunoResponse>;

  pageLength = 0;

  proprietary: AlunosParams = { page: 0, limit: 10 };

  subscriptions = new Subscription();

  columns: Array<TableColumn> = [
    {
      label: 'Código',
      value: 'aluno_codigo',
    },
    {
      label: 'Nome',
      value: 'aluno_nome',
    },
    {
      label: 'Cursos',
      value: 'curso_descricao',
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
    codigo: new FormControl(''),
    nome: new FormControl(''),
    curso_descricao: new FormControl(''),
  });

  constructor(
    private readonly _matDialog: MatDialog,
    private readonly _loadingControl: LoadingControl,
    private readonly _alunoService: AlunoService,
    private readonly _matSnackBar: MatSnackBar,
    private readonly _alert: AlertsService,
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

  requestData(properties?: AlunosParams) {
    this._loadingControl.show();

    properties = Object.assign(this.proprietary, {
      ...properties,
      ...this.filters.getRawValue(),
    });

    this._alunoService.getAlunos(properties).subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.cursosAluno);
      this.pageLength = response.count;

      this._loadingControl.hide();
    });
  }

  openDialogAluno(event?: AlunoResponse) {
    this._matDialog
      .open(DialogAlunoComponent, {
        data: event || null,
        width: '75%',
      })
      .afterClosed()
      .subscribe(() => this.requestData());
  }

  async deleteAluno(event: ActionButton) {
    const codigo = event.value.aluno_codigo;

    const result = await this._alert.alert(
      'Atenção',
      'Deseja realmente deletar este aluno?',
    );

    if (!result) return;

    this._loadingControl.show();

    this._alunoService.deleteAluno(codigo).subscribe(() => {
      this._matSnackBar.open('Aluno deletado com sucesso!', 'Fechar', {
        duration: 3000,
      });

      this.requestData();

      this._loadingControl.hide();
    });
  }

  downloadAlunoPdf(properties?: AlunosParams) {
    this._loadingControl.show();

    properties = Object.assign(this.proprietary, {
      ...properties,
      ...this.filters.getRawValue(),
    });

    this._alunoService.downloadAlunoPdf(properties).subscribe((res: any) => {
      const blob = new Blob([Buffer.from(res.data)], {
        type: 'application/pdf',
      });

      saveAs(blob, `Alunos.pdf`);
      this._loadingControl.hide();
    });
  }
}
