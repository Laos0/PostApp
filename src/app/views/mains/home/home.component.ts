import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AppRoutes } from 'src/app/app-routes';
import { IPost } from 'src/app/models/ipost';
import { IPostDetails } from 'src/app/models/ipost-details';
import { ResponseGetAllPosts } from 'src/app/reponses/response-get-all-posts';
import { PostDetailsService } from 'src/app/services/post-details-service/post-details.service';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public firstName: string;
  public posts: any[];

  constructor(private router: Router, private postService: PostService, 
    private postDetailsService: PostDetailsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.firstName = JSON.parse(sessionStorage.getItem("userDetails")).firstName;
    this.getAllPosts();
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe({
      // I have to use dataType any, otherwise I wont be able
      // to extract the createdDate as my IPost does not have it declared in the beginnning
      next: (res: any) => {
        this.posts = res;
        console.log("<< home component: Get post >>", res)
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  // call this method when post button is clicked
  post(){
    // redirect client to Post component to post
    this.router.navigate([AppRoutes.POST]);
  }

  // very bad way of type usage
  // this will solve current problem as I did not declared date on IPost in the beginning
  getPostDetails(post: any){

    // we will pass the post data to the PostDetail component by storing it in our subject
    // the data will be retreieved in the PostDetail component which
    // the obeservable will carry the data
    this.postDetailsService.onSelectPost(post);

    // every time a post is click, we need to update its view count
    // might need to cast post into an iPost
    let postDetails: IPostDetails = {
        id: post.id,
        userId: post.userId,
        title: post.title,
        text: post.text,
        views: post.views,
        date: post.createdDate
    }
    this.postService.addViewCount(postDetails).subscribe();

    // this.router.navigate([AppRoutes.POST_DETAILS], {relativeTo: this.activatedRoute})
    this.router.navigate([AppRoutes.POST_DETAILS]);
    //console.log("CLICKED", post.createdDate);
  }

}
