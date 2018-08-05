import { Post } from "./../../components/posts/post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http
      .get<any>("http://localhost:3000/api/posts")
      .pipe(
        map(postsData => {
          return postsData.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(postsData => {
        this.posts = postsData;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<string>("http://localhost:3000/api/posts", post)
      .subscribe(postId => {
        post.id = postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId) {
    this.http
      .delete(`http://localhost:3000/api/posts/${postId}`)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== postId);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
