import { Address } from './app.address';
import { Message } from './app.message';

export class AppUser {

    id : string;

    userName : string;

    password : string;

    fullName : string;

    email: string;

    address : Address;

    messages : Message[];

    sentMessages: Message[];

    likedIds : string [];

    askedQuestionIDs : string[];

    repliedAnswersIDs : string[];

    vouchedByUsers : AppUser[];

    loginTime : string;

    desiredTags : string[];

    desiredTopics : string[];

    followedTopics: string[];

    weight : any;

    vouchCount : any;

    constructor() {        
    }
    
}