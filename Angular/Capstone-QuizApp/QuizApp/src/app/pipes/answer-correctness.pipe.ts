import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'answerCorrectness',
  standalone: true
})
export class AnswerCorrectnessPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(isCorrect: boolean): string {
    return isCorrect ? '✔ Correct' : '❌ Incorrect';
  }

}
