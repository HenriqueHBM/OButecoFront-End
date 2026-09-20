import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Movimentacoes } from './movimentacoes';

describe('Movimentacoes', () => {
  let component: Movimentacoes;
  let fixture: ComponentFixture<Movimentacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Movimentacoes],
    }).compileComponents();

    fixture = TestBed.createComponent(Movimentacoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
