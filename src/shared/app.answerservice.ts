import { Injectable } from '@angular/core';
import { RequestOptions, Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app/app.constants';
import { Answer } from '../models/app.answer';
import { Question } from '../models/app.question';

@Injectable()
export class AnswerService{

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

        this.actionUrl = _configuration.ServerWithApiUrl;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        //this.headers.append('Accept', 'application/json');
    }

    public postAnswer(id: string, answer : Answer): Observable<Question> {
        let bodyString = JSON.stringify(answer);
        let options = new RequestOptions({ headers: this.headers });

        return this._http.post(this.actionUrl + 'question/' + id + '/answers', bodyString, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
    }
}