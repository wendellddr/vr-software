import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import {
  CursoParams,
  CursoResponse,
  GetAllCursosResponse,
} from '../shared/interfaces/curso.interfaces';
import { clearHttpParams } from '../shared/utils';
import {
  CreateCurso,
  UpdateCurso,
} from './../shared/interfaces/curso.interfaces';

//Pega as informações da API do environment
const { apiURL } = environment;

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  constructor(private _http: HttpClient) {}

  //Lista de todos os cursos
  getCursos(cursoParams?: CursoParams): Observable<GetAllCursosResponse> {
    return this._http.get<GetAllCursosResponse>(`${apiURL}/cursos`, {
      params: new HttpParams({
        fromObject: cursoParams ? clearHttpParams(cursoParams) : null,
      }),
    });
  }

  //Lista somente um curso
  getCursoById(id: string): Observable<CursoResponse> {
    return this._http.get<CursoResponse>(`${apiURL}/cursos/${id}`);
  }

  //Cria-se um curso
  createCurso(data?: CreateCurso): Observable<CursoResponse> {
    return this._http.post<CursoResponse>(`${apiURL}/cursos`, data);
  }

  //Atualiza um curso
  updateCurso(
    id: string | number,
    data: UpdateCurso,
  ): Observable<CursoResponse> {
    return this._http.patch<CursoResponse>(`${apiURL}/cursos/${id}`, data);
  }

  //Deleta um curso
  deleteCurso(id: string | number): Observable<CursoResponse> {
    return this._http.delete<CursoResponse>(`${apiURL}/cursos/${id}`);
  }

  downloadCursoPdf(cursoParams?: CursoParams) {
    return this._http.get(`${apiURL}/cursos/pdf/`, {
      params: new HttpParams({ fromObject: clearHttpParams(cursoParams) }),
    });
  }
}
