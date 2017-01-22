import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app/app.constants';
import { Question } from '../models/app.question';
import { CategoryDto } from '../models/app.categorydto';
import { WordSearchDto } from '../models/app.wordsearchdto';

@Injectable()
export class QuestionServicev2{
    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

        this.actionUrl = _configuration.ServerWithApiUrl + "v2/";

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        //this.headers.append('Accept', 'application/json');
    }

    //SearchDTO call
    public searchByWord = (word: string): Observable<WordSearchDto[]> => {
        return this._http.get(this.actionUrl + 'topics/search/' + word, this.headers)
                .map((response: Response) => <WordSearchDto[]> response.json())
                .catch(this.handleError);
    }


    //list of questions asked by this user
    ///v2/question/user/{userId}
    public questionsAskedByUser = (userId: string): Observable<Question[]> =>{
        return this._http.get(this.actionUrl + 'question/user/' + userId, this.headers)
            .map((response: Response) => <Question[]> response.json())
            .catch(this.handleError);
    }

    //list of replied questions by user
    ///v2/question/answer/user/{userId}
    public questionsRepliedByUser = (userId: string): Observable<Question[]> =>{
        return this._http.get(this.actionUrl + 'question/answer/user/' + userId, this.headers)
            .map((response: Response) => <Question[]> response.json())
            .catch(this.handleError);
    }

    //list of all bookmarked questions by user
    ///v2/question/bookmarks/user/{userId}
    public bookmarkedByUser = (userId: string): Observable<Question[]> =>{
        return this._http.get(this.actionUrl + 'question/bookmarks/user/' + userId, this.headers)
            .map((response: Response) => <Question[]> response.json())
            .catch(this.handleError);
    }

    //list of liked questions by user
    //v2/questions/likes/userid/{userId}
    public getLikesByUser = (userId: string): Observable<Question[]>=> {
        return this._http.get(this.actionUrl + 'questions/likes/userid/' + userId, this.headers)
            .map((response: Response) => <Question[]> response.json())
            .catch(this.handleError);
    }

    //list of unanswered questions
    //question/unanswered/userid/
    public getUnansweredQuestions = (userId: string): Observable<any> =>{
        return this._http.get(this.actionUrl + 'question/unanswered/userid/' + userId, this.headers)
            .map((response: Response) => <any> response.json())
            .catch(this.handleError); 
    }

    //count of questions asked by user
    public countQuestionsByUserId = (userId: string): Observable<any> =>{
        return this._http.get(this.actionUrl + 'question/count/userid/' + userId, this.headers)
            .map((response: Response) => <any> response.json())
            .catch(this.handleError);
    }

    //count of answers replied by user
    public countAnswersByUserId = (userId: string): Observable<any> =>{
        return this._http.get(this.actionUrl + 'question/answer/count/userid/' + userId, this.headers)
            .map((response: Response) => <any> response.json())
            .catch(this.handleError);
    }


    public findAllTopicsTen = (): Observable<String[]> =>{
        return this._http.get(this.actionUrl + 'topics/ten', this.headers)
                .map((response: Response) => <String[]>response.json())
                .catch(this.handleError);
    }

    public findAllTopics = (): Observable<String[]> =>{
        return this._http.get(this.actionUrl + 'topics', this.headers)
                .map((response: Response) => <String[]>response.json())
                .catch(this.handleError);
    };

    public listTopTopicsByTopCategory = (): Observable<CategoryDto[]> => {
        return this._http.get(this.actionUrl + 'category', this.headers)
                .map((response: Response) => <CategoryDto[]> response.json())
                .catch(this.handleError);
    }

    public reportQuestion = (questionId: string): Observable<Question> =>{
        return this._http.get(this.actionUrl + 'question/' + questionId + '/report', this.headers)
                .map((response:Response) => <Question>response.json())
                .catch(this.handleError);
    }

    public listTopicsByCategory = (category: string): Observable<CategoryDto[]> =>{
        return this._http.get(this.actionUrl + 'category/' + category, this.headers)
                    .map((response: Response) => <CategoryDto[]>response.json())
                    .catch(this.handleError);
    }

    public getAllQuestions = (userId: string): Observable<Question[]> => {
        return this._http.get(this.actionUrl + 'question/userid/' + userId, this.headers)
                .map((response: Response) => <Question[]>response.json())
                .catch(this.handleError);
    }

    public getAllQuestionsByTopic = (topic: string, userId: string): Observable<Question[]> => {
        return this._http.get(this.actionUrl + 'question/topic/' + topic + "/userid/" + userId, this.headers)
                .map((response: Response) => <Question[]>response.json())
                .catch(this.handleError);
    }

    public getAllQuestionsByCategory = (category: string, userId: string): Observable<Question[]> => {
        return this._http.get(this.actionUrl + 'question/category/' + category + "/userid/" + userId, this.headers)
                .map((response: Response) => <Question[]>response.json())
                .catch(this.handleError);
    }

    public getOneById = (questionId: string): Observable<Question> =>{
        return this._http.get(this.actionUrl + 'question/' + questionId, this.headers)
                .map((response: Response) => <Question> response.json())
                .catch(this.handleError);
    }

    public postQuestion(askedQuestion : Question, userId: string): Observable<Question> {
        let bodyString = JSON.stringify(askedQuestion);
        let options = new RequestOptions({ headers: this.headers });

        return this._http.post(this.actionUrl + 'question/userid/' + userId, bodyString, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
    }

    private handleError(error: Response) {
         console.error(error);
         return Observable.throw(error.json().error || 'Server error');
     }
}