import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTable } from './grupo-table';

describe('GrupoTable', () => {
  let component: GrupoTable;
  let fixture: ComponentFixture<GrupoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoTable],
    }).compileComponents();

    fixture = TestBed.createComponent(GrupoTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
