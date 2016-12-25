import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Configuration } from '../../app/app.constants';
import { Question } from '../../models/app.question'; 
import { QuestionService } from '../../shared/app.questionservice';
import { AnswersToTheQuestionPage } from '../answers-to-the-question/answers-to-the-question';
import { AppUser } from '../../models/app.user';

/*
  Generated class for the TopicQuestions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-topic-questions',
  templateUrl: 'topic-questions.html'
})
export class TopicQuestionsPage {

  myTopic: string;
  public retIncQuestion : Question;
  private myUserData : AppUser;

  public retQuestions : Question[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _questionService: QuestionService,
            private _conf : Configuration) {
    this.myTopic = this.navParams.get("topic");
    this.getAllQuestionsByTopic(this.myTopic);
    this.myUserData = this._conf.myUser;
  }

  getAllQuestionsByTopic(topic: string): void{
    this._questionService
            .getAllQuestionsByTopic(topic)
            .subscribe((data:Question[]) => this.retQuestions = data,
                error => console.log(error),
                () => console.log('Loaded questions'));
  }

  ionViewDidLoad() {
    console.log('Hello TopicQuestionsPage Page');
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
      //TODO: invoke decrementVotes and toggle class.
      this.decrementVotes(question);
      return;
    }

    console.log("This question has " + question.votes + " votes.");

    question.liked = true;
    
    //TODO: Allow like only once. 
    //User shouldn't be able to like multiple times.
    //Also, server should know if a question has already been liked.

    ++question.votes;

    this.incrementLikesOfQuestion(question, this.myUserData.id);

  }

  private incrementLikesOfQuestion(question: Question, userId: string){
    this._questionService.incrementLikesOfQuestion(question, userId)
      .subscribe((data:Question) => this.retIncQuestion = data,
                error => console.log(error),
                () => console.log('Updated the question votes in server.'));
  }

}
