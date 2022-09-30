import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routes';
import { IPost } from 'src/app/models/ipost';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) { }

  ngOnInit(): void {

    this.postForm = this.fb.group({
      title: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      textField: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur' 
        }
      ]
      });
  }

  getTitle(){return this.postForm.get('title').value;};
  getTextField(){return this.postForm.get('textField').value;};


  // TODO: need to fix the date so that it wont be undefined 
  submitPost(){
    const post: IPost = {
      userId: JSON.parse(sessionStorage.getItem("userDetails")).id,
      title: this.getTitle(),
      text: this.getTextField(),
      views: 0
    }

    // console.log("<<  psotr component >>", JSON.parse(sessionStorage.getItem("userDetails")).id)

    // if you want http to fire, you must SUBSCRIBE
    this.postService.createPost(post).subscribe({
      next: (res: any) => {

        console.log("<< post components >>", res);
        if(res === true){
          // if the response is true, redirect client to home component 
          // and add post into an array list?
          this.router.navigate([AppRoutes.HOME]);
        }
      },
      error: (e) => {
        console.error(e);
      }
    });

    console.log("<< post component >>", post);
  }
}
