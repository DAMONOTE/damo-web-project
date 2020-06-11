import { GraphQLServer } from 'graphql-yoga'
//import resolvers from '../graphql/resolvers' // 추가된 코드
import schema from "./schema"
import mongoose from 'mongoose'


const dbName = "cnt2020_db1";
const uri = `mongodb://192.168.0.111:27017/${dbName}?retryWrites=true&w=majority`
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

// added
server.express.set('views', __dirname + '/views');
server.express.engine('html', require('ejs').renderFile);

server.express.get('/', (req, res) => {
  res.json({
      msg: 'graphql playground로 가려면 cnt2020.hopto.org/graphql 로...'
  });
  
});
/*
server.start({ port: options.port }, () =>
  console.log(`Server is running on http://localhost:${options.port}`)
);
*/
server.start(options ,() => console.log('[MSG] Server is running on localhost:'+options.port))