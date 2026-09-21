import express from "express";

import { AuthorsRouter } from "./routes/authors.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { pagesRouter } from "./routes/pages.routes.js";
import { productsRouter } from "./routes/product.routes.js";

process.loadEnvFile();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(new Date().toLocaleString(), req.method, req.url);
  next();
});

//------------Routes---------------
app.use("/auth", authRouter);
app.use("/authors", AuthorsRouter);
app.use("/api/products", productsRouter);
//---------------------------------

//HTML Pages
app.use(express.static("pages"));
app.use(pagesRouter);

//------------Error Handler-----------
app.use((err, req, res, next) => {
  console.error(err.err);
  res.status(500).json({ error: "Something Went Wrong" });
});
//------------------------------------

app.listen(3000, () => {
  console.log("listening on port 3000");
});
