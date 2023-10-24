import { produce } from 'immer'
import { getType } from 'typesafe-actions'
import { InitialStateQuizType } from '../../types/reduxType'
import { quizActionType } from '../action'
import {
  changeIncorrectNotePage,
  changeInputAnswer,
  changeIsResultView,
  completeQuiz,
  getQuiz,
} from '../action/actions'

export type QuizState = ReturnType<typeof reducer>

const initialState: InitialStateQuizType = {
  mainQuizs: [],
  selectedQuiz: {
    content: {
      quizs: [],
      time: 0,
      correctCount: 0,
      incorrectCount: 0,
      title: '',
      isResultView: false,
    },
    id: -2,
  },
  addQuizLoading: false,
  addQuizDone: false,
  addQuizError: null,
}

const reducer = (state = initialState, action: quizActionType) => {
  switch (action.type) {
    case getType(getQuiz.request):
      return produce(state, (draft) => {
        draft.addQuizLoading = true
        draft.addQuizDone = false
        draft.addQuizError = null
      })

    case getType(getQuiz.success): {
      const shuffleArray = (array: string[]) => {
        // 배열을 랜덤하게 섞기 위한 함수
        return array?.sort(() => Math.random() - 0.5)
      }

      const decodeQuiz = action.payload.results?.map((quiz) => {
        const incorrectAanswerList = quiz.incorrect_answers.map((answer) => decodeURIComponent(answer))
        const correctAnswer = decodeURIComponent(quiz.correct_answer)
        const array = shuffleArray(incorrectAanswerList?.concat(correctAnswer))
        return {
          category: decodeURIComponent(quiz.category),
          correct_answer: correctAnswer,
          difficulty: quiz.difficulty,
          incorrect_answers: incorrectAanswerList,
          answer_list: array,
          question: decodeURIComponent(quiz.question),
          type: quiz.type,
          input_answer: '',
          isCorrect: false,
        }
      })
      return produce(state, (draft) => {
        draft.addQuizLoading = false
        draft.addQuizDone = true
        draft.addQuizError = null
        draft.selectedQuiz.content = {
          quizs: decodeQuiz,
          time: new Date().getTime(),
          correctCount: 0,
          incorrectCount: 0,
          title: '',
          isResultView: false,
        }
        draft.selectedQuiz.id = -1
      })
    }
    case getType(getQuiz.failure):
      return produce(state, (draft) => {
        draft.addQuizLoading = false
        draft.addQuizDone = false
        draft.addQuizError = action.payload.response?.data as string
      })
    case getType(changeInputAnswer):
      return produce(state, (draft) => {
        const { id } = action.payload
        draft.selectedQuiz.content.quizs[id].isCorrect = action.payload.isCorrect
        draft.selectedQuiz.content.quizs[id].input_answer = action.payload.content
        if (action.payload.isCorrect) {
          draft.selectedQuiz.content.correctCount += 1
        } else {
          draft.selectedQuiz.content.incorrectCount += 1
        }
      })
    case getType(completeQuiz):
      return produce(state, (draft) => {
        const id = draft.mainQuizs.length
        draft.selectedQuiz.id = id
        draft.selectedQuiz.content.time = Math.floor(new Date().getTime() - draft.selectedQuiz.content.time) / 1000
        draft.selectedQuiz.content.isResultView = true
        draft.mainQuizs = [
          {
            id,
            content: {
              quizs: draft.selectedQuiz.content.quizs,
              time: draft.selectedQuiz.content.time,
              //  퀴즈 완료시간에서 퀴즈 생성 시간을 빼서 만든다.
              correctCount: draft.selectedQuiz.content.correctCount,
              incorrectCount: draft.selectedQuiz.content.incorrectCount,
              title: action.payload.title,
              isResultView: true,
            },
          },
          ...draft.mainQuizs,
        ]
      })
    case getType(changeIncorrectNotePage):
      return produce(state, (draft) => {
        const { id, isResultView } = action.payload
        const selectedQuiz = draft.mainQuizs.find((quiz) => quiz.id === id)
        if (selectedQuiz) {
          draft.selectedQuiz = selectedQuiz
          draft.selectedQuiz.content.isResultView = isResultView
        }
      })
    case getType(changeIsResultView):
      return produce(state, (draft) => {
        draft.selectedQuiz.content.isResultView = action.payload.isResultView
      })

    default:
      return state
  }
}

export default reducer
