import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuperHero } from '../models/superhero';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroFinderService {
  serverUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getMostPopular(): Observable<SuperHero[]>{
    return this.http.get<SuperHero[]>(`${this.serverUrl}/api/popular`);
  }

  getById(id: number): Observable<string[]>{
    return this.http.get<string[]>(`${this.serverUrl}/api/${id}`);
  }

  getAllByName(name: string): Observable<string[]>{
    return this.http.get<string[]>(`${this.serverUrl}/api/${name}`);
  }
}
