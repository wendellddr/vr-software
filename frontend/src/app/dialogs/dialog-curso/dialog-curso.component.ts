import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from 'src/app/services/curso.service';
import { CursoResponse } from 'src/app/shared/interfaces/curso.interfaces';
import { LoadingControl } from 'src/app/shared/loading/loading.control';
import { clearHttpParams } from 'src/app/shared/utils';

@Component({
  selector: 'app-dialog-curso',
  templateUrl: './dialog-curso.component.html',
  styleUrls: ['./dialog-curso.component.scss'],
})
export class DialogCursoComponent implements OnInit {
  textAreaForm: FormGroup;

  edit = false;

  form: FormGroup = new FormGroup({
    descricao: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private readonly _matSnackBar: MatSnackBar,
    private readonly _loadingControl: LoadingControl,
    private readonly _matDialogRef: MatDialogRef<DialogCursoComponent>,
    private readonly _cursoService: CursoService,
    @Inject(MAT_DIALOG_DATA)
    public data: CursoResponse,
  ) {
    this.textAreaForm = fb.group({
      ementa: '',
    });
  }

  ngOnInit() {
    if (this.data) {
      this.edit = true;

      this.loadData(this.data.codigo);
    }
  }

  saveOrEditCurso(edit?: boolean) {
    const { ementa } = this.textAreaForm.value;

    if (!this.form.valid) {
      this.form.markAllAsTouched();

      return;
    }

    if (!ementa) {
      this._matSnackBar.open('Este campo Ementa é obrigatório', 'Fechar', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 3000,
      });

      return;
    }

    this._loadingControl.show();

    if (edit) {
      this._cursoService
        .updateCurso(
          this.data.codigo,
          clearHttpParams({
            ...this.form.getRawValue(),
            ementa: ementa,
          }),
        )
        .subscribe(() => {
          this._matSnackBar.open('Curso alterado com sucesso!', 'Fechar', {
            duration: 3000,
          });

          this._matDialogRef.close();
          this._loadingControl.hide();
        });
    } else {
      this._cursoService
        .createCurso({
          ...this.form.getRawValue(),
          ementa: ementa,
        })
        .subscribe(() => {
          this._matSnackBar.open('Curso criado com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this._matDialogRef.close();
          this._loadingControl.hide();
        });
    }
  }

  loadData(id: string) {
    this._loadingControl.show();

    this._cursoService.getCursoById(id).subscribe((curso) => {
      this.form.patchValue(curso);
      this.textAreaForm.setValue({ ementa: curso.ementa });
      this._loadingControl.hide();
    });
  }
}
