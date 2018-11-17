import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { SigninComponent } from './auth/signin/signin.component';
import { NotificationsService } from './notifications.service';
import { VideoService } from './video.service';
import { GlobalsService } from './globals.service';
import { QuizService } from './quiz.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { QuizComponent } from './quiz/quiz.component';

import { Route, Routes, RouterModule } from '@angular/router';

/* For Firebase Related */
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import 'firebase';
import { VideosComponent } from './videos/videos.component';
import { NotificationsComponent } from './notifications/notifications.component';


const appRoutes: Routes = [
  {path: '', component: QuizComponent}
];

 export const firebaseConfig = {
    apiKey: 'AIzaSyAutL08qJ8hTPM2860x-LHEAnDmgDEObRA',
    authDomain: 'fhc-ionic-app.firebaseapp.com',
    databaseURL: 'https://fhc-ionic-app.firebaseio.com',
    projectId: 'fhc-ionic-app',
    storageBucket: 'fhc-ionic-app.appspot.com',
    messagingSenderId: '928506390872'

  };
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuizComponent,
    VideosComponent,
    NotificationsComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    QuizService,
    GlobalsService,
    VideoService,
    NotificationsService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
