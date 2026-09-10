import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoTable } from './cargo-table';

describe('CargoTable', () => {
  let component: CargoTable;
  let fixture: ComponentFixture<CargoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargoTable],
    }).compileComponents();

    fixture = TestBed.createComponent(CargoTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
