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
  public isLoading = false;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.isLoading = true;
      this.postService.getPost(this.postId).subscribe(postData => {
        this.isLoading = false;
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
    this.isLoading = true;
    if (this.postId) {
      this.isLoading = false;
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    } else {
      this.isLoading = false;
      this.postService.addPost(form.value.title, form.value.content);
    }
    form.resetForm();
  }

}
