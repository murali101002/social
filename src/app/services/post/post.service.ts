import { Post } from './../../components/posts/post.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor() { }

  getPosts() {
    return this.posts;
  }
  getUpdatedPostsAsObservable(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }
  addPost(post: Post) {
    this.posts.push(post);
    console.log([...this.posts]);
    this.postsUpdated.next([...this.posts]);
    console.log(this.postsUpdated.subscribe(data => console.log(data)));
  }
}
