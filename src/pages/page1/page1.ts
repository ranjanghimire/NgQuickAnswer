import { Component} from '@angular/core';

import { NavController } from 'ionic-angular';

import { QuestionService } from '../../shared/app.questionservice';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { Question } from '../../models/app.question';
import { AppUser } from '../../models/app.user';
import { UserInfoPage } from '../user-info/user-info';
import { Configuration } from '../../app/app.constants';
import { NewQuestionPage } from '../new-question/new-question';
import { AnswersToTheQuestionPage } from '../answers-to-the-question/answers-to-the-question';
import { TopicQuestionsPage } from '../topic-questions/topic-questions';
import { NewAnswerPage } from '../new-answer-page/new-answer-page';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

public retQuestions : Question[];

public retIncQuestion : Question;

private myUserData : AppUser;

private retTopics : String[];


  constructor(public navCtrl: NavController, private _questionService : QuestionService, private _conf : Configuration, private _questionSeervicev2 : QuestionServicev2) {
    this.myUserData = _conf.myUser;
    
  }

  ionViewDidEnter() {      
    this.getAllQuestions();
    this.findAllTopicsTen();
  }

  private findAllTopicsTen(): void{
    this._questionSeervicev2.findAllTopicsTen()
        .subscribe((data:String[]) => this.retTopics = data, 
          error => console.log(error),
          () => console.log('Loaded topics')
        );
  }

  private getAllQuestions() : void{
    this._questionSeervicev2
            .getAllQuestions(this.myUserData.id)
            .subscribe((data:Question[]) => this.retQuestions = data,
                error => console.log(error),
                () => console.log('Loaded questions'));
  }

  //incrementLikesOfQuestion
  private incrementLikesOfQuestion(question: Question, userId: string){
    this._questionService.incrementLikesOfQuestion(question, userId)
      .subscribe((data:Question) => this.retIncQuestion = data,
                error => console.log(error),
                () => console.log('Updated the question votes in server.'));
  }

  goToUserInfo() : void{
    this.navCtrl.push( UserInfoPage, { myUser : this.myUserData })
  }
  
  toggleAnswers(question : Question) : void{
    question.showAnswersinUI = !question.showAnswersinUI;
  }

  askNewQuestion() : void{
    this.navCtrl.push(NewQuestionPage);
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

  goToAnswersPage(question : Question) : void{
    this.navCtrl.push( AnswersToTheQuestionPage, { question : question });
  }

  goToTopicQuestions(topic: string) : void{
    this.navCtrl.push(TopicQuestionsPage, { topic: topic} );
  }

  goToNewAnswersPage(question: Question): void{
    console.log('invoked goToNewAnswersPage');
    this.navCtrl.push(NewAnswerPage, {question: question});
  }

  extractFirstLetter(userName: string){
    return userName.charAt(0);
  }

  goToAllTopicsPage(topic: string): void{
    //TODO: transfer to all topics page
  }


}
