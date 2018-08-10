import { PostService } from './../../../services/post/post.service';
import { Post } from './../post.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../../node_modules/rxjs';
import { PageEvent } from '../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  public isLoading = false;

  // pagination variables
  pageSize = 2;
  currPage = 1;
  pageSizeOptions = [2, 5, 10];
  length = 0;

  constructor(public postsService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.pageSize, this.currPage);
    this.isLoading = false;
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postsData: {posts: Post[], postsCount: number}) => {
        this.length = postsData.postsCount;
        this.posts = postsData.posts;
      });
  }

  onDelete(postId) {
    this.postsService.deletePost(postId).subscribe(() => this.postsService.getPosts(this.pageSize, this.currPage));
  }
  onChangedPage(pageData: PageEvent) {
    this.currPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.postsService.getPosts(this.pageSize, this.currPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
