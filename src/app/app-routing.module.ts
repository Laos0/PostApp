import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './views/errorViews/error/error.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/mains/home/home.component';
import { PostDetailsComponent } from './views/mains/post-details/post-details.component';
import { PostComponent } from './views/mains/post/post.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'post', component: PostComponent},
  {path: 'details', component: PostDetailsComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
