import { ActionType } from 'typesafe-actions'
import { changeIncorrectNotePage, changeInputAnswer, changeIsResultView, completeQuiz, getQuiz } from './actions'

export type quizActionType = ActionType<
  | typeof getQuiz
  | typeof changeInputAnswer
  | typeof completeQuiz
  | typeof changeIncorrectNotePage
  | typeof changeIsResultView
>
