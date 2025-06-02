const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const jwt = require('jsonwebtoken')

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/books");
const Author = require("./models/author");
const User = require("./models/user");
const { GraphQLError } = require("graphql");

require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

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
      setBornTo: String!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: String!
    author: Author!
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

const resolvers = {
  Query: {
    findAuthor: (root, args) => Author.findOne({ name: args.name }),
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        let filtered = {}; // starts empty

        if (args.author) {
          // if args.author exists it add { author: "Author Name" }
          filtered.author = args.author;
        }

        if (args.genre) {
          //if args.genre exists it adds { genres: {$in: ["genre"]} }
          filtered.genres = { $in: [args.genre] };
        }

        const books = await Book.find(filtered);
        console.log("Found books:", books);
        return books;
      } catch (error) {
        console.error("Error in allBooks resolver:", error);
        throw new GraphQLError("Failed to fetch books", {
          extensions: {
            code: "INTERNAL_ERROR",
            error: error.message
          }
        });
      }
    },
    allAuthors: async (root, args) => {
      try {
        return await Author.find({});
      } catch (error) {
        console.error("Error in allAuthors resolver:", error);
        throw new GraphQLError("Failed to fetch authors", {
          extensions: {
            code: "INTERNAL_ERROR",
            error: error.message
          }
        });
      }
    },
  },
  Book: {
    author: async (root) => {
      try {
        return await Author.findOne({ name: root.author });
      } catch (error) {
        console.error("Error resolving book author:", error);
        throw new GraphQLError("Failed to resolve book author");
      }
    }
  },
  Author: {
    bookCount: async (root) => {
      try {
        return await Book.countDocuments({ author: root.name });
      } catch (error) {
        console.error("Error counting books for author:", error);
        return 0;
      }
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });
      try {
        let authorExists = await Author.findOne({ name: args.author });

        if (!authorExists) {
          const newAuthor = new Author({
            name: args.author,
            born: null,
          });
          await newAuthor.save();
        }
        await book.save();
      } catch (error) {
        console.error("Error adding book:", error);
        throw new GraphQLError("saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
            error,
          },
        });
      }
      return book;
    },
    editAuthor: async (root, args) => {
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        );
        return updatedAuthor;
      } catch (error) {
        console.error("Error editing author:", error);
        throw new GraphQLError("saving birth date field failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      console.log("Creating user with args:", args)
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4001 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('favoriteGenre')
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});