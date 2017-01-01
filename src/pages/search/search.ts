import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { WordSearchDto } from '../../models/app.wordsearchdto';
import { Question } from '../../models/app.question';
import { AnswersToTheQuestionPage } from '../answers-to-the-question/answers-to-the-question';
import { TopicQuestionsPage } from '../topic-questions/topic-questions';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private retWordSearchDto: WordSearchDto[];

  private actQuestion: Question;

  private myInput: string;

  private shouldShowCancel: boolean;

  private topics: string[] = [];

  private categories: string[] = [];
  
  private mainQuestions: WordSearchDto[] = [];

  constructor(public navCtrl: NavController, private _questionServicev2: QuestionServicev2) {}
  
  private searchByWord(word: string): void{
    this._questionServicev2.searchByWord(word)
        .subscribe((data:WordSearchDto[]) => this.retWordSearchDto = data, 
          error => console.log(error),
          () => this.populateVariables(word)
        );
  }

  populateVariables(word: string): void{
    this.retWordSearchDto.forEach(question => {
      if(question.topic != null && question.topic.toLowerCase().includes(word.toLowerCase())){        
        this.topics.push(question.topic);
      }
      if(question.category != null && question.category.toLowerCase().includes(word.toLowerCase())){
        this.categories.push(question.category);
      }

      this.topics = this.topics.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
      });

      this.categories = this.categories.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
      });

      if(question.mainQuestion != null && question.mainQuestion.toLowerCase().includes(word.toLowerCase())){
        this.mainQuestions.push(question);
      }

    })
  }

  onInput(value): void{
    if(value.length > 0){
      this.topics = [];
      this.categories = [];
      this.mainQuestions = [];
      console.log('onInput() invoked. Value is: ' + value);
      this.searchByWord(value);
    }
  }

  onClear(value): void{
    console.log('onClear() invoked. Value is: ' + value);
    this.topics = [];
    this.categories = [];
    this.mainQuestions = [];
  }

  retrieveFullQuestionAndGoToAnswers(questionId: string){
    //Retrieve full question from id. Then pass to Answers to the question page
    console.log('retrieveFullQuestion invoked');

    this._questionServicev2.getOneById(questionId)
        .subscribe((data:Question) => this.actQuestion = data, 
          error => console.log(error),
          () => this.goToAnswersPage(this.actQuestion)
        );
  }

  goToAnswersPage(question : Question) : void{
    this.navCtrl.push( AnswersToTheQuestionPage, { question : question });
  }

  goToTopicQuestions(topic: string) : void{
    this.navCtrl.push(TopicQuestionsPage, { topic: topic} );
  }

}