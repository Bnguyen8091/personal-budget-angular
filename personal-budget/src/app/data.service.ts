// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: number[] = []; // Variable to store data

  private apiUrl = 'https://your-backend-url/api/chart-data'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getData(): Observable<number[]> {
    if (this.data.length > 0) {
      // If data is already available, return it as an Observable
      return of(this.data);
    } else {
      // If data is not available, make an HTTP request
      return this.http.get<number[]>(this.apiUrl).pipe(
        tap(data => this.data = data), // Save the fetched data
        catchError(this.handleError<number[]>('getData', []))
      );
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
