import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPoints } from 'src/app/libs/apiPaths';
import { IPost } from 'src/app/models/ipost';
import { User } from 'src/app/models/user';
import { ResponseCreateUser } from 'src/app/reponses/response-create-user';
import { ResponseGetAllPosts } from 'src/app/reponses/response-get-all-posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // sending request to the backend to create a post
  createPost(post: IPost): Observable<IPost>{
    console.log(ApiEndPoints.USER_CREATE_POST);

    return this.http.post<IPost>(ApiEndPoints.USER_CREATE_POST, post, this.httpOptions);
  }

  // get all the posts and load it onto the screen
  getAllPosts(): Observable<IPost[]>{
    console.log("<< post service: get all posts request >>");
    return this.http.get<IPost[]>(ApiEndPoints.GET_POSTS);
  }

  addViewCount(post: any): Observable<any>{
    console.log("<< post service: view count increase >>");
    return this.http.post<any>(ApiEndPoints.POST_ADD_VIEW_COUNT, post, this.httpOptions);
  }

  deletePostById(postId: number): Observable<any>{
    console.log("<< post service: view count increase >>");
    return this.http.delete<any>(ApiEndPoints.DELETE_POST + postId + "/delete");
  }
}
