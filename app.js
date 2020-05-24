var crypto = require('crypto');

var code = 'test';

var hash = crypto.createHash('sha256').update(code).digest('base64');


console.log(hash);

const stakes = ","
.repeat(52)



console.log(stakes);

// const MongoClient = require("mongodb").MongoClient;

   
// const url = "mongodb+srv://nikitos:qwasdx=1@cloudcluster-yl09g.gcp.mongodb.net/test";
// const mongoClient = new MongoClient(url, { useNewUrlParser: true });
// console.log(mongoClient); 
// mongoClient.connect(function(err, client){
//     if (err) {
//         console.error('An error occurred connecting to MongoDB: ', err);
//     } else {  
//     const db = client.db("test");
//     const collection = db.collection("users");
//     let user = {username: "Tom"};
//     collection.insertOne(user, function(err, result){
          
//         if(err){ 
//             return console.log(err);
//         }
//         console.log(result.ops);
//         client.close();
//     });

// }
// });
