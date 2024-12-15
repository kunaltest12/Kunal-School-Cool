import mongoose from "mongoose";


const connectToDb = async () => {
const dbname = "schoolcool";
await mongoose.connect(`mongodb://localhost:27017/${dbname}`, {
useNewUrlParser: true,
useUnifiedTopology: true,
});
};
export default connectToDb;
