import { Author } from './app.author'

export class Answer {

    id : string;

    mainAnswer : string;

    author : Author;

    liked: boolean;

    weight : any;

    isMarkedForAcceptance : any;

    isVerifiedAnswer : any;

    constructor(){

    }
}