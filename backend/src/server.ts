import app from "./app";
import dotenv from "dotenv";
import connectMongoDB from "./config/connectMongoDB";
dotenv.config();

const port: number = Number(process.env.PORT) || 8080;

app.listen(port, () => {
  console.log("> Server is up and running on port : " + port);
  console.log("NODE_ENV =>", process.env.NODE_ENV);
  connectMongoDB();
});
