import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map, take } from 'rxjs/operators';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdkNTdmNzQyZjA1Yjk2NjMwNWI2MzFhNzkwYzg4NzY0OGZhNTZjZTRiZjY2ZmVjZWQzMjg5MmY0MWVmMzU3MWM5YWNmMzM3ZmVkYjUwZDY5In0.eyJhdWQiOiIyIiwianRpIjoiN2Q1N2Y3NDJmMDViOTY2MzA1YjYzMWE3OTBjODg3NjQ4ZmE1NmNlNGJmNjZmZWNlZDMyODkyZjQxZWYzNTcxYzlhY2YzMzdmZWRiNTBkNjkiLCJpYXQiOjE1NzgxOTMwMDUsIm5iZiI6MTU3ODE5MzAwNSwiZXhwIjoxNjA5ODE1NDA0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.JIZfuYhBElRG4AMK4v6Ow2TW702zi6-VvuNbEWKVLNvRQ4KNqkRYdWNJnNOdc34JBixUXF4grejuEHPvPoa-hMe-hVPzUfRFxh_u7uhydYUnOb3qmuNU-SFv_NAHB9AGTkG3kvk7McFTNHLw-19Vd_IYHrS65X7aJjqAM15SMv_Vw9H0i5eKSGc2Oa9w5Ax2hUy0V2L6b_UMv_kamgdhRpACBHH6tE29QdPBe3aAO4r1cZZ5-rEFYOtc4NZ5V2oT87HwKYTkuWWSQ_lmbkTQFOgexW2wqudx1r8_6rcLoiUvN3QhflenZLVTd50sVc5Pxwvx_p9lAmdNNZ-ykDdJ2xs-kou_G1XuXUm7ZOc4wNnwABCAdh0xad9sH8UoA2E3NzTlRHcFJqHZRm5VUZQ4PBVmx0FHWeJ3-Vf-nZYM7c75Gn_m2Nges4HFMOE8gcTyxfKkQS4s-6EZami-O6kAC1vyPwbBsUbzYluFtN3Jxu16z9VRzDfdRkDDjn1H7V3lkULhLQ5fSIX0NcMjYa83l0QRQUkoPJidBFxoY629VlozJ_MdQoz5t-B3dmfxsXKDkGKbZzomuyI5Oazmu5F-3t_27UaqWqLfIbv_PK74LvbwV-Yu8xPZOwrCHPNNZ-oXcRz5wu65qCxedm1_4g6hbbDyI6mTKa0QCQVAWNIwqcw',
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {

  private parameters = "";

  private current_page = 1;

  constructor(protected http: HttpClient, private API_URL: string) { }

  setParameters(parameters: string) {
    this.parameters = "/" + parameters;
    return this;
  }

  private resetParameters() {
    this.parameters = ""
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  listWithPagination(): Observable<T[]> {
    return this.http.get<T[]>(`${this.API_URL}/paginate${this.parameters}?page=${this.current_page}`)
      .pipe(
        tap(response => {
          this.resetParameters();
          this.current_page++;

        }),
        map((response: any) => response.data),
        take(1),
        catchError(this.handleError(`get list of the ${this.API_URL}`, []))
      );
  }

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL + this.parameters)
      .pipe(
        tap((response: any) => console.log(response.status)),
        map((response: any) => response.data),
        tap(_ => this.resetParameters()),
        take(1),
        catchError(this.handleError(`get list of the ${this.API_URL}`, []))
      );
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${id}${this.parameters}`)
      .pipe(
        tap(_ => console.log('_data get')),
        take(1),
        tap(_ => this.resetParameters()),
        catchError(this.handleError<T>(`get ${this.API_URL} with id=${id}`))
      );
  }

  add(record: T): Observable<T> {
    return this.http.post<T>(this.API_URL, record)
      .pipe(
        take(1),
        tap(_ => console.log('data add'),
          catchError(this.handleError<T>('add'))
        ));
  }

  update(id: number, record: T): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${id}`, record)
      .pipe(
        tap(_ => console.log(`updated product id=${id}`)),
        take(1),
        catchError(this.handleError<any>('updateProduct'))
      );
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.API_URL}/${id}`)
      .pipe(
        tap(_ => console.log(`deleted product id=${id}`)),
        take(1),
        catchError(this.handleError<T>('deleteProduct'))
      );
  }
}
