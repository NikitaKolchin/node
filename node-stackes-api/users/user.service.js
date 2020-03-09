const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
let users;
mongoClient.connect(function(err, client){
      
    const db = client.db("test");
    const collection = db.collection("users");
    collection.find().toArray(function(err, results){
        users = results;        
        console.log(results);
        client.close();
    });
});

//const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }, { id: 2, username: 'nik', password: 'test', firstName: 'Nik', lastName: 'Kolch' }];



module.exports = {
    authenticate,
    getAll,
    add,
    change,
    remove
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function add() {
    return {message: 'add new user'};
}

async function change() {
    return {message: 'change user'};
}

async function remove() {
    return {message: 'remove user'};
}