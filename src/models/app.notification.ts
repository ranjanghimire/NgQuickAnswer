import { Question } from './app.question';

export class Notification{
    
    id: string;
	
	notificationType: string;
	
	details: string;
	
    toUserId: string[];
	
	fromUserId: string;

	fromUserName: string;
	
	isViewed: boolean;

    notificationTime: string;

	question: Question;
}