import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take, timeout } from 'rxjs';
import { AppRoutes } from 'src/app/app-routes';
import { ConsoleColor } from 'src/app/libs/console-color';
import { IPost } from 'src/app/models/ipost';
import { IPostDetails } from 'src/app/models/ipost-details';
import { IPostEdit } from 'src/app/models/ipost-edit';
import { PostDetailsService } from 'src/app/services/post-details-service/post-details.service';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  public postForm: FormGroup;
  public post: IPostDetails;

  constructor(private fb: FormBuilder, 
    private postService: PostService, 
    private router: Router,
    private postDetailsService: PostDetailsService) { }

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
      
      this.postForm = this.fb.group({
        title: [
          this.post.title,
          {
            validators: [Validators.required],
            updateOn: 'blur',
          },
        ],
        textField: [
          this.post.text,
          {
            validators: [Validators.required],
            updateOn: 'blur' 
          }
        ]
      });
      
      console.log("<< Selected Post >>", this.post.date)
    });
    
    

  }

  getTitle(){return this.postForm.get('title').value;};
  getTextField(){return this.postForm.get('textField').value;};

  editPost(){
    const editPost: IPostEdit = {
      id: this.post.id,
      userId: JSON.parse(sessionStorage.getItem("userDetails")).id,
      title: this.getTitle(),
      text: this.getTextField(),
    }

    // console.log("<<  psotr component >>", JSON.parse(sessionStorage.getItem("userDetails")).id)
    // if you want http to fire, you must SUBSCRIBE
    this.postService.editPost(editPost).pipe(take(1), timeout(10000)).subscribe({
      next: (res: any) => {

        console.log("<< Edit Post Components >>", res, ConsoleColor.GREEN);
        if(res.message === true){
          // TODO: if the response is true, redirect client to their edited post
          this.router.navigate([AppRoutes.HOME]);
        }
      },
      error: (e) => {
        console.error(e);
      }
    });

    console.log("<< Edit post component >>", editPost, ConsoleColor.YELLOW);
  }

}
