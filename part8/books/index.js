const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Mutation {
    addBook(
      title: String!
      published: String!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      born: String!
    ): Author
  }

  type Book {
    title: String!
    published: String!
    author: String!
    genres: [String!]
    id: ID
  }

  type Author {
    name: String!
    born: String
    bookCount: Int! 
    id: ID
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    findAuthor(name: String!): Author
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`;
// line 112 made the mistake of using a nested bookcounts instead of just this bookCount: Int!
const resolvers = {
  Query: {
    findAuthor: (root, args) => authors.find((a) => a.name === args.name),
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let filtered = books;

      if (args.author) {
        filtered = filtered.filter((book) => book.author === args.author);
      }

      if (args.genre) {
        filtered = filtered.filter((book) => book.genres.includes(args.genre));
      }

      return filtered;
    },
    allAuthors: () => authors, // allAuthors resolver must not just return author. check line 130 to 134
  },
  Author: {
    // add a custom resolver for the bookcount field line 112
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length,
    // root is the author object returned by the allAuthors line 130
    // now we use filter to match the author name in book object to the root.name
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = {
        title: args.title,
        published: args.published,
        author: args.author,
        genres: args.genres,
        id: uuid(),
      };

      books = books.concat(newBook);

      let authorExists = authors.find((a) => a.name === args.author);

      if (!authorExists) {
        const newAuthor = {
          name: args.author,
          id: uuid(),
          born: null,
        };
        authors = authors.concat(newAuthor);
      }
      return newBook;
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if(!author) return null

      const updateAuthor = { ...author, born: args.born }
      authors = authors.map(a => a.name === args.name ? updateAuthor : a)
      return updateAuthor
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4001 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
