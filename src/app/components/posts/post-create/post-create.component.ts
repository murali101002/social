import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  public postText = '';
  public postTitle = '';

  @Output() createdPost = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }
  createPost() {
    const post = {title: this.postTitle, content: this.postText};
    this.createdPost.emit(post);
    this.postText = '';
    this.postTitle = '';
  }

}
