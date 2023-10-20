import { TestBed } from '@angular/core/testing';

import { CrearBDService } from './crear-bd.service';

describe('CrearBDService', () => {
  let service: CrearBDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearBDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
