import { AuthGaurdGuard } from './../gaurds/auth-gaurd.guard';
import { LoginComponent } from '../components/auth/login/login.component';
import { PostCreateComponent } from '../components/posts/post-create/post-create.component';
import { PostListComponent } from '../components/posts/post-list/post-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SingnUpComponent } from '../components/auth/singn-up/singn-up.component';


const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create', component: PostCreateComponent, canActivate: [AuthGaurdGuard]},
  {path: 'edit/:id', component: PostCreateComponent, canActivate: [AuthGaurdGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SingnUpComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})


export class AppRoutingModule { }
