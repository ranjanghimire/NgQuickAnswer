import { Injectable } from '@angular/core';
import { RequestOptions, Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { AppUser } from '../models/app.user';
import { Notification } from '../models/app.notification';
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

    
    //Get all notifications
    ///user/notification/{userId}
    public getNotifications = (userId: string): Observable<Notification[]> =>{
        return this._http.get(this.actionUrl + "/notification/" + userId, this.headers)
                    .map((response: Response) => <Notification[]> response.json())
                    .catch(this.handleError);
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

    public findUserById = (id: string): Observable<AppUser> => {
        return this._http.get(this.actionUrl + "/userId/" + id, this.headers)
                .map((response: Response) => <AppUser>response.json())
                .catch(this.handleError);
    }

    ///user/{username}/{password}
    //Update user's password by username
    public updatePassword = (username: string, password: string): Observable<AppUser> => {
        let bodyString = JSON.stringify("");
        let options = new RequestOptions({headers: this.headers});

        return this._http.put(this.actionUrl + '/' + username + '/' + password, bodyString, options)
                .map((res: Response) => <AppUser>res.json())
                .catch(this.handleError);
    }

    //update followFlag 
    ///user/userid/{userId}/follow/{flag}
    public followTopics = (userId: string, flag: boolean, updateTopics: string[]): Observable<AppUser> => {
        let bodyString = JSON.stringify(updateTopics);
        let options = new RequestOptions({headers: this.headers});

        return this._http.put(this.actionUrl + "/userid/" + userId + "/follow/" + flag, bodyString, options)
                .map((res: Response) => <AppUser>res.json())
                .catch(this.handleError);
    }

    //updateBookmark
    ///user/userid/{userId}/questionid/{questionId}/bookmark/{flag}
    public updateBookmark = (userId: string, questionId: string, flag: boolean): Observable<AppUser> => {
        let bodyString = "";
        let options = new RequestOptions({headers: this.headers});

        return this._http.put(this.actionUrl + "/userid/" + userId 
                    + "/questionid/" + questionId + "/bookmark/" + flag, bodyString, options)
                    .map((res: Response) => <AppUser>res.json())
                .catch(this.handleError);
    }

    public updateUserById = (id: string, updateUser: AppUser): Observable<AppUser> => {
        let bodyString = JSON.stringify(updateUser);
        let options = new RequestOptions({headers: this.headers});

        return this._http.put(this.actionUrl + "/" + id, bodyString,  options)
                .map((res: Response) => <AppUser>res.json())
                .catch(this.handleError);
    }

    //Update Read flag to true for all messages
    ///user/userid/{id}/messageread/{flag}
    public updateReadFlagInMessages = (userId: string): Observable<AppUser> =>{
        let bodyString = "";
        let options = new RequestOptions({headers: this.headers});

        return this._http.put(this.actionUrl + '/userid/' + userId + '/messageread/true', bodyString, options )
                    .map((res: Response) => <AppUser>res.json())
                .catch(this.handleError);
    }

    //register user
    public registerUser = (appUser: AppUser): Observable<AppUser> => {
        let bodyString = JSON.stringify(appUser);
        let options = new RequestOptions({ headers: this.headers });

        return this._http.post(this.actionUrl, bodyString, options)
            .map((res:Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
         console.error(error);
         return Observable.throw(error.json().error || 'Server error');
     }
}