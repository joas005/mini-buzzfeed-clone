import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
	selector: 'app-quizz',
	templateUrl: './quizz.component.html',
	styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent {
	title: string = '';

	questions: any;
	selectedQuestion: any;

	awsers: string[] = [];
	selectedAwser: string []= [];

	questionPointer: number = 0;
	questionMaxIndex: number = 0;

	notFinished: boolean = true;

	ngOnInit(): void {
		if (quizz_questions) {
			this.notFinished = true
			this.title = quizz_questions.title
			this.questions = quizz_questions.questions
			this.selectedQuestion = this.questions[this.questionPointer]

			this.questionPointer = 0
			this.questionMaxIndex = this.questions.length
		}
	}

	chosenOption(alias: string) {
		this.awsers.push(alias)
		this.nextStep()
	}

	async nextStep() {
		this.questionPointer += 1
		if (this.questionPointer < this.questionMaxIndex) {
			this.selectedQuestion =  this.questions[this.questionPointer]
		} else {
			const finalAwsers: string = await this.checkResult(this.awsers)
			this.notFinished = false
			this.selectedAwser = quizz_questions.results[finalAwsers as keyof typeof quizz_questions.results]
		}
	}

	async checkResult(awsers: string[]) {
		const result = awsers.reduce ((previous, current, i, array) => {
			if (array.filter(item => item === previous).length >  array.filter(item => item === current).length) {
				return previous;
			} else if (array.filter(item => item === previous).length ==  array.filter(item => item === current).length) {
				return 'C'
			} else {
				return current
			}
		})

		return result
	}
}
