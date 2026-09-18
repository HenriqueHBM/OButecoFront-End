import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conversoes } from './conversoes';

describe('Conversoes', () => {
  let component: Conversoes;
  let fixture: ComponentFixture<Conversoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conversoes],
    }).compileComponents();

    fixture = TestBed.createComponent(Conversoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
