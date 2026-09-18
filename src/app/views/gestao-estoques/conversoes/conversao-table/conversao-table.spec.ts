import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversaoTable } from './conversao-table';

describe('ConversaoTable', () => {
  let component: ConversaoTable;
  let fixture: ComponentFixture<ConversaoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversaoTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ConversaoTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
