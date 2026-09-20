import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoTable } from './produto-table';

describe('ProdutoTable', () => {
  let component: ProdutoTable;
  let fixture: ComponentFixture<ProdutoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
