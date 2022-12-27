import path from "path";
import express from "express";
import cors from "cors";
import InlineCss from "inline-css";
import { router as acidRouter } from "./acid-routes";

const root = path.resolve(__dirname, "../../");
const assets = path.resolve(root, "./src/assets");

const app = express();
if (process.argv.includes("--development")) {
  app.use(cors());
}
app.use(express.text());
app.use(express.json());

app.use(express.static(path.resolve(root, "storybook-static")));

app.post("/", async (req, res) => {
  const html = req.body;
  const inlined = await InlineCss(html, {
    url: `file://${assets}/`,
  });
  return res.send(inlined);
});

app.use("/acid", acidRouter);

app.listen(6007, () => {
  console.log("Express running on port 6007");
});
