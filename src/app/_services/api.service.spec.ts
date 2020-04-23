import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        ApiService,
      ],
    });
  });

  it('should get users', inject([HttpClient],
      (apiService: ApiService<any>) => {
        expect(apiService).toBeTruthy();
      }
    )
  );

  it('should be created', () => {
    const service: ApiService<any> = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
