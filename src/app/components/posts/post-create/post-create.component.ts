import { Post } from './../post.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { NgForm } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  public postText = '';
  public postTitle = '';

  constructor(private postService: PostService) { }

  ngOnInit() {

  }
  createPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

}
