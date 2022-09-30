import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/ipost';
import { IPostDetails } from 'src/app/models/ipost-details';
import { PostDetailsService } from 'src/app/services/post-details-service/post-details.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  public post: IPostDetails;

  constructor(private postDetailsService: PostDetailsService) { }

  ngOnInit(): void {

    // TODO: We are not getting line 32 when we get to this component
    // though after a refresh everything works.
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
    })

  }

}
