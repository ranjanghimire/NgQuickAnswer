
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from '../app/app.constants';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CategoryService{
    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

            this.actionUrl = _configuration.ServerWithApiUrl + "v1/";

            this.headers = new Headers();
            this.headers.append('Content-Type', 'application/json');
            //this.headers.append('Accept', 'application/json');
    }

    public getAllCategories = (): Observable<string[]> => {
        return this._http.get(this.actionUrl + "category", this.headers)
                .map((response: Response) => <string[]>response.json())
                .catch(this.handleError);
    }

    private handleError(error: Response) {
         console.error(error);
         return Observable.throw(error.json().error || 'Server error');
     }




}