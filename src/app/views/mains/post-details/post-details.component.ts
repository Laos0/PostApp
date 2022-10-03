import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take, timeout } from 'rxjs';
import { AppRoutes } from 'src/app/app-routes';
import { ConsoleColor } from 'src/app/libs/console-color';
import { IPostDetails } from 'src/app/models/ipost-details';
import { IUser } from 'src/app/models/iuser';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { PostDetailsService } from 'src/app/services/post-details-service/post-details.service';
import { PostService } from 'src/app/services/post-service/post.service';
import { UserService } from 'src/app/services/user-service/user.service';



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

  constructor(private postDetailsService: PostDetailsService, 
    private userService: UserService,
    private postService: PostService,
    private dialog: DialogService,
    private router: Router) { }

  ngOnInit(): void {

    this.sessionUser = JSON.parse(sessionStorage.getItem("userDetails"));

    this.postDetailsService.onSelectPost$.subscribe((data) => {
   
      this.post = {
        id: data.id,
        userId: data.userId,
        title: data.title,
        text: data.text,
        views: data.views,
        date: data.createdDate,

      };
      
      
      console.log("<< Selected Post >>", this.post.date)

      // TODO: set in session so when refresh is clicked, we can load it
      // sessionStorage.setItem("post", JSON.stringify(this.post));
      this.getUserPostDetails(this.post.userId);
    })

    console.log("THE USER's SESSION ID",this.post.id);
    if(this.sessionUser.id === this.post.userId){
      this.isUserPost = true;
      console.log("<< PostDetails component >> POST BELONGS TO SESSION USER")

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
          console.log(this.userDetails);
        },
        error (e){
          console.warn(e);
        }
      });
    console.log("getUserPostDetails");
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

  // TODO: Finish implementation of editPost
  editPost(post: IPostDetails){
    this.postDetailsService.onSelectPost(post);
    this.router.navigate([AppRoutes.POST_EDIT]);
    console.log("%c Editing post " + post.id, ConsoleColor.GREEN);
  }

}


