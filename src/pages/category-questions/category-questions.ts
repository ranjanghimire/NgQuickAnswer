import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Configuration } from '../../app/app.constants';
import { Question } from '../../models/app.question'; 
import { QuestionService } from '../../shared/app.questionservice';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { UserInfoPage } from '../user-info/user-info';
import { AnswersToTheQuestionPage } from '../answers-to-the-question/answers-to-the-question';
import { TopicQuestionsPage } from '../topic-questions/topic-questions';
import { AppUser } from '../../models/app.user';

@Component({
  selector: 'page-category-questions',
  templateUrl: 'category-questions.html'
})
export class CategoryQuestionsPage {

  myCategory: string;
  public retIncQuestion : Question;
  private myUserData : AppUser;

  public retQuestions : Question[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _questionService: QuestionService,
            private _conf : Configuration, private _questionservicev2: QuestionServicev2) {
    this.myCategory = this.navParams.get("category");
    
    this.myUserData = this._conf.myUser;
    this.getAllQuestionsByCategory(this.myCategory, this.myUserData.id);
  }

  getAllQuestionsByCategory(topic: string, userId: string): void{
    this._questionservicev2
            .getAllQuestionsByCategory(topic, userId)
            .subscribe((data:Question[]) => this.retQuestions = data,
                error => console.log(error),
                () => console.log('Loaded questions'));
  }
  
  toggleAnswers(question : Question) : void{
    question.showAnswersinUI = !question.showAnswersinUI;
  }

  goToAnswersPage(question : Question) : void{
    this.navCtrl.push( AnswersToTheQuestionPage, { question : question });
  }

  extractFirstLetter(userName: string){
    return userName.charAt(0);
  }

  decrementVotes(question: Question): void{
    question.liked = false;
    --question.votes;
    //Name is increment but it works.
    this.incrementLikesOfQuestion(question, this.myUserData.id);
  }

  incrementVotes(question: Question) : void{

    if(question.liked){
      
      this.decrementVotes(question);
      return;
    }

    console.log("This question has " + question.votes + " votes.");

    question.liked = true;
   
    ++question.votes;

    this.incrementLikesOfQuestion(question, this.myUserData.id);

  }

  goToUserInfo(theUserId: string) : void{
    this.navCtrl.push( UserInfoPage, { myUserId : theUserId })
  }
  

  goToTopicQuestions(topic: string) : void{
    this.navCtrl.push(TopicQuestionsPage, { topic: topic} );
  }

  private incrementLikesOfQuestion(question: Question, userId: string){
    this._questionService.incrementLikesOfQuestion(question, userId)
      .subscribe((data:Question) => this.retIncQuestion = data,
                error => console.log(error),
                () => console.log('Updated the question votes in server.'));
  }

}
