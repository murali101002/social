import { Post } from '../post.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { mimeType } from '../../../shared/mime-type.validator';

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
  public imagePreview: string;

  form: FormGroup;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'content': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.isLoading = true;
      this.postService.getPost(this.postId).subscribe(postData => {
        this.isLoading = false;
        this.post = {id: postData._id, title: postData.title, content: postData.content, imagePath: postData.imagePath, creator: null};
        this.form.setValue({'title': this.post.title, 'content': this.post.content, 'image': this.post.imagePath});
      });
    } else {
      this.postId = null;
    }
  }
  onFileInputChanged(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({'image': file});
    this.form.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.postId) {
      this.isLoading = false;
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.isLoading = false;
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    }
    this.form.reset();
  }

}
