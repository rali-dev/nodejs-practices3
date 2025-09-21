const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoproject')
  .then(() => console.log('connected to mongodb'))
  .catch((err)=> console.log('could not connect to mongodb'));

  const userSchema = new mongoose.Schema({
    first_name : String, 
    // last_name : {type: String, required: function(){ return this.admin; }},
    last_name : {type: String, required: true}, 
    favorites: [String], 
    data: {type: Date, default: Date.now},
    admin: Boolean
  });

  const User = mongoose.model('User', userSchema);
  async function createUser(){
    const user = new User({
      first_name : 'Ali', 
      // last_name: 'Rahimi', 
      favorites: ['Productivity', 'Programming', 'Football'],
      admin: true,
    });

    try {
      const result = await user.save();
      console.log(result);
    } catch (ex) {
        console.log(ex.message);
    }
  }
  createUser();
  
  async function getUsers(){
     const users = await User.find({first_name: 'Ali'}).limit(5)
         .sort({first_name: -1})
         .select({first_name: 1, last_name: 1});
     console.log(users);
  }
 // getUsers();

 // MongoDB Comparison Query Operators
 // $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin

 // User.find({age: {$eq: 27}}) 
 // User.find({age: {$eq: 27}}) 
 // User.find({age: {$gt: 27}}) 
 // User.find({age: {$gte: 27}}) 
 // User.find({age: {$lt: 27}}) 
 // User.find({age: {$lte: 27}}) 
 // User.find({age: {$in: [27, 30, 35]}}) 
 // User.find({age: {$nin: [27, 30, 35]}}) 
 
 // .or() & .and() Query in Mongoose

  // OR query
  // User.find({
  //   $or: [
  //     { city: 'Berlin' },
  //     { city: 'New York' }
  //   ]
  // })

  // AND query
  // User.find({
  //   $and: [
  //     { first_name: 'Ali' },
  //     { last_name: 'Rahimi' },
  //     { city: 'Berlin' }
  //   ]
  // })

  // pagination 
  //  async function getUsers(){
  //    const pageNumber = 1;
  //    const pageSize = 8;
  //    const users = await User.find()
  //     .skip((pageNumber -1) * pageSize)
  //     .limit(pageSize) 
  //    console.log(users);
  // }
  // getUsers();

  // first approach to update a document_______

  // async function updateUser(id){
  //   const user = await User.findById(id);
  //   // const user = await User.find({_id: id});
  //   // const user = await User.findOne({_id: id});
  //   if(!user) return;
  //   // user.admin = true;
  //   // user.first_name = 'updated name';
    
  //   user.set({
  //     admin: true,
  //     last_name: 'updated name 1',
  //   });
  //   const result = await user.save();
  //   console.log(result);
  // }

  //updateUser('68ce75022bb5bf328f68f1a9');

  // second approach to update a document_______

  // async function updateUser(id){
  //   // const user = await User.findByIdAndUpdate(id, {
  //   // const user = await User.updateMany({_id: id}, {
  //     const result = await User.updateOne({_id: id}, {
  //     $set: {
  //       admin: true,
  //       last_name: 'updated name 2',
  //     }
  //   });

  //   console.log(result);
  // }
  // updateUser('68ce75022bb5bf328f68f1a9');

    async function updateUser(id){
      const result = await User.findByIdAndUpdate(id, {
      $set: {
        admin: true,
        last_name: 'updated name 2',
      }
    }, {new: true}); // to return the updated document

    console.log(result);
  }
  // updateUser('68ce75022bb5bf328f68f1a9');

  // Deleting a document_______

  async function removeUser(id){
    // const user = await User.findByIdAndRemove(id);
    // const result = await User.deleteMany({admin: false});
    const result = await User.deleteOne({_id: id});
    console.log(result);
  }

  //  removeUser('68ce75022bb5bf328f68f1a9');