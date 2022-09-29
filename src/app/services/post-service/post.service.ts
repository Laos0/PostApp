import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPoints } from 'src/app/libs/apiPaths';
import { IPost } from 'src/app/models/ipost';
import { User } from 'src/app/models/user';
import { ResponseCreateUser } from 'src/app/reponses/response-create-user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  createPost(post: IPost): Observable<IPost>{
    console.log(ApiEndPoints.USER_CREATE_POST)

    
    return this.http.post<IPost>(ApiEndPoints.USER_CREATE_POST, post, this.httpOptions);
  }
}
