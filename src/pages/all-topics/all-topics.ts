import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Configuration } from '../../app/app.constants';
import { AppUser } from '../../models/app.user';
import { CategoryDto } from '../../models/app.categorydto';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { TopicQuestionsPage } from '../topic-questions/topic-questions';

/*
  Generated class for the AllTopics page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-all-topics',
  templateUrl: 'all-topics.html'
})
export class AllTopicsPage {

  private myUserData: AppUser;
  private retTopics : String[];
  private categories: string[];
  private catDto: CategoryDto[];
  private myCategory: string;

  constructor(public navCtrl: NavController, private _conf : Configuration, private _questionSeervicev2 : QuestionServicev2) {
    this.myUserData = _conf.myUser;
    this.categories = _conf.categories;
    this.findAllTopics();
  }

  private findAllTopics(): void{
    this._questionSeervicev2.findAllTopics()
        .subscribe((data:String[]) => this.retTopics = data, 
          error => console.log(error),
          () => console.log('Loaded topics')
        );
  }

  goToTopicQuestions(topic: string) : void{
    this.navCtrl.push(TopicQuestionsPage, { topic: topic} );
  }

  onChange(){

    if(this.myCategory != "All Categories"){
      this.retTopics = [];
      this._questionSeervicev2.listTopicsByCategory(this.myCategory)
          .subscribe((data:CategoryDto[]) => this.catDto = data, 
          error => console.log(error),
          () => this.copyTopicsToRetTopics(this.catDto)
        );
    }
    else{
      this.findAllTopics();
    }   
  }

  copyTopicsToRetTopics(ctDto: CategoryDto[]){
    for (var ct of ctDto){
      for(var t of ct.topics){
        this.retTopics.push(t);
      }      
    }
  }

}
