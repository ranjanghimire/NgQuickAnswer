import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { CategoryDto } from '../../models/app.categorydto';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { TopicQuestionsPage } from '../topic-questions/topic-questions';
import { CategoryService } from '../../shared/app.categoryservice';
import { CategoryQuestionsPage } from '../category-questions/category-questions';

@Component({
  selector: 'page-all-topics',
  templateUrl: 'all-topics.html'
})
export class AllTopicsPage {

  public myUserData: AppUser;
  public retTopics : String[];
  public categories: string[];
  public catDto: CategoryDto[];
  public retCatDto: CategoryDto[];
  public myCategory: string;

  constructor(public navCtrl: NavController, public _questionSeervicev2 : QuestionServicev2,
      public _catService: CategoryService) {
    this.myUserData = JSON.parse(localStorage.getItem("myUser"));  
    this.myCategory = 'All Categories';
    this.listTopTopicsByTopCategory();
    this.getAllCategories();
  }

  getAllCategories(): void{
         this._catService.getAllCategories()
            .subscribe((data:string[]) => this.categories= data,
            error => console.log(error),
            () => console.log('Loaded categories')
        );
     }

  public listTopTopicsByTopCategory(): void{
    this._questionSeervicev2.listTopTopicsByTopCategory()
        .subscribe((data:CategoryDto[]) => this.retCatDto = data, 
          error => console.log(error),
          () => console.log('listTopTopicsByTopCategory invoked!')
        );
  }

  goToTopicQuestions(topic: string) : void{
    this.navCtrl.push(TopicQuestionsPage, { topic: topic} );
  }

  onChange(){

    if(this.myCategory != "All Categories"){
      this.retTopics = [];
      this.retCatDto = [];
      this._questionSeervicev2.listTopicsByCategory(this.myCategory)
          .subscribe((data:CategoryDto[]) => this.catDto = data, 
          error => console.log(error),
          () => this.copyTopicsToRetTopics(this.catDto)
        );
    }
    else{
      this.retTopics = [];
      this.listTopTopicsByTopCategory();
    }   
  }

  copyTopicsToRetTopics(ctDto: CategoryDto[]){
    for (var ct of ctDto){
      for(var t of ct.topics){
        this.retTopics.push(t);
      }      
    }
  }

  goToCategoryQuestions(category: string): void{
    this.navCtrl.push(CategoryQuestionsPage, {category: category});
  }

}
