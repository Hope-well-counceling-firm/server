import mongoose from "mongoose";

const connectDB = async (PORT: number, app: any) => {
  if (!process.env.MONGO_URL) return;
  const url = process.env.MONGO_URL;

  mongoose
    .connect(url, {
      //   useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(PORT, () =>
        console.log(`Server runnig on port http://localhost:${PORT}`)
      );
    })
    .catch((error) => {
      console.error(error);
    });
};
export default connectDB;
