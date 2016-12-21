import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Configuration } from './app.constants';
import { DataService } from '../shared/app.dataservice';
import { QuestionService } from '../shared/app.questionservice';
import { UserInfoPage } from '../pages/user-info/user-info';
import  { NewQuestionPage} from '../pages/new-question/new-question';
import { QuestionPublishedPage } from '../pages/question-published/question-published'
import { AnswersToTheQuestionPage } from '../pages/answers-to-the-question/answers-to-the-question'

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    UserInfoPage,
    NewQuestionPage,
    QuestionPublishedPage,
    AnswersToTheQuestionPage
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
    AnswersToTheQuestionPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Configuration, DataService, QuestionService]
})
export class AppModule {}
