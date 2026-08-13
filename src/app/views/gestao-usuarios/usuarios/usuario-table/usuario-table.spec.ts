import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioTable } from './usuario-table';

describe('UsuarioTable', () => {
  let component: UsuarioTable;
  let fixture: ComponentFixture<UsuarioTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioTable],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
