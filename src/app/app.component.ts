import { Post } from './components/posts/post.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts: Post[] = [];
  onPostCreated(post) {
    this.storedPosts.push(post);
  }
}
