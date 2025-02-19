import { TestBed } from '@angular/core/testing';

import { BandeService } from './bande.service';

describe('BandeService', () => {
  let service: BandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
