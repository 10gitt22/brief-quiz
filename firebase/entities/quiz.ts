import { Timestamp } from "firebase/firestore"

export type Quiz = {
  readonly id: string
  name: string
  questions: Question[]
}

export type Answer = {
  readonly id: string
  name: string
  questions: Question[]
  userName: string
  answeredAt: Timestamp
  userId: string
  quizId: string
}
export type AnswerToUpdate = Pick<Answer, "questions" | 'answeredAt'>

export type Question = {
  readonly id: number
  blockTitle: string,
  blockId: number,
  question: string,
  answer: string,
}