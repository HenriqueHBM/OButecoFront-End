import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueTable } from './estoque-table';

describe('EstoqueTable', () => {
  let component: EstoqueTable;
  let fixture: ComponentFixture<EstoqueTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstoqueTable],
    }).compileComponents();

    fixture = TestBed.createComponent(EstoqueTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
