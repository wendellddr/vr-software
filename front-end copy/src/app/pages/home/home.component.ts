import { Component, OnInit } from '@angular/core';

import { NavList } from '../../shared/interfaces/navList.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  navList: NavList[] = [
    {
      name: 'Cursos',
      value: 'cursos',
    },
    {
      name: 'Alunos',
      value: 'alunos',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
