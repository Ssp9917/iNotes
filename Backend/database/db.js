import { connect } from "mongoose";

const URI = 'mongodb://localhost:27017/inotes';

const connectToMongo = async () => {
    try {
        await connect(URI)
        console.log("***Database Connected Successfully***");
    } catch (error) {
        console.log(error)
    }
}

export default connectToMongo