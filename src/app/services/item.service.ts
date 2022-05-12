import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:3333/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get(API_URL + 'item');
  }

  create(content: string): Observable<any> {
    return this.http.post(API_URL + 'item/new', { content }, httpOptions);
  }

  move(id: string, status: string): Observable<any> {
    return this.http.put(API_URL + 'item/' + id, { status }, httpOptions);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(API_URL + 'item/' + id);
  }
}
