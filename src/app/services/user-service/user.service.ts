import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPoints } from 'src/app/libs/apiPaths';
import { IUser } from 'src/app/models/iuser';
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

  // send a http get request to fetch user based on the given id
  getUserById(id: number): Observable<IUser>{
    return this.http.get<IUser>(ApiEndPoints.GET_USER + id); // http://localhost:8080/api/v1/users/1

  }


  createUser(user: User): Observable<ResponseCreateUser>{
    return this.http.post<ResponseCreateUser>(ApiEndPoints.USER_CREATE, user, this.httpOptions);
  }
}
