import { Post } from './../post.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  public postText = '';
  public postTitle = '';

  @Output() createdPost = new EventEmitter<Post>();

  constructor() { }

  ngOnInit() {

  }
  createPost(form) {
    if (form.invalid) {
      return;
    }
    const post: Post = {title: form.value.title, content: form.value.content};
    this.createdPost.emit(post);
    form.reset();
  }

}
