import { ActionType } from "typesafe-actions";
import { getQuiz } from "./actions";

export type quizActionType =
  ActionType<typeof getQuiz>;