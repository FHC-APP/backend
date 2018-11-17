import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

@Injectable()
export class VideoService {

  data: any;

  constructor() {
    this.data = null;
   }

  loadVideos(url: string): Promise<any> {

    return new Promise((resolve, reject) => {
      firebase.database()
        .ref(url).on('value', snapshot => {
          resolve(snapshot.val());
        });
    });
  }

  putFullVideoSet(url, video): firebase.Promise<any> {
    return firebase.database()
      .ref(url)
      .set(video);
  }

}
