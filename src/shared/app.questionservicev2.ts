import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app/app.constants';
import { Question } from '../models/app.question';

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