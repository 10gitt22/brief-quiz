export type Quiz = {
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