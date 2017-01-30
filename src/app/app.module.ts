import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule  } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import {MomentModule} from 'angular2-moment';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Configuration } from './app.constants';
import { DataService } from '../shared/app.dataservice';
import { QuestionService } from '../shared/app.questionservice';
import { QuestionServicev2 } from '../shared/app.questionservicev2';
import { QuestionServicev3 } from '../shared/app.questionservicev3';
import { AnswerService } from '../shared/app.answerservice';
import { AnswerServicev2 } from '../shared/app.answerservicev2';
import { CategoryService } from '../shared/app.categoryservice';
import { UserInfoPage } from '../pages/user-info/user-info';
import  { NewQuestionPage} from '../pages/new-question/new-question';
import { QuestionPublishedPage } from '../pages/question-published/question-published';
import { AnswersToTheQuestionPage } from '../pages/answers-to-the-question/answers-to-the-question';
import { TopicQuestionsPage } from '../pages/topic-questions/topic-questions';
import { AllTopicsPage } from '../pages/all-topics/all-topics';
import { PopoverPage } from '../pages/popover/popover';
import { UserQuestionsPage} from '../pages/user-questions/user-questions';
import { UserAnswersPage } from '../pages/user-answers/user-answers';
import { MessagePage } from '../pages//message/message'; 
import { UnansweredQuestionsPage } from '../pages/unanswered-questions/unanswered-questions';
import { SearchPage } from '../pages/search/search';
import { UserLikesPage } from '../pages/user-likes/user-likes';
import { CategoryQuestionsPage } from '../pages/category-questions/category-questions';
import { ComposeMessagePage } from '../pages/compose-message/compose-message';
import { RegistrationPage } from '../pages/registration/registration';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { BookmarkedQuestionsPage } from '../pages/bookmarked-questions/bookmarked-questions';
import { NotificationPage } from '../pages/notification/notification';

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
    AllTopicsPage,
    PopoverPage,
    UserQuestionsPage,
    UserAnswersPage,
    UnansweredQuestionsPage,
    SearchPage,
    CategoryQuestionsPage, 
    ComposeMessagePage,
    MessagePage,
    UserLikesPage, 
    RegistrationPage, 
    ForgotPasswordPage, 
    BookmarkedQuestionsPage,
    NotificationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), 
    BrowserModule,
    MomentModule
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
    AllTopicsPage,
    PopoverPage,
    UserQuestionsPage,
    UserAnswersPage,
    UnansweredQuestionsPage,
    SearchPage,
    CategoryQuestionsPage, 
    ComposeMessagePage,
    MessagePage, 
    UserLikesPage, 
    RegistrationPage, 
    ForgotPasswordPage, 
    BookmarkedQuestionsPage,
    NotificationPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Configuration, DataService, 
                QuestionService, AnswerService, 
                QuestionServicev3, QuestionServicev2, AnswerServicev2, CategoryService, DatePipe]
})
export class AppModule {}
