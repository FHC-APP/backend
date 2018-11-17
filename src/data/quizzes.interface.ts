import { Quiz } from './quiz.interface';
export interface Quizzes{
  quizId: any;
  quizTitle: any;
  quizHeading: any;
  questions: Quiz[];
  timeInMins: any;
  nature: any;
  marks?: any;
}
