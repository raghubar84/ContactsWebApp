import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = "http://localhost:5248/api/";
  constructor(private http: HttpClient) { }

  getContacts(): Observable<contact[]> {
    return this.http.get<contact[]>(this.baseUrl + 'ContactApi');
  }
}
