import { Establishment } from '../_models/establishment';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService extends ApiService<Establishment>{

  constructor(protected http: HttpClient) {
    super(http, environment.URL_API+'establishments');
  }
  
}