import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { 
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider
} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

const query = gql`
  query {
    allPersons {
      name,
      phone,
      address {
        street,
        city
      }
      id
    }
  }
`

client.query({ query }) // client line 8 creates client object which is used to query the server
  .then((response) => {
    console.log(response.data)
  })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
