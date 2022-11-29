import { TestBed } from '@angular/core/testing';

import { ItemregisterService } from './itemregister.service';

describe('ItemregisterService', () => {
  let service: ItemregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
