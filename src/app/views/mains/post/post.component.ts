import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPost } from 'src/app/models/ipost';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) { }

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


  submitPost(){
    const post: IPost = {
      userId: JSON.parse(sessionStorage.getItem("userDetails")).id,
      title: this.getTitle(),
      text: this.getTextField(),
      views: 0
    }

    console.log("<<  psotr component >>", JSON.parse(sessionStorage.getItem("userDetails")).userId)

    // if you want http to fire, you must SUBSCRIBE
    this.postService.createPost(post).subscribe({
      next: (res: IPost) => {

        console.log("<< post component >>", res);
      },
      error: (e) => {
        console.error(e);
      }
    });

    console.log("<< post component >>", post);
  }
}
