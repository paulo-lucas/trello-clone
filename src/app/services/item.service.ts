import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:3333/';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get(API_URL + 'item/index', { responseType: 'json' });
  }

  create(): Observable<any> {
    return this.http.post(API_URL + 'item/new', { responseType: 'json' });
  }

  move(id: string, status: string): Observable<any> {
    return this.http.put(API_URL + 'item/' + id, { responseType: 'json' });
  }

  remove(): Observable<any> {
    return this.http.delete(API_URL + 'item.delete', { responseType: 'json' });
  }
}