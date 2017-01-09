import { Author } from './app.author'

export class Answer {

    answerId : string;

    mainAnswer : string;

    author : Author;

    toUser: string;

    votes : any;

    liked: boolean;

    weight : any;

    isMarkedForAcceptance : any;

    isVerifiedAnswer : any;

    constructor(){

    }
}