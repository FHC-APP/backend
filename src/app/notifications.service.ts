import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

@Injectable()
export class NotificationsService {

  public notificationRef:firebase.database.Reference;

  constructor() { }

    createNotification(notification): firebase.Promise<any> {
    return firebase.database()
      .ref('/posts').push({
      title: notification.title,
      message: notification.message,
      downloadLink: notification.downloadLink,
      img: notification.img,
      type: notification.type,
      newsLink: notification.newsLink,
      date: Date.now()
    });
  }

}
