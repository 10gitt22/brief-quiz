export type Quiz = {
  name: string
  questions: {
    title: string
    questions: {
      question: string
    }[]
  }[]
}