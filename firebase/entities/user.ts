export type FirestoreUser = {
  readonly id: string,
  readonly email: string,
  name: string,
  readonly role: 'user' | 'admin'
}