import { Injectable } from '@angular/core';
import { RequestOptions, Http, Response, Headers } from '@angular/http';
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

    private handleError(error: Response) {
         console.error(error);
         return Observable.throw(error.json().error || 'Server error');
     }
}