import { Address } from './app.address';

export class AppUser {

    id : string;

    userName : string;

    password : string;

    fullName : string;

    address : Address;

    askedQuestionIDs : string[];

    repliedAnswersIDs : string[];

    vouchedByUsers : AppUser[];

    loginTime : string;

    desiredTags : string[];

    desiredTopics : string[];

    weight : any;

    vouchCount : any;

    constructor() {        
    }
    
}