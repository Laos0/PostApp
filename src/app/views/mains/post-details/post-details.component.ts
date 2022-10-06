import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, take, takeUntil, timeout } from 'rxjs';
import { AppRoutes } from 'src/app/app-routes';
import { ConsoleColor } from 'src/app/libs/console-color';
import { IPostDetails } from 'src/app/models/ipost-details';
import { IUser } from 'src/app/models/iuser';
import { IComment } from 'src/app/models/icomment';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { PostDetailsService } from 'src/app/services/post-details-service/post-details.service';
import { PostService } from 'src/app/services/post-service/post.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { CommentUser } from 'src/app/models/comment-user';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  public post: IPostDetails;
  public userDetails: IUser;
  public isUserPost: boolean = false;
  private sessionUser: any;
  public comments: IComment[];

  // comment form
  public commentForm: FormGroup;

  // reply comment form
  public replyCommentForm: FormGroup;
  public isReply: boolean = false;

  public _onPostReturned = new ReplaySubject<void>(1);
  public onPostReturned$ = this._onPostReturned.asObservable();

  public _onCommentReturned = new ReplaySubject<boolean>(1);
  public onCommentReturned$ = this._onCommentReturned.asObservable();
  
  public _allDataReady = new ReplaySubject<boolean>(1);
  public onUserDetailsReturned$ = this._allDataReady.asObservable();

  public _onGetUserPostDetails = new ReplaySubject<boolean>(1);
  public onGetUserPostDetails$ = this._onGetUserPostDetails.asObservable();

  constructor(private postDetailsService: PostDetailsService, 
    private userService: UserService,
    private postService: PostService,
    private dialog: DialogService,
    private router: Router,
    private commentService: CommentService,
    private changeRef: ChangeDetectorRef,
    private fb: FormBuilder) { }

    ngOnInit(): void {
      this.sessionUser = JSON.parse(sessionStorage.getItem("userDetails"));

      this.commentForm = this.fb.group({
        comment: [
          '',
          {
            validators: [Validators.required],
            updateOn: 'blur',
          },
        ]
      });

      this.replyCommentForm = this.fb.group({
        replyComment: [
          '',
          {
            validators: [Validators.required],
            updateOn: 'blur',
          },
        ]
      });
      
      this.postDetailsService.onSelectPost$.pipe(take(1)).subscribe((data) => {
        
        this.post = {
          id: data.id,
          userId: data.userId,
          title: data.title,
          text: data.text,
          views: data.views,
          date: data.createdDate
        };
        
        
        console.log("<< Selected Post >>", this.post.date)
        this._onPostReturned.next();
        
        // TODO: When we press refresh we lose all its post details, we must store it in session
        // sessionStorage.setItem("post", JSON.stringify(this.post));
      });
      
      this.onPostReturned$.pipe(take(1)).subscribe(() => {
        console.log("Start of coment request");
        
        this.getUserPostDetails(this.post.userId);

        this.commentService.getAllCommentInPost(this.post).subscribe((res) => {
          
          if(res && res.length > 0){
            this.comments = res;
            //console.log(this.comments);
            this._onCommentReturned.next(true);
          }else{
            this._onCommentReturned.next(false);
         
          }
          this.changeRef.detectChanges();
        });
      })

      // this.onCommentReturned$.pipe(take(1)).subscribe(() => {
      
      //   console.log("Last guy")
      //   this._allDataReady.next(true);
      //   this.changeRef.detectChanges();
      // })
      
      
    //console.log("THE USER's SESSION ID",this.post.id);
    if(this.sessionUser.id === this.post.userId){
      this.isUserPost = true;
      //console.log("<< PostDetails component >> POST BELONGS TO SESSION USER")

    }


    //console.log(this.post)
  }

  getUserPostDetails(id: number){

    this.userService.getUserById(id).pipe(take(1), timeout(10000))
      .subscribe({
        next: (res: any) => {
          this.userDetails = {
            id: res.id,
            firstName: res.first_name,
            lastName: res.last_name,
            email: res.email,
            password: res.password
          }
          this.changeRef.detectChanges();
          //console.log(this.userDetails);
        },
        error (e){
          console.warn(e);
        },
        complete: () => {
          this._onGetUserPostDetails.next(true);
          this.changeRef.detectChanges();
        }
      });
    //console.log("getUserPostDetails");
  }

  deletePost(id: number){

    let confirmation = this.dialog.confirmDialog({
      message: "Are you sure you want to delete this post?",
      confirmText: "Yes",
      cancelText: "No"
    }).subscribe((data) => {
      // if user clicked yes then proceed to delete the post
      if(data === true){
        this.postService.deletePostById(id).pipe(take(1), timeout(10000)).subscribe(() => {
          // once the post is deleted we will route them back to the home page
          this.router.navigate([AppRoutes.HOME]);
        });
      }
    });

  }

  extractDate(dateTime: string){
    let date = dateTime.slice(0, -14);
    return date;
  }

  editPost(post: IPostDetails){
    this.postDetailsService.onSelectPost(post);
    this.router.navigate([AppRoutes.POST_EDIT]);
    console.log("%c Editing post " + post.id, ConsoleColor.GREEN);
  }



  // -------------------  All related comment functionality --------------------

  // get the text from the comment box
  getComment() {return this.commentForm.get('comment').value;}

  // comment button will call this button
  submitCommentForm(){

    let comment: IComment = {
      userId: JSON.parse(sessionStorage.getItem('userDetails')).id,
      postId: this.post.id,
      text: this.getComment()
    }
    

    // TODO: NEED TO RERENDER THE COMPONENT after comment is submitted
    this.commentService.addComment(comment).pipe(take(1)).subscribe({
      next: (res) => {
        console.log("%c << COMMENT >> ", res)
        this.ngOnInit();
      },
      error: (e) => {

      },
      complete: () => {
      
      }
    });

    this.commentForm.dirty;
    console.log(comment);
  }

  // when reply is clicked
  reply(){
    console.log("%c Clicking reply", ConsoleColor.GREEN);
    this.isReply = true;
  }

  submitReplyCommentForm(){
    
  }


}


