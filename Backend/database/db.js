import { connect } from "mongoose";

const URI = 'mongodb+srv://sonusharma30092004:Ssp-radhe-2004@cluster0.e34n2ej.mongodb.net/?retryWrites=true&w=majority&appName=iNotes';

const connectToMongo = async () => {
    try {
        await connect(URI)
        console.log("***Database Connected Successfully***");
    } catch (error) {
        console.log(error)
    }
}

export default connectToMongo