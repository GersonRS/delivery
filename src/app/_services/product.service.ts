import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { Product } from './../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService<Product>{

  constructor(protected http: HttpClient) {
    super(http, environment.URL_API+'products');
  }
  
}
