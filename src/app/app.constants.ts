import { Injectable } from '@angular/core';
import { AppUser } from '../models/app.user';

@Injectable()
export class Configuration {
    public Server: string = "http://localhost";
    public port : string = "8080"
    public ApiUrl: string = "/";
    public ServerWithApiUrl = this.Server + ':' + this.port + this.ApiUrl;

    public myUser : AppUser = { "id": "01ddg4244gdsg",
                      "userName": "rghimire",
                       "fullName": "Ranjan Ghimire",
                       "password": "",
                      "address": {
                          "id" : "sghsldgh4221",
                          "zipcode": "38002",  
                          "primaryAddress": "9350 Triumph Cir",
                          "secondaryAddress":"Apt 303",
                          "city": "Memphis",
                          "state":"TN",
                          "country":"USA"
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