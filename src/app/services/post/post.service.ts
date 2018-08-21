import { environment } from './../../../environments/environment';
import { Post } from "../../components/posts/post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postsCount: number }>();
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(pageSize, currPage) {
    const queryParams = `?pagesize=${pageSize}&page=${currPage}`;
    return this.http
      .get<{ posts: any; postsCount: number }>(
        `${this.baseUrl}/posts` + queryParams
      )
      .pipe(
        map(postsData => {
          return {
            posts: postsData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            postsCount: postsData.postsCount
          };
        })
      )
      .subscribe(postsData => {
        this.posts = postsData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postsCount: postsData.postsCount
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<string>(`${this.baseUrl}/posts`, postData)
      .subscribe(postId => {
        // const post = {id: postId, title: title, content: content, imagePath: null};
        // post.id = postId;
        // this.posts.push(post);
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  getPost(postId: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(`${this.baseUrl}/posts/${postId}`);
  }

  updatePost(
    postId: string,
    title: string,
    content: string,
    image: File | string
  ) {
    let postData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", postId);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: postId,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      };
    }
    // const post: Post = {id: postId, title: title, content: content};
    this.http
      .put(`${this.baseUrl}/posts/${postId}`, postData)
      .subscribe(() => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId) {
    return this.http.delete(`${this.baseUrl}/posts/${postId}`);
  }
}
