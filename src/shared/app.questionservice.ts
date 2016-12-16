import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app/app.constants';
import { Question } from '../models/app.question'

@Injectable()
export class QuestionService{

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

        this.actionUrl = _configuration.ServerWithApiUrl + 'question';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public getAllQuestions = (): Observable<Question[]> => {
        return this._http.get(this.actionUrl, this.headers)
                .map((response: Response) => <Question[]>response.json())
                .catch(this.handleError);
    }

    private handleError(error: Response) {
         console.error(error);
         return Observable.throw(error.json().error || 'Server error');
     }

}
