import { AppRoutingModule } from './../app-routing/app-routing.module';
import { PostListComponent } from './../components/posts/post-list/post-list.component';
import { PostCreateComponent } from './../components/posts/post-create/post-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [
    PostCreateComponent,
    PostListComponent
  ]
})
export class PostsModule { }
