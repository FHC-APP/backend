import { Video } from './../../data/video.interface';
import { Videos } from './../../data/videos.interface';
import { VideoService } from './../video.service';
import { GlobalsService } from './../globals.service';
import { Component, OnInit } from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videoLibForm: FormGroup;


  course = '';
  stage = '';
  subject = '';
  type = '';


  stages = [];
  subjects = [];
  sets = [];
  caStages = ['final', 'intermediate'];
  caFinalSubjects = ['direct tax', 'indirect tax'];
  caIntermediateSubjects = ['tax'];
  types = ['general', 'ammendments', 'case laws'];
  csExecutiveSubjects = ['tax laws and practices'];
  csProfessionalSubjects = ['advanced tax laws and practices'];
  csStages = ['executive', 'professional'];
  icons = ['american-football', 'alarm', 'analytics', 'baseball', 'basket',
    'beer', 'bicycle', 'boat', 'body', 'bonfire', 'book', 'bowtie',
    'brush', 'bulb', 'bus', 'cafe', 'calculator', 'car', 'cloudy-night',
    'flask', 'flower', 'football', 'glasses', 'happy', 'ice-cream', 'ionitron',
    'key', 'leaf', 'microphone', 'musical-note', 'nutrition', 'partly-sunny',
    'paper-plane', 'paw', 'pizza', 'planet', 'rainy', 'rose', 'thermometer',
    'train', 'trophy', 'umbrella', 'wine'];

  constructor(private _video: VideoService, private _globals: GlobalsService) {
  }

  ngOnInit() {
    this.videoLibForm = new FormGroup({
      'videoLibData': new FormGroup({
        'stage': new FormControl('ca', Validators.required),
        'course': new FormControl('final', Validators.required),
        'subject': new FormControl(null, Validators.required),
        'type': new FormControl(null, Validators.required),
        'setId': new FormControl(null, Validators.required),
      }),

      'videos': new FormArray([new FormGroup({
        'text': new FormControl(null, Validators.required),
        'url': new FormControl(null, Validators.required),
      })])
    });


    this.videoLibForm.get('videoLibData.course').valueChanges.subscribe((value) => {
      console.log(value);
      this.subjects = [];
      if (value === 'ca') {
        this.stages = this.caStages;
      } else if (value === 'cs') {
        this.stages = this.csStages;
      }
    });

    this.videoLibForm.get('videoLibData.stage').valueChanges.subscribe((value) => {
      console.log(value);
      if (value === 'final') {
        this.subjects = this.caFinalSubjects;
      } else if (value === 'intermediate') {
        this.subjects = this.caIntermediateSubjects;
      } else if (value === 'executive') {
        this.subjects = this.csExecutiveSubjects;
      } else if (value === 'professional') {
        this.subjects = this.csProfessionalSubjects;
      }
    });


    // this.videoLibForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // );

    this.videoLibForm.patchValue({
      'videoLibData': {
        'course': 'ca',
        'stage': 'final'

      }
    });
  }


  onSubmit() {
    // console.log(this.videoLibForm);
    console.log(this.videoLibForm.value.videos);
    this.course = this.videoLibForm.value.videoLibData.course;
    this.stage = this.videoLibForm.value.videoLibData.stage;
    this.subject = this.videoLibForm.value.videoLibData.subject;
    this.type = this.videoLibForm.value.videoLibData.type;
    const setId: string = this.videoLibForm.value.videoLibData.setId;

    const length = this.videoLibForm.value.videos.length;
    const videoList: Video[] = [];

    for (let i = 0; i < length; i++) {
      const videoObj: Video = {
        id: this.type + '_' + (setId.replace(/\s/g, '')).toLowerCase() + '_' + i,
        text: this.videoLibForm.value.videos[i].text,
        url: this.videoLibForm.value.videos[i].url
      };
      videoList.push(videoObj);
    }

    const videoSet: Videos = {
      setId: setId,
      videos: videoList,
      icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    };

    const url = this.getUrl();
    console.log(url);

    this._video.loadVideos(url).then(snapshot => {
      let sets: Videos[]  = [];
       console.log(snapshot);
      if (snapshot === undefined || snapshot == null) { //there are no set for type //no url, since no sets
        const setsEl: Videos[] = [];
        setsEl.push(videoSet);
          sets = setsEl;

      } else {
        sets = snapshot.sets;
        //if sets object exists, add quiz to its videosSet array, and if chapter exists ==> atleast one quiz also exists

        //finf if chapter with same id exists, if it does then find index of chapter
        //and push quiz to the chapter
        //if it does not exist then push entire new chapter to object

        if (sets.find((setElement: Videos) => {
          return setElement.setId.toLowerCase() === setId.toLowerCase();
        })) {//particular set already exists on that type
          const position = sets.findIndex((setElement: Videos) => {
            return setElement.setId.toLowerCase() === setId.toLowerCase();
          });
          sets[position].videos.push(...videoList);
        } else { // particular set does not exist, but atleast one set exists
          sets.push(videoSet);
        }
      }

      const dbVideo = {
        sets: sets
      };
      this._video.putFullVideoSet(url, dbVideo).then(snapshot => {
        this.videoLibForm.reset({});
        this.removeBlankVideoFields();
      });
    });

  }

  getUrl() {
    let url = this._globals.base_video_url;
    if (this.course === 'ca') {
      url = url + this._globals.ca_url;
      if (this.stage === 'final') {
        url = url + this._globals.final_url;
        if (this.subject.toLowerCase() === 'direct tax') {
          url = url + this._globals.dt_url;
        } else if (this.subject.toLowerCase() === 'indirect tax') {
          url = url + this._globals.idt_url;
        }
      } else if (this.stage === 'intermediate') {
        url = url + this._globals.intermediate_url + this._globals.tax_url;
      }
    } else if (this.course === 'cs') {
      url = url + this._globals.cs_url;
      if (this.stage === 'executive') {
        url = url + this._globals.executive_url + this._globals.tlp_url;
      } else if (this.stage === 'professional') {
        url = url + this._globals.professional_url + this._globals.atlp_url;
      }
    }
    if (this.type === 'general') {
      url = url + this._globals.general_url;
    } else if (this.type === 'ammendments') {
      url = url + this._globals.ammendments_url;
    } else if (this.type === 'case laws') {
      url = url + this._globals.case_laws_url;
    }
    return url;


  }

  onAddVideo() {
    const length = (<FormArray>this.videoLibForm.get('videos')).length;
    const video = new FormGroup({
      'text': new FormControl(null, Validators.required),
      'url': new FormControl(null, Validators.required),
    });
    (<FormArray>this.videoLibForm.get('videos')).push(video);
  }

  onDeleteOption() {
    const length = (<FormArray>this.videoLibForm.get('videos')).length;
    if (length > 1) {
      (<FormArray>this.videoLibForm.get('videos')).removeAt(length - 1);
      console.log((this.videoLibForm.value.videos.length));
    }

  }

  removeBlankVideoFields() {
    let length = (<FormArray>this.videoLibForm.get('videos')).length;
    while (length > 1) {
      (<FormArray>this.videoLibForm.get('videos')).removeAt(length - 1);
      length--;
    }
  }

}




