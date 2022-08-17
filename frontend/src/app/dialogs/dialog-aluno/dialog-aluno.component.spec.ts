import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlunoComponent } from './dialog-aluno.component';

describe('DialogAlunoComponent', () => {
  let component: DialogAlunoComponent;
  let fixture: ComponentFixture<DialogAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAlunoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
