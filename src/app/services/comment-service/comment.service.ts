import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ApiEndPoints } from 'src/app/libs/apiPaths';
import { IComment } from 'src/app/models/icomment';
import { IPostDetails } from 'src/app/models/ipost-details';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // when subject publishes, all listeners on the observable will react to 
  private _onSelectComment: ReplaySubject<any> = new ReplaySubject<any>(1);
  public onSelectComment$: Observable<any> = this._onSelectComment.asObservable();


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllCommentInPost(post: IPostDetails): Observable<IComment[]>{
    return this.http.post<IComment[]>(ApiEndPoints.GET_COMMENTS + post.id + "/comment", post, this.httpOptions);
  }

  // We need to pass data from Home component to PostDetails component
  // to achieve that we need to introduce Subject and Observable 
  // this method will be caleld in the Home Component
  public onSelectComment(data: any): void{
    this._onSelectComment.next(data);
  }
}
