export type Quiz = {
  readonly id: string
  name: string
  questions: Question[]
}

export type Answer = {
  readonly id: string
  name: string
  questions: Question[]
}

export type Question = {
  readonly id: number
  blockTitle: string,
  blockId: number,
  question: string,
  answer: string,
}