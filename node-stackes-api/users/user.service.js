// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const userScheme = new Schema({id: Number, username: String, password: String, firstName: String, lastName: String}, {versionKey: false});
// const User = mongoose.model("User", userScheme);
// mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

// // const url = "mongodb://localhost:27017/";
// // const mongoClient = new MongoClient(url, { useNewUrlParser: true });
// // let users;
// // mongoClient.connect(function(err, client){
      
// //     const db = client.db("test");
// //     const collection = db.collection("users");
// //     collection.find().toArray(function(err, results){
// //         users = results;        
// //         console.log(results);
// //         client.close();
// //     });
// // });

// //const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }, { id: 2, username: 'nik', password: 'test', firstName: 'Nik', lastName: 'Kolch' }];



// module.exports = {
//     authenticate,
//     getAll,
//     add,
//     change,
//     remove
// };

// async function authenticate({ username, password }) {
   
//    return await User.findOne({username: username, password: password}, function(err, user){        
//         if(err) return console.log(err);      
//         return user;     
//     });

    
//     // const user = users.find(u => u.username === username && u.password === password);
//     // if (user) {
//     //     const { password, ...userWithoutPassword } = user;
//     //     return userWithoutPassword;
//     // }
// }

//   function getAll() {
 
//    return  User.find({}, function(err, users){      
//         if(err) return console.log(err);
//         return users;     
//     });

//     // return users.map(u => {
//     //     const { password, ...userWithoutPassword } = u;
//     //     return userWithoutPassword;
//     // });
// }

//    function add({id, username, password, firstName, lastName }) {

//     User.create({id: id, username: username, password: password, firstName: firstName, lastName: lastName},  function(err, user){ 
//     console.log("ser "+user)
//    });

// //     const user = new User();      
// //    return user.save(function(err){
// //         if(err) return console.log(err);
// //         console.log("ser "+user)
// //         return user;
// //     });
// }

// function change() {
//     return {message: 'change user'};
// }

// function remove() {
//     return {message: 'remove user'};
// }