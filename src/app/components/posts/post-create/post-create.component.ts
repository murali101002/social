import { PostService } from './../../../services/post/post.service';
import { Post } from './../post.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  providers: [PostService]
})
export class PostCreateComponent implements OnInit {

  public postText = '';
  public postTitle = '';

  constructor(private postService: PostService) { }

  ngOnInit() {

  }
  createPost(form) {
    if (form.invalid) {
      return;
    }
    const post: Post = {title: form.value.title, content: form.value.content};
    this.postService.addPost(post);
    // form.reset();
  }

}
