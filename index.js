const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoproject')
  .then(() => console.log('connected to mongodb'))
  .catch((err)=> console.log('could not connect to mongodb'));

  const userSchema = new mongoose.Schema({
    first_name : String, 
    last_name : {type: String, required: true}, 
    favorites: [String], 
    data: {type: Date, default: Date.now},
    admin: Boolean
  });

  const User = mongoose.model('User', userSchema);
  async function createUser(){
    const user = new User({
      first_name : 'Ali', 
      last_name: 'Rahimi', 
      favorites: ['Productivity', 'Programming', 'Football'],
      admin: true,
    });

    const result = await user.save();
    console.log(result);
  }
  //createUser();
  
  async function getUsers(){
     const users = await User.find({first_name: 'Ali'}).limit(5)
         .sort({first_name: -1})
         .select({first_name: 1, last_name: 1});
     console.log(users);
  }
 getUsers();
 
 // MongoDB Comparison Query Operators
 // $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin
 