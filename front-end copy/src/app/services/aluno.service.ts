import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import {
  AlunoResponse,
  AlunosParams,
  CreateAluno,
  GetAllAlunoResponse,
  GetOneAluno,
  UpdateAluno,
} from '../shared/interfaces/aluno.interfaces';
import { clearHttpParams } from '../shared/utils';

//Pega as informações da API do environment
const { apiURL } = environment;

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private _http: HttpClient) {}

  //Lista de todos os Alunos
  getAlunos(alunosParams?: AlunosParams): Observable<GetAllAlunoResponse> {
    return this._http.get<GetAllAlunoResponse>(`${apiURL}/alunos`, {
      params: new HttpParams({ fromObject: clearHttpParams(alunosParams) }),
    });
  }

  //Lista somente um aluno
  getAlunoById(id: string): Observable<GetOneAluno> {
    return this._http.get<GetOneAluno>(`${apiURL}/alunos/${id}`);
  }

  //Cria-se um aluno
  createAluno(data?: CreateAluno): Observable<AlunoResponse> {
    return this._http.post<AlunoResponse>(`${apiURL}/alunos`, data);
  }

  //Atualiza um aluno
  updateAluno(
    id: string | number,
    data: UpdateAluno,
  ): Observable<AlunoResponse> {
    return this._http.patch<AlunoResponse>(`${apiURL}/alunos/${id}`, data);
  }

  //Deleta um aluno
  deleteAluno(id: string | number): Observable<AlunoResponse> {
    return this._http.delete<AlunoResponse>(`${apiURL}/alunos/${id}`);
  }

  downloadAlunoPdf(alunosParams?: AlunosParams) {
    return this._http.get(`${apiURL}/alunos/pdf/`, {
      params: new HttpParams({ fromObject: clearHttpParams(alunosParams) }),
    });
  }
}
