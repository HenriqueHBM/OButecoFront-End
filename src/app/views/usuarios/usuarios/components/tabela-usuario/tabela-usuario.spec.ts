import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaUsuario } from './tabela-usuario';

describe('TabelaUsuario', () => {
  let component: TabelaUsuario;
  let fixture: ComponentFixture<TabelaUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaUsuario],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
