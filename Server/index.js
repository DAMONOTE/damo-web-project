import { GraphQLServer } from 'graphql-yoga'
//import resolvers from '../graphql/resolvers' // 추가된 코드
import schema from "./schema"
import mongoose from 'mongoose'


const dbName = "cnt2020_db1";
const uri = `mongodb://root:@cnt2020@localhost:27017/${dbName}?retryWrites=true&w=majority`
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true });

const server = new GraphQLServer({
  schema // 추가된 코드
})

const options = {
  endpoint: '/api',
  playground: '/graphql',
  port: 30000,
  hostname: '0.0.0.0'
}

// added for cors
server.express.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

server.express.get('/', (req, res) => {
  res.json({
      msg: 'DamoNote Main Page.'
  });
  
});

server.start(options ,() => console.log('[DEBUG] Server is running on localhost:'+options.port))
