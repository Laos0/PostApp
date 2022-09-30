import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AppRoutes } from 'src/app/app-routes';
import { IPost } from 'src/app/models/ipost';
import { ResponseGetAllPosts } from 'src/app/reponses/response-get-all-posts';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public firstName: string;
  public posts: IPost[];

  constructor(private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    this.firstName = JSON.parse(sessionStorage.getItem("userDetails")).firstName;
    this.getAllPosts();
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe({
      next: (res: IPost[]) => {
        this.posts = res;
        console.log("<< home component: Get post >>", this.posts)
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

}
