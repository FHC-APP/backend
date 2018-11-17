import { NotificationsService } from './../notifications.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
 @ViewChild('f') quizForm: NgForm;
  defaultQuestion = 'teacher';
  answer = '';
  types = ['pdf', 'misc', 'news'];
  notification = {
    title: '',
    message: '',
    downloadLink: '',
    img: '',
    type: '',
    newsLink: ''
  };
  submitted = false;

  constructor(private _notify: NotificationsService){

  }
  onSubmit() {
    this.submitted = true;
    this.notification.title = this.quizForm.value.userData.title;
    this.notification.message = this.quizForm.value.userData.message;
    this.notification.downloadLink = this.quizForm.value.downloadLink;
    this.notification.img = this.quizForm.value.img;
    this.notification.type = this.quizForm.value.type;
    this.notification.newsLink = this.quizForm.value.newsLink;
    this._notify.createNotification(this.notification);
    this.quizForm.reset();
  }

}
