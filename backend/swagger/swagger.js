const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const router = express.Router();

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Locatory",
      version: "2.0.0",
      description: "A place review social media application",
    },
    servers: [
      {
        url: "http://localhost:5000/api/",
      },
    ],
    components: {
      responses: {
        BadRequest: {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  error: { type: "string", example: "Invalid data" },
                },
              },
            },
          },
        },
        Unauthorized: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  error: { type: "string", example: "Unauthorized" },
                },
              },
            },
          },
        },
        // Add other response definitions as needed
      },
    },
  },
  apis: ["./backend/routes/auth.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Create a route to serve Swagger UI documentation
router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = router;
