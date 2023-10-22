import { ActionType } from "typesafe-actions";
import { changeInputAnswer, getQuiz } from "./actions";

export type quizActionType =
  ActionType<typeof getQuiz>;

export type changeInputAnswerType =
  ActionType<typeof changeInputAnswer>