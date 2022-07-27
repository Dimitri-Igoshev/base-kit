import { Component, OnInit } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'

const GET_MESSAGES = gql`
  {
    messages {
      text
    }
  }
`

const CREATE_MESSAGE = gql`
  mutation createMessage($createMessageInput: CreateMessageInput) {
    createMessage(createMessageInput: $createMessageInput) {
      text
    }
  }
`

const MESSAGE_SUBSCRIPTION = gql`
  subscription message {
    message {
      text
    }
  }
`

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  title = 'admin'

  messages: { text: string }[] = []
  message: string = ''
  loading: boolean = true
  errors: any

  constructor(private apollo: Apollo) {
    apollo.subscribe({
      query: MESSAGE_SUBSCRIPTION
    }).subscribe(({ data }: any) => {
      if (data) {
        this.messages = [{ text: data.message.text }, ...this.messages]
      }
    })
  }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: GET_MESSAGES
    })
      .valueChanges
      .subscribe(({ data, loading, errors }) => {
        this.messages = data?.messages
        this.loading = loading
        this.errors = errors
      })
  }

  createMessage(text: string, userId: number) {
    this.apollo.mutate<any>({
      mutation: CREATE_MESSAGE,
      variables: {
        createMessageInput: { text, userId }
      }
    }).subscribe(({ data }) => {
      this.message = data.createMessage.text
    })
  }
}
