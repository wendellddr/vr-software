import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'alunos',
        loadChildren: () =>
          import('../alunos/alunos.module').then((m) => m.AlunosModule),
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('../cursos/cursos.module').then((m) => m.CursosModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
