import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversaoForm } from './conversao-form';

describe('ConversaoForm', () => {
  let component: ConversaoForm;
  let fixture: ComponentFixture<ConversaoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversaoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ConversaoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
