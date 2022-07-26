import { NgModule } from '@angular/core'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core'
import { HttpLink } from 'apollo-angular/http'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink): ApolloClientOptions<any> {
        const http = httpLink.create({
          uri: 'http://localhost:3000/graphql'
        })
        const ws = new WebSocketLink({
          uri: `ws://localhost:3000/graphql`,
          options: {
            reconnect: true,
          },
        })
        const link = split(
          ({query}) => {
            // @ts-ignore
            const {kind, operation} = getMainDefinition(query)
            // @ts-ignore
            return kind === 'OperationDefinition' && operation === 'subscription'
          },
          ws,
          http
        )

        return {
          cache: new InMemoryCache(),
          link
        }
      },
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {
}
