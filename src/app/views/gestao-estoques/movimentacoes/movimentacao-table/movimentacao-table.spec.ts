import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacaoTable } from './movimentacao-table';

describe('MovimentacaoTable', () => {
  let component: MovimentacaoTable;
  let fixture: ComponentFixture<MovimentacaoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentacaoTable],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimentacaoTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
