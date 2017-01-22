import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Question } from '../../models/app.question'; 
import { QuestionService } from '../../shared/app.questionservice';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { DataService } from '../../shared/app.dataservice';
import { AnswersToTheQuestionPage } from '../answers-to-the-question/answers-to-the-question';
import { UserInfoPage } from '../user-info/user-info';
import { CategoryQuestionsPage } from '../category-questions/category-questions';
import { AppUser } from '../../models/app.user';
import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-topic-questions',
  templateUrl: 'topic-questions.html'
})
export class TopicQuestionsPage {

  iconName: string;// = "add-circle";

  myTopic: string;

  updateTopics: string[];
  public retIncQuestion : Question;
  private myUserData : AppUser;

  private retUser : AppUser;

  public retQuestions : Question[];

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, 
              public navParams: NavParams, private _questionService: QuestionService,
              private _dataService: DataService,
              private _questionservicev2: QuestionServicev2) {

    this.myTopic = this.navParams.get("topic");
    
    this.myUserData = JSON.parse(localStorage.getItem("myUser"));
    this.getAllQuestionsByTopic(this.myTopic, this.myUserData.id);
  }

  getAllQuestionsByTopic(topic: string, userId: string): void{
    this._questionservicev2
            .getAllQuestionsByTopic(topic, userId)
            .subscribe((data:Question[]) => this.retQuestions = data,
                error => console.log(error),
                () => {
                    console.log('flag inside: ' + this.retQuestions[0].followed);
                    if (this.retQuestions[0].followed == true){
                    this.iconName = "checkmark";
                    console.log('Loaded questions');
                  }
                  else{
                    this.iconName = "add-circle";
                    console.log('Loaded questions');
                  }
                });
  }

  presentPopover(myEvent, questionId: string) {
    let popover = this.popoverCtrl.create(PopoverPage, { qId: questionId });
    popover.present({
      ev: myEvent
    });
  }

  followTopic(): void{
    console.log('followTopic() invoked');
    this.toggleIconName();
  }

  toggleIconName(): void{
    
    switch(this.iconName){

      case "add-circle":
        this.iconName = "checkmark";
        this.updateFollowFlagInServer();
        break;
      default:
        this.iconName = "add-circle";
        this.removeFollowFlagInServer();

    }


  }

  //need listOfTopics, userId, followFlag  
  updateFollowFlagInServer(): void{
  
    this.updateTopics = [];
    this.updateTopics.push(this.myTopic);

    this._dataService.followTopics(this.myUserData.id, true, this.updateTopics)
        .subscribe((data:AppUser) => this.retUser = data, 
        error => console.log(error), 
        () => console.log('Updated the followTopics'));

  }

  removeFollowFlagInServer(): void{
    this.updateTopics = [];
    this.updateTopics.push(this.myTopic);


    this._dataService.followTopics(this.myUserData.id, false, this.updateTopics)
        .subscribe((data:AppUser) => this.retUser = data, 
        error => console.log(error), 
        () => console.log('Updated the followTopics'));
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

  goToUserInfo(theUserId: string) : void{
    this.navCtrl.push( UserInfoPage, { myUserId : theUserId })
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

  goToCategoryQuestions(category: string): void{   
    this.navCtrl.push(CategoryQuestionsPage, {category: category});
  }


  private incrementLikesOfQuestion(question: Question, userId: string){
    this._questionService.incrementLikesOfQuestion(question, userId)
      .subscribe((data:Question) => this.retIncQuestion = data,
                error => console.log(error),
                () => console.log('Updated the question votes in server.'));
  }

}
