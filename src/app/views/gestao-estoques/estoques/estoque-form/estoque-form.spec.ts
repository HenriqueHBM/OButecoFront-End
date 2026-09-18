import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueForm } from './estoque-form';

describe('EstoqueForm', () => {
  let component: EstoqueForm;
  let fixture: ComponentFixture<EstoqueForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstoqueForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EstoqueForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
