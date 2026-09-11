import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estoques } from './estoques';

describe('Estoques', () => {
  let component: Estoques;
  let fixture: ComponentFixture<Estoques>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Estoques],
    }).compileComponents();

    fixture = TestBed.createComponent(Estoques);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
