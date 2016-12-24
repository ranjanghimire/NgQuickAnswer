import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Configuration } from './app.constants';
import { DataService } from '../shared/app.dataservice';
import { QuestionService } from '../shared/app.questionservice';
import { QuestionServicev2 } from '../shared/app.questionservicev2';
import { AnswerService } from '../shared/app.answerservice';
import { UserInfoPage } from '../pages/user-info/user-info';
import  { NewQuestionPage} from '../pages/new-question/new-question';
import { QuestionPublishedPage } from '../pages/question-published/question-published';
import { AnswersToTheQuestionPage } from '../pages/answers-to-the-question/answers-to-the-question';
import { TopicQuestionsPage } from '../pages/topic-questions/topic-questions';
import { NewAnswerPage } from '../pages/new-answer-page/new-answer-page';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    UserInfoPage,
    NewQuestionPage,
    QuestionPublishedPage,
    AnswersToTheQuestionPage,
    TopicQuestionsPage,
    NewAnswerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    UserInfoPage,
    NewQuestionPage,
    QuestionPublishedPage,
    AnswersToTheQuestionPage,
    TopicQuestionsPage,
    NewAnswerPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Configuration, DataService, QuestionService, AnswerService, QuestionServicev2]
})
export class AppModule {}
