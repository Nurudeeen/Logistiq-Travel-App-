const mongoose = require('mongoose');
module.exports = {
connect: async () => {try {
  await mongoose.connect('mongodb://127.0.0.1:27017/userdb').then(()=>{
    console.log("connected to db");
  });
} catch (error) {
  console.log(error);
}
}
}