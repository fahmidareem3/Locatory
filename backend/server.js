const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// File upload
const fileUpload = require("express-fileupload");

// Route files
const places = require("./routes/places");
const auth = require("./routes/auth");
const reviews = require("./routes/reviews");
const likes = require("./routes/likes");
const dislikes = require("./routes/dislikes");
const upload = require("./routes/upload");

const app = express();

// Body parser
app.use(express.json());

// File uploader
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Cookie parser
app.use(cookieParser());

// Mount routers
app.use("/api/places", places);
app.use("/api/auth", auth);
app.use("/api/reviews", reviews);
app.use("/api/likes", likes);
app.use("/api/dislikes", dislikes);
app.use("/api/upload", upload);

// Define Swagger options
const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Locatory",
      description: "A social media application for creating places and reviews",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Bearer token to access these api endpoints",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(options);

// Create a route to serve Swagger UI documentation
app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit
  server.close(() => process.exit(1));
});
