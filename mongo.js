const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
 
mongoClient.connect(function(err, client){
      
    const db = client.db("test");
    const collection = db.collection("users");
    let user = {name: "Tom1", age: 23};
    collection.find().toArray(function(err, results){
                 
        console.log(results);
        client.close();
    });
});