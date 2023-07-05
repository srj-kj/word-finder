import mongoose from 'mongoose';


const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


 const connectToDatabase = () => {
    mongoose
  .connect(process.env.MONGOLAB_URI,{useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });
  };

  export default connectToDatabase ;