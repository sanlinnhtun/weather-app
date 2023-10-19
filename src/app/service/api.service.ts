import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private  http: HttpClient) { }

  apiCall(url: string){
    return this.http.get(url)
  }
}