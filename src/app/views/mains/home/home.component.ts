import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, take, timeout } from 'rxjs';
import { AppRoutes } from 'src/app/app-routes';
import { IPost } from 'src/app/models/ipost';
import { IPostDetails } from 'src/app/models/ipost-details';
import { IUser } from 'src/app/models/iuser';
import { ResponseGetAllPosts } from 'src/app/reponses/response-get-all-posts';
import { PostDetailsService } from 'src/app/services/post-details-service/post-details.service';
import { PostService } from 'src/app/services/post-service/post.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // the current user's information
  public userDetails: IUser;

  // selecting the filter options
  public selected: string;
  public filterOptions: string[] = ['none', 'userPosts', 'mostViews', 'leastViews'];
  public filterPosts: any[];

  // if the current user has no posts we will flag it to display ngTemplate
  public havePosts: boolean;

  // The post information
  public firstName: string;
  public posts: any[];

  // if filterpost is empty, we need to flag it to show ng template saying there is no posts
  public isFilterPostEmpty: boolean;

  constructor(private router: Router, private postService: PostService, 
    private postDetailsService: PostDetailsService, private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private changeRef: ChangeDetectorRef,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.isFilterPostEmpty = false;
    this.firstName = JSON.parse(sessionStorage.getItem("userDetails")).firstName;
    const user = JSON.parse(sessionStorage.getItem("userDetails"));

    this.userDetails = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    }

    //console.log("<<  home component >>", user)
    this.getAllPosts();
  }

  testMethod(val: boolean): void{
    if(val){
      //console.log(val);
    }else{console.warn("val is false")};
  }

  getAllPosts(){
    this.postService.getAllPosts().pipe(take(1), timeout(10000)).subscribe({
      // I have to use dataType any, otherwise I wont be able
      // to extract the createdDate as my IPost does not have it declared in the beginnning
      next: (res: any) => {
        //console.log("<< THE POSTS DETAILS >>", res)
        this.posts = res;
        this.filterPosts = this.posts;
        // TODO: Sort the posts by date latest at the top and oldest at the bottm 

        //console.log("<< home component: Get post >>", res)
        this.changeRef.detectChanges();
        //console.log("next")
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        //console.log("complete")
        //this.changeRef.markForCheck();
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
  // this method is linked to post list on butotn click
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
    this.postService.addViewCount(postDetails).pipe(take(1)).subscribe();

    // this.router.navigate([AppRoutes.POST_DETAILS], {relativeTo: this.activatedRoute})
    this.router.navigate([AppRoutes.POST_DETAILS]);
    //console.log("CLICKED", post.createdDate);
  }

  extractDate(dateTime: string){
    let date = dateTime.slice(0, -14);
    return date;
  }

  selectedFilter(filter: string){

    //console.log("The current filter", filter)
  
    if(filter === this.filterOptions[0]){ // if the selected filter is 'none'

      //console.log("This is the selected filter:", filter)

      // we need to clear it everytime a new filter is selected otherwise we end up added more into it
      this.filterPosts = this.posts;

      // setting isFilterPost to false
      this.isFilterPostEmpty = false;

    }else if(filter === this.filterOptions[1]){ // if the selected filter is 'userPosts'

      // we need to clear it everytime a new filter is selected otherwise we end up added more into it
      this.filterPosts = [];

      //console.log("This is the selected filter:", filter)

      this.posts.forEach((post) => {
        if(post.userId === this.userDetails.id){
          this.filterPosts.push(post);
        }
      })

      if(this.filterPosts.length == 0){

        // we need to flag the boolean when filterpost is empty
        this.isFilterPostEmpty = true;

        console.log("There is no posts");
      }else{
        this.isFilterPostEmpty = false;
      }

    }else if(filter === this.filterOptions[2]){ // if the selected filter is 'mostViews'

      // we need to clear it everytime a new filter is selected otherwise we end up added more into it
      this.filterPosts = [];
      this.filterPosts = this.posts.sort((a, b) => (b.views - a.views));

      //console.log("This is the selected filter:", filter)

      // setting isFilterPost to false
      this.isFilterPostEmpty = false;

    }else if(filter === this.filterOptions[3]){ // if the selected filter is 'leastViews'

      // we need to clear it everytime a new filter is selected otherwise we end up added more into it
      this.filterPosts = [];
      this.filterPosts = this.posts.sort((a, b) => (a.views - b.views));
      //console.log("This is the selected filter:", filter)

      // setting isFilterPost to false
      this.isFilterPostEmpty = false;
      
    }

    //console.log(this.filterPosts);
    this.changeRef.detectChanges();
  }

}
