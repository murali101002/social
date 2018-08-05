import { Post } from './../post.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  // public postText = '';
  // public postTitle = '';

  private postId: string;
  public post: Post;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.postService.getPost(this.postId).subscribe(postData => {
        this.post = {id: postData._id, title: postData.title, content: postData.content};
      });
    } else {
      this.postId = null;
    }
  }
  createPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.postId) {
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    } else {
      this.postService.addPost(form.value.title, form.value.content);
    }
    form.resetForm();
  }

}
