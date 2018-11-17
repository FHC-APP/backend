import { QuizService } from './quiz.service';

import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal = '';
  item: any;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private _quiz: QuizService) {
    //this.item = null;
  }

  ngOnInit() {
    // this._quiz.loadQuiz('/quiz-lib2').then(quizSnap => {
    //   this.item = quizSnap;
    //   console.log(this.item);
    // });
  }
}
