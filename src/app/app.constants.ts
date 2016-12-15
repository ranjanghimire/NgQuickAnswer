import { Injectable } from '@angular/core';
import { AppUser } from '../models/app.user';

@Injectable()
export class Configuration {
    public Server: string = "http://localhost";
    public port : string = "8080"
    public ApiUrl: string = "/";
    public ServerWithApiUrl = this.Server + ':' + this.port + this.ApiUrl;

    public myUser : AppUser = { "id": "",
                      "userName": "rghimire",
                       "fullName": "Ranjan Ghimire",
                      "address": {
                          "id" : "",
                          "zipcode": "",  
                          "primaryAddress": "",
                          "secondaryAddress":"",
                          "city": "",
                          "state":"",
                          "country":""
                      },
                      "askedQuestionIDs": [""],
                      "repliedAnswersIDs":[""],
                      "vouchedByUsers":[],
                      "loginTime":"",
                      "desiredTags": [""],
                      "desiredTopics":[""],
                      "weight":"50",
                      vouchCount:"250"                      
                   };

}