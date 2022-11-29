import { TestBed } from '@angular/core/testing';

import { BorroweditemsService } from './borroweditems.service';

describe('BorroweditemsService', () => {
  let service: BorroweditemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorroweditemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
