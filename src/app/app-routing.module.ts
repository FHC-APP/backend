import { AuthGuard } from './auth/auth-guard.service';
import { SigninComponent } from './auth/signin/signin.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { VideosComponent } from './videos/videos.component';
import { QuizComponent } from './quiz/quiz.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
  {path: '', redirectTo: '/quiz', pathMatch: 'full'},
  {path: 'quiz', component: QuizComponent, canActivate: [AuthGuard]},
  {path: 'video', component: VideosComponent, canActivate: [AuthGuard]},
  {path: 'notification', component: NotificationsComponent, canActivate: [AuthGuard]},
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
