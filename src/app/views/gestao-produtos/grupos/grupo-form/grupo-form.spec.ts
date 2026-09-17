import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoForm } from './grupo-form';

describe('GrupoForm', () => {
  let component: GrupoForm;
  let fixture: ComponentFixture<GrupoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(GrupoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
