import { TestBed } from '@angular/core/testing';

import { ConversaoService } from './conversao-service';

describe('ConversaoService', () => {
  let service: ConversaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
