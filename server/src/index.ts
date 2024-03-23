import express from "express";
import dotenv from "dotenv";
import { StreamChat } from "stream-chat";
import { genSaltSync, hashSync } from "bcrypt";

dotenv.config();

const { PORT, STREAM_API_KEY, STREAM_API_SECRET } = process.env;
const client = StreamChat.getInstance(STREAM_API_KEY!, STREAM_API_SECRET);

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.post("/video-token", async (req, res) => {
  const { userId, email } = req.body;
  console.log(req.body);

  const token = client.createToken(userId as string);

  return res.json({
    token,
    user: {
      id: userId,
      email: email,
    },
  });
});
