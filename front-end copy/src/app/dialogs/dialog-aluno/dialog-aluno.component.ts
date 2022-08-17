import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OptionsSelect } from 'src/app/custom-components/custom-select/custom-select.component';
import { AlunoService } from 'src/app/services/aluno.service';
import { CursoService } from 'src/app/services/curso.service';
import { AlunoResponse } from 'src/app/shared/interfaces/aluno.interfaces';
import { LoadingControl } from 'src/app/shared/loading/loading.control';
import { clearHttpParams } from 'src/app/shared/utils';

@Component({
  selector: 'app-dialog-aluno',
  templateUrl: './dialog-aluno.component.html',
  styleUrls: ['./dialog-aluno.component.scss'],
})
export class DialogAlunoComponent implements OnInit {
  edit = false;

  cursosSelect: OptionsSelect[] = [];

  form: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    cursos_codigo: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly _loadingControl: LoadingControl,
    private readonly _matSnackBar: MatSnackBar,
    private readonly _matDialogRef: MatDialogRef<DialogAlunoComponent>,
    private readonly _alunoService: AlunoService,
    private readonly _cursosService: CursoService,

    @Inject(MAT_DIALOG_DATA)
    public data: AlunoResponse,
  ) {}

  ngOnInit() {
    this.requestCursos();

    if (this.data) {
      this.edit = true;

      this.loadData(this.data.aluno_codigo);
    }
  }

  saveOrEditAluno(edit: boolean) {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this._loadingControl.show();

    if (this.form.get('cursos_codigo')?.value[0] === 0) {
      this.form.get('cursos_codigo')?.value.shift();
    }

    if (edit) {
      this._alunoService
        .updateAluno(
          this.data.aluno_codigo,
          clearHttpParams({
            ...this.form.getRawValue(),
            cursos_codigo: this.form.get('cursos_codigo')?.value,
          }),
        )
        .subscribe(() => {
          this._matSnackBar.open('Aluno alterado com sucesso!', 'Fechar', {
            duration: 3000,
          });

          this._matDialogRef.close();
          this._loadingControl.hide();
        });
    } else {
      this._alunoService
        .createAluno({
          ...this.form.getRawValue(),
          cursos_codigo: this.form.get('cursos_codigo')?.value,
        })
        .subscribe(() => {
          this._matSnackBar.open('Aluno criado com sucesso!', 'Fechar', {
            duration: 3000,
          });

          this._matDialogRef.close();
          this._loadingControl.hide();
        });
    }
  }

  loadData(id: string) {
    this._loadingControl.show();

    this._alunoService.getAlunoById(id).subscribe((response) => {
      this.form.patchValue(response.aluno);
      this.form
        .get('cursos_codigo')
        ?.setValue(response.cursosAluno.map((res) => res.codigo_curso.codigo));
      this._loadingControl.hide();
    });
  }

  requestCursos() {
    this._cursosService.getCursos().subscribe((cursos) => {
      this.cursosSelect = [];

      cursos.cursos.map((value) => {
        this.cursosSelect.push({
          label: value.descricao,
          value: value.codigo,
        });
      });
    });
  }
}
