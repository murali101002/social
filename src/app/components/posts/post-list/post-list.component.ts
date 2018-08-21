import { AuthService } from './../../../services/auth/auth.service';
import { PostService } from '../../../services/post/post.service';
import { Post } from '../post.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription[] = [];
  isAuthenticated: boolean;
  public isLoading = false;
  public userId: string;

  // pagination variables
  pageSize = 2;
  currPage = 1;
  pageSizeOptions = [2, 5, 10];
  length = 0;

  constructor(public postsService: PostService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.postsService.getPosts(this.pageSize, this.currPage);
    this.isLoading = false;
    this.postsSub.push(this.postsService.getPostUpdateListener()
      .subscribe((postsData: {posts: Post[], postsCount: number}) => {
        this.length = postsData.postsCount;
        this.userId = this.authService.getUserId();
        this.posts = postsData.posts;
      }));
    this.postsSub.push(this.authService.getAuthStatusListener().subscribe(response => {
      this.isAuthenticated = response;
    }));
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
    this.postsSub.map(sub => sub.unsubscribe());
  }
}
