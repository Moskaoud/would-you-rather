import { saveQuestionAnswer } from '../utils/api';
import { addAnswerToQuestion } from '../actions/questions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

function addAnswerToUser(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    qid,
    answer
  }
}

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
  return dispatch => {
    return saveQuestionAnswer({ authedUser, qid, answer }).then(o => {
      dispatch(addAnswerToUser(o.authedUser, o.qid, o.answer))
      dispatch(addAnswerToQuestion(o.authedUser, o.qid, o.answer))
    })
  }
}

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author
  }
}