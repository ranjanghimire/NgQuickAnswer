import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app/app.constants';
import { Question } from '../models/app.question';

@Injectable()
export class QuestionServicev3{
    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

        this.actionUrl = _configuration.ServerWithApiUrl + "v2/";

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        //this.headers.append('Accept', 'application/json');
    }

    //list of questions asked by this user
    public pagedQuestionsAskedByUser = (userId: string, page: string, size: string): Observable<Question[]> =>{
        //console.log(this.actionUrl + 'question/userid/' + userId + '?page=' + page + '&size=' + size);
        return this._http.get(this.actionUrl + 'question/userid/' + userId + '?page=' + page + '&size=' + size, this.headers)
            .map((response: Response) => <Question[]> response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
         console.error(error);
         return Observable.throw(error.json().error || 'Server error');
     }


}