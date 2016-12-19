import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { AppUser } from '../models/app.user'
import { Configuration } from '../app/app.constants';


@Injectable()
export class DataService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

        this.actionUrl = _configuration.ServerWithApiUrl + 'user';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public getAllUsers = (): Observable<AppUser[]> => {
        return this._http.get(this.actionUrl, this.headers)
                .map((response: Response) => <AppUser[]>response.json())
                .catch(this.handleError);
    }

    public findByUserNameAndPassword = (userName: string, password: string): Observable<AppUser> => {
        return this._http.get(this.actionUrl + "/" + userName + "/" + password, this.headers)
                .map((response: Response) => <AppUser>response.json())
                .catch(this.handleError);
    }


    // public GetAll = (): Observable<MyTypedItem[]> => {
    //     return this._http.get(this.actionUrl)
    //         .map((response: Response) => <MyTypedItem[]>response.json())
    //         .catch(this.handleError);
    // }

    // public GetSingle = (id: number): Observable<MyTypedItem> => {
    //     return this._http.get(this.actionUrl + id)
    //         .map((response: Response) => <MyTypedItem>response.json())
    //         .catch(this.handleError);
    // }

    // public Add = (itemName: string): Observable<MyTypedItem> => {
    //     let toAdd = JSON.stringify({ ItemName: itemName });

    //     return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
    //         .map((response: Response) => <MyTypedItem>response.json())
    //         .catch(this.handleError);
    // }

    // public Update = (id: number, itemToUpdate: MyTypedItem): Observable<MyTypedItem> => {
    //     return this._http.put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
    //         .map((response: Response) => <MyTypedItem>response.json())
    //         .catch(this.handleError);
    // }

    // public Delete = (id: number): Observable<Response> => {
    //     return this._http.delete(this.actionUrl + id)
    //         .catch(this.handleError);
    // }

    private handleError(error: Response) {
         console.error(error);
         return Observable.throw(error.json().error || 'Server error');
     }
}