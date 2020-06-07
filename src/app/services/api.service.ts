import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { Pagination } from './../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T>{

  protected parameters = '';
  protected pagination: Pagination<T> = {
    data: [],
    links: {
      first: null,
      last: null,
      prev: null,
      next: `${this.API_URL}/paginate${this.parameters}?page=1`
    },
    meta: {
      current_page: 1,
      from: null,
      last_page: null,
      path: null,
      per_page: null,
      to: null,
      total: null
    }
  };

  constructor(protected http: HttpClient, protected API_URL: string) { }

  setParameters(parameters: string) {
    this.parameters = '/' + parameters;
    return this;
  }

  protected resetParameters() {
    this.parameters = '';
  }

  handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  hasNext() {
    return this.pagination.links.next ? true : false;
  }

  listWithPagination(): Observable<T[]> {
    return this.http.get<Pagination<T>>(this.pagination.links.next)
      .pipe(
        take(1),
        tap(pagination => this.pagination = pagination),
        tap(_ => this.resetParameters()),
        map((response: any) => response.data),
        catchError(this.handleError(`Error get list with pagination in ${this.API_URL}`, []))
      );
  }

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL + this.parameters)
      .pipe(
        take(1),
        tap(_ => this.resetParameters()),
        map((response: any) => response.data),
        catchError(this.handleError(`Error get list in ${this.API_URL}`, []))
      );
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${id}${this.parameters}`)
      .pipe(
        take(1),
        tap(_ => this.resetParameters()),
        catchError(this.handleError(`Error get in ${this.API_URL} with id=${id}`))
      );
  }

  add(record: T): Observable<T> {
    return this.http.post<T>(this.API_URL, record)
      .pipe(
        take(1),
        catchError(this.handleError(`Error add in ${this.API_URL}`))
      );
  }

  update(id: number, record: T): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${id}`, record)
      .pipe(
        take(1),
        catchError(this.handleError(`Error update in ${this.API_URL} with id=${id}`))
      );
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.API_URL}/${id}`)
      .pipe(
        take(1),
        catchError(this.handleError(`Error delete in ${this.API_URL} with id=${id}`))
      );
  }
}
