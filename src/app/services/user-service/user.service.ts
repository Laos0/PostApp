import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPoints } from 'src/app/libs/apiPaths';
import { User } from 'src/app/models/user';
import { ResponseCreateUser } from 'src/app/reponses/response-create-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUsers(){
    
  }

  
  createUser(user: User): Observable<ResponseCreateUser>{
    return this.http.post<ResponseCreateUser>(ApiEndPoints.USER_CREATE, user, this.httpOptions);
  }
}
