import { Component, OnInit } from '@angular/core';
import { take, timeout } from 'rxjs';
import { IPost } from 'src/app/models/ipost';
import { IPostDetails } from 'src/app/models/ipost-details';
import { IUser } from 'src/app/models/iuser';
import { PostDetailsService } from 'src/app/services/post-details-service/post-details.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  public post: IPostDetails;
  public userDetails: IUser;

  constructor(private postDetailsService: PostDetailsService, private userService: UserService) { }

  ngOnInit(): void {


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

}


