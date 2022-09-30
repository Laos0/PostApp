import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {



  // when subject publishes, all listeners on the observable will react to 
  private _onSelectPost: Subject<any> = new Subject<any>();
  public onSelectPost$: Observable<any> = this._onSelectPost.asObservable();
  
  constructor() { }

  // We need to pass data from Home component to PostDetails component
  // to achieve that we need to introduce Subject and Observable 
  // this method will be caleld in the Home Component
  public onSelectPost(data: any): void{
    this._onSelectPost.next(data);
  }

}
