import { PostService } from './../../../services/post/post.service';
import { Post } from './../post.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [PostService]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private subscription: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit() {
    // this.postService.getUpdatedPostsAsObservable().subscribe(posts => console.log('posts', posts));
    this.posts = this.postService.getPosts();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
