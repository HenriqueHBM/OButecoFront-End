import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cargos } from './cargos';

describe('Cargos', () => {
  let component: Cargos;
  let fixture: ComponentFixture<Cargos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cargos],
    }).compileComponents();

    fixture = TestBed.createComponent(Cargos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
