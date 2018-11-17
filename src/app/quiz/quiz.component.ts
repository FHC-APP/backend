import { GlobalsService } from "./../globals.service";
import { Answer } from "./../../data/answer.interface";
import { Chapter } from "./../../data/chapter.interface";
import { Quizzes } from "./../../data/quizzes.interface";
import { QuizService } from "./../quiz.service";
/* tslint:disable */
import { Component, OnInit } from "@angular/core";

import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Quiz } from "data/quiz.interface";
@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit {
  quizLibForm: FormGroup;

  course = "";
  stage = "";
  subject = "";
  chapter = "";
  fa = "";

  //questions: Quiz[] = [];

  chaptersArray: Chapter[];

  stages = [];
  subjects = [];
  chapters = [];
  caStages = ["final", "intermediate", "foundation"];
  caFinalSubjects = [
    "direct tax",
    "indirect tax",
    "financial reporting",
    "strategic financial management",
    "advanced auditing and proffessional ethics",
    "corporate and economics law",
    "strategic cost management and performance evaluation",
    "risk management",
    "financial service and capital market",
    "international taxation",
    "economics laws",
    "global financial reporting standards",
    "multidisciplinary case study"
  ];
  caIntermediateSubjects = [
    "tax",
    "accounting",
    "coprate & other law",
    "cost and management accounting",
    "advanced accounting",
    "auditing and assurance",
    "enterprise information system and strategic management",
    "financial management and economics for finance"
  ];
  caFoundationSubjects = [
    "principles and practice of accounting",
    "Business Law and Business Correspondance and Reporting",
    'business mathematics and logical reasoning and statistics',
    'business economics and business and commercial knowledge'
  ];
  fas = ["fa2016", "fa2017", "fa2018"];
  chapterTypes = ["a", "b", "c"];
  csExecutiveSubjects = ["tax laws and practices"];
  csProfessionalSubjects = ["advanced tax laws and practices"];
  csStages = ["executive", "professional"];

  answerChoices = ["A", "B", "C", "D"];
  natures = ["application", "speed", "memory"];
  // Answers

  constructor(private _quiz: QuizService, private _globals: GlobalsService) {}

  ngOnInit() {
    this.quizLibForm = new FormGroup({
      quizLibData: new FormGroup({
        stage: new FormControl("ca", Validators.required),
        course: new FormControl("final", Validators.required),
        subject: new FormControl(null, Validators.required),
        fa: new FormControl(null, Validators.required),
        chapter: new FormControl(null, Validators.required),
        chapterType: new FormControl(null, Validators.required)
      }),
      quizzes: new FormGroup({
        //'quizId': new FormControl(null , Validators.required),
        quizTitle: new FormControl(null, Validators.required),
        quizHeading: new FormControl(null, Validators.required),
        nature: new FormControl(null, Validators.required),
        timeInMins: new FormControl(null, Validators.required)
      }),
      questions: new FormArray([
        new FormGroup({
          questionText: new FormControl(null, Validators.required),
          explanation: new FormControl(null, Validators.required),
          answerChoices: new FormControl(null, Validators.required),
          answerA: new FormControl(null, Validators.required),
          answerB: new FormControl(null, Validators.required),
          answerC: new FormControl(null),
          answerD: new FormControl(null)
        })
      ])
    });

    this.quizLibForm.get("quizLibData.course").valueChanges.subscribe(value => {
      console.log(value);
      this.subjects = [];
      if (value === "ca") {
        this.stages = this.caStages;
      } else if (value === "cs") {
        this.stages = this.csStages;
      }
    });

    this.quizLibForm.get("quizLibData.stage").valueChanges.subscribe(value => {
      console.log(value);
      if (value === "final") {
        this.subjects = this.caFinalSubjects;
      } else if (value === "intermediate") {
        this.subjects = this.caIntermediateSubjects;
      } else if (value === "executive") {
        this.subjects = this.csExecutiveSubjects;
      } else if (value === "professional") {
        this.subjects = this.csProfessionalSubjects;
      } else if (value === "foundation") {
        this.subjects = this.caFoundationSubjects;
      }
    });

    this.quizLibForm.statusChanges.subscribe(status => console.log(status));

    this.quizLibForm.patchValue({
      quizLibData: {
        course: "ca",
        stage: "final"
      }
    });
  }

  onSubmit() {
    // console.log(this.quizLibForm);
    console.log(this.quizLibForm.value.questions[0]);
    this.course = this.quizLibForm.value.quizLibData.course;
    this.stage = this.quizLibForm.value.quizLibData.stage;
    this.subject = this.quizLibForm.value.quizLibData.subject;
    this.fa = this.quizLibForm.value.quizLibData.fa;
    let chapterId: string = this.quizLibForm.value.quizLibData.chapter;
    let chapterType: string = this.quizLibForm.value.quizLibData.chapterType;

    let length = this.quizLibForm.value.questions.length;
    let questions: Quiz[] = [];
    //questions length
    for (let i = 0; i < length; i++) {
      let question: Quiz = {
        questionNumber: i + 1,
        question: this.quizLibForm.value.questions[i].questionText,
        answers: [],
        explanation: this.quizLibForm.value.questions[i].explanation,
        tested: ""
      };

      let answerA: Answer = {
        answerKey: "A",
        answerText: this.quizLibForm.value.questions[i].answerA,
        selected: false,
        correct: false
      };
      question.answers.push(answerA);

      let answerB: Answer = {
        answerKey: "B",
        answerText: this.quizLibForm.value.questions[i].answerB,
        selected: false,
        correct: false
      };
      question.answers.push(answerB);

      if (this.quizLibForm.value.questions[i].answerC) {
        let answerC: Answer = {
          answerKey: "C",
          answerText: this.quizLibForm.value.questions[i].answerC,
          selected: false,
          correct: false
        };
        question.answers.push(answerC);
      }

      if (this.quizLibForm.value.questions[i].answerD) {
        let answerD: Answer = {
          answerKey: "D",
          answerText: this.quizLibForm.value.questions[i].answerD,
          selected: false,
          correct: false
        };
        question.answers.push(answerD);
      }

      question.answers[
        +this.quizLibForm.value.questions[i].answerChoices
      ].correct = true;
      questions.push(question);
    }

    //Quiz Object
    let quiz: Quizzes = {
      quizId:
        this.course + "_" + chapterId.replace(/\s/g, "").toLowerCase() + "_",
      quizTitle: this.quizLibForm.value.quizzes.quizTitle,
      quizHeading: this.quizLibForm.value.quizzes.quizHeading,
      nature: this.quizLibForm.value.quizzes.nature,
      timeInMins: this.quizLibForm.value.quizzes.timeInMins,
      questions: questions
      //marks: ''
    };

    let quizzes: Quizzes[] = [];
    quizzes.push(quiz);
    let chapterEl: Chapter = {
      chapterId: chapterId,
      chapterType: chapterType,
      quiz: quizzes
    };

    let url = this.getUrl();

    this._quiz.loadQuiz(url).then(snapshot => {
      let faObj: { chapters: Chapter[] } = snapshot;
      if (snapshot === undefined || snapshot === null) {
        chapterEl.quiz[0].quizId = chapterEl.quiz[0].quizId + "0";
        let chaptersEl: Chapter[] = [];
        chaptersEl.push(chapterEl);
        faObj = {
          chapters: chaptersEl
        };
      } else {
        if (
          faObj.chapters.find((chapterElement: Chapter) => {
            return (
              chapterElement.chapterId.toLowerCase() === chapterId.toLowerCase()
            );
          })
        ) {
          //chapter exists
          const position = faObj.chapters.findIndex(
            (chapterElement: Chapter) => {
              return (
                chapterElement.chapterId.toLowerCase() ===
                chapterId.toLowerCase()
              );
            }
          );
          quiz.quizId = quiz.quizId + faObj.chapters[position].quiz.length;
          faObj.chapters[position].quiz.push(quiz);
        } else {
          chapterEl.quiz[0].quizId = chapterEl.quiz[0].quizId + "0";
          faObj.chapters.push(chapterEl);
        }
      }
      this._quiz.putChapter(url, faObj).then(snapshot => {
        this.quizLibForm.reset({});
        this.removeBlankQuestionFields();
      });
    });
  }

  getUrl() {
    let url = this._globals.base_quiz_url;
    if (this.course === "ca") {
      url = url + this._globals.ca_url;
      if (this.stage === "final") {
        url = url + this._globals.final_url;
        if (this.subject.toLowerCase() === "direct tax") {
          url = url + this._globals.dt_url;
        } else if (this.subject.toLowerCase() === "indirect tax") {
          url = url + this._globals.idt_url;
        }else if (this.subject.toLowerCase() === "financial reporting") {
          url = url + this._globals.final_fr;
        } else if (this.subject.toLowerCase() === "strategic financial management") {
          url = url + this._globals.final_sfm;
        }else if (this.subject.toLowerCase() === "advanced auditing and proffessional ethics") {
          url = url + this._globals.final_aaudit;
        }else if (this.subject.toLowerCase() === "corporate and economics law") {
          url = url + this._globals.final_celaw;
        }else if (this.subject.toLowerCase() === "strategic cost management and performance evaluation") {
          url = url + this._globals.final_scmpe;
        } else if (this.subject.toLowerCase() === "risk management") {
          url = url + this._globals.final_risk;
        }else if (this.subject.toLowerCase() === "financial service and capital market") {
          url = url + this._globals.final_fscm;
        }else if (this.subject.toLowerCase() === "international taxation") {
          url = url + this._globals.idt_url;
        }else if (this.subject.toLowerCase() === "economics laws") {
          url = url + this._globals.final_ecolaw;
        }else if (this.subject.toLowerCase() === "global financial reporting standards") {
          url = url + this._globals.final_gfrs;
        }else if (this.subject.toLowerCase() === "multidisciplinary case study") {
          url = url + this._globals.final_multi;
        }
      } else if (this.stage === "intermediate") {
        url = url + this._globals.intermediate_url;
        if (
          this.subject.toLowerCase() == "tax"
        ) {
          url = url + this._globals.tax_url;
        } else if (
          this.subject.toLowerCase() == "accounting"
        ) {
          url = url + this._globals.intermediate_acc;
        } else if (
          this.subject.toLowerCase() == "coprate & other law"
        ) {
          url = url + this._globals.intermediate_claw;
        } else if (
          this.subject.toLowerCase() == "cost and management accounting"
        ) {
          url = url + this._globals.intermediate_cmacc;
        }else if (
          this.subject.toLowerCase() == "advanced accounting"
        ) {
          url = url + this._globals.intermediate_aacc;
        }else if (
          this.subject.toLowerCase() == "auditing and assurance"
        ) {
          url = url + this._globals.intermediate_aass;
        }else if (
          this.subject.toLowerCase() == "enterprise information system and strategic management"
        ) {
          url = url + this._globals.intermediate_eisasm;
        }else if (
          this.subject.toLowerCase() == "financial management and economics for finance"
        ) {
          url = url + this._globals.intermediate_fmaecof;
        }
      } else if (this.stage === "foundation") {
        url = url + this._globals.foundation_url;
        if (
          this.subject.toLowerCase() == "principles and practice of accounting"
        ) {
          url = url + this._globals.foundation_papa;
        } else if (
          this.subject.toLowerCase() ==
          "business law and business correspondance and reporting"
        ) {
          url = url + this._globals.foundation_blaw;
        } else if (
          this.subject.toLowerCase() ==
          "business mathematics and logical reasoning and statistics"
        ) {
          url = url + this._globals.foundation_bmath;
        } else if (
          this.subject.toLowerCase() ==
          "business economics and business and commercial knowledge"
        ) {
          url = url + this._globals.foundation_beco;
        }
      }
    } else if (this.course === "cs") {
      url = url + this._globals.cs_url;
      if (this.stage === "executive") {
        url = url + this._globals.executive_url + this._globals.tlp_url;
      } else if (this.stage === "professional") {
        url = url + this._globals.foundation_url + this._globals.atlp_url;
      }
    }
    if (this.fa === "fa2016") {
      url = url + this._globals.fa16_url;
    } else if (this.fa === "fa2017") {
      url = url + this._globals.fa17_url;
    } else if (this.fa === "fa2018") {
      url = url + this._globals.fa18_url;
    }
    return url;
  }

  onAddQuestion() {
    let length = (<FormArray>this.quizLibForm.get("questions")).length;
    const question = new FormGroup({
      questionText: new FormControl(null, Validators.required),
      explanation: new FormControl(null, Validators.required),
      //'questionNumber': new FormControl(null, Validators.required),
      answerChoices: new FormControl(null, Validators.required),
      answerA: new FormControl(null, Validators.required),
      answerB: new FormControl(null, Validators.required),
      answerC: new FormControl(null),
      answerD: new FormControl(null)
    });
    (<FormArray>this.quizLibForm.get("questions")).push(question);
  }

  onDeleteOption() {
    const length = (<FormArray>this.quizLibForm.get("questions")).length;
    if (length > 1) {
      (<FormArray>this.quizLibForm.get("questions")).removeAt(length - 1);
      console.log(this.quizLibForm.value.questions.length);
    }
  }

  removeBlankQuestionFields() {
    let length = (<FormArray>this.quizLibForm.get("questions")).length;
    while (length > 1) {
      (<FormArray>this.quizLibForm.get("questions")).removeAt(length - 1);
      length--;
    }
  }
}
