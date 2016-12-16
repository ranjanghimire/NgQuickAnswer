import { Answer } from './app.answer';
import { Author } from './app.author';
import { Address } from './app.address'

export class Question {

    id : string;

    mainQuestion : string;

    answers : Answer[];

    author : Author;

    weight : any;

    topic : string;

    tags : string[];

    isLocationSpecific : any;

    relevantLocations : Address[];

    hasVerifiedAnswer : any;

    hasAcceptedAnswer : any;

    constructor (){

    }
}