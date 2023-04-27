import { Component } from '@angular/core';

@Component({
	selector: 'app-quizz',
	templateUrl: './quizz.component.html',
	styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent {
	title: string = '';

	questions: any;
	selectedQuestion: any;

	awsers: string[] = [''];
	selectedAwser: string = '';

	questionPointer: number = 0;
	questionMaxIndex: number = 0;

  notFinished: boolean = false;
}
