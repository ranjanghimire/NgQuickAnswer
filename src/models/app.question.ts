import { Answer } from './app.answer';
import { Author } from './app.author';
import { Address } from './app.address'

export class Question {

    id : string;

    mainQuestion : string;

    answers : Answer[];

    author : Author;

    weight : any;

    votes : any;

    liked: boolean;

    bookmarked: boolean;

    followed: boolean;

    topic : string;

    category : string;

    tags : string[];

    showAnswersinUI : boolean;

    isLocationSpecific : any;

    relevantLocations : Address[];

    hasVerifiedAnswer : any;

    hasAcceptedAnswer : any;

    constructor (){

        this.showAnswersinUI = false;

    }
}