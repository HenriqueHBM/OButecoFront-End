import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacaoForm } from './movimentacao-form';

describe('MovimentacaoForm', () => {
  let component: MovimentacaoForm;
  let fixture: ComponentFixture<MovimentacaoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentacaoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimentacaoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
