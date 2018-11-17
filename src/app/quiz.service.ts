import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

@Injectable()
export class QuizService {
  quizLib: any;
  constructor() {

  }

  loadQuiz(url): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref(url).on('value', snapshot => {
          resolve(snapshot.val());
        });
    });
  }

  putChapter(url, quiz): firebase.Promise<any> {
    return firebase.database()
      .ref(url)
      .set(quiz);
  }

}
