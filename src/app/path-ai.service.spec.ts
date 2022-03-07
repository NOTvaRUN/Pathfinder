import { TestBed } from '@angular/core/testing';

import { PathAiService } from './path-ai.service';

describe('PathAiService', () => {
  let service: PathAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
