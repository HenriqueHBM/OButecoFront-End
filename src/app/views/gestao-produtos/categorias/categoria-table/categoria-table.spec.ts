import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaTable } from './categoria-table';

describe('CategoriaTable', () => {
  let component: CategoriaTable;
  let fixture: ComponentFixture<CategoriaTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaTable],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
