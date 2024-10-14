import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = "http://localhost:5248/api/";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private contactId = new Subject<number>();
  contactId$ = this.contactId.asObservable();

  setData(contactId: number) {
    this.contactId.next(contactId);
  }

  constructor(private http: HttpClient) { }

  getContacts(): Observable<contact[]> {
    return this.http.get<contact[]>(this.baseUrl + 'ContactApi');
  }

  getContact(id:number): Observable<contact> {
    return this.http.get<contact>(this.baseUrl + 'ContactApi/' + id);
  }

  postContact(contact:any): Observable<any>{
    //console.log(contact);
    return this.http.post<any>(this.baseUrl + 'ContactApi', contact, { headers: this.headers });
  }

  updateContact(id:number, contact:any): Observable<any>{    
    return this.http.put<any>(this.baseUrl + 'ContactApi/' + id, contact, { headers: this.headers });
  }

  deleteContact(id:number): Observable<any>{   
    return this.http.delete<any>(this.baseUrl + 'ContactApi/' + id);
  }
}
