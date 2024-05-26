export const openApiSpec = {
   openapi: "3.1.0",
   info: {
      version: "1.0.0",
      title: "Football Quiz API",
   },
   paths: {
      "/api/hello": {
         get: {
            summary: "Testing API",
            tags: ["Testing"],
            parameters: [
               {
                  name: "name",
                  in: "query",
                  description: "Name of the user",
                  required: false,
                  example: "John",
               },
            ],
            responses: {
               200: {
                  description: "Hello response",
                  content: {
                     "application/json": {
                        schema: {
                           type: "object",
                           properties: {
                              data: {
                                 type: "string",
                                 example: "Hello, John!",
                              },
                           },
                        },
                     },
                  },
               },
            },
         },
      },
      "/api/questions/category/{category}": {
         get: {
            summary: "List questions by category",
            tags: ["Questions"],
            parameters: [
               {
                  name: "category",
                  in: "path",
                  required: true,
                  description: "Available values: championsleague, premierleague, laliga",
                  example: "championsleague",
               },
            ],
            responses: {
               200: {
                  description: "Questions response",
                  content: {
                     "application/json": {
                        schema: {
                           type: "object",
                           properties: {
                              status: {
                                 type: "boolean",
                                 description: "Success status",
                              },
                              statusCode: {
                                 type: "integer",
                                 description: "Success status code",
                                 default: 200,
                              },
                              data: {
                                 type: "object",
                                 properties: {
                                    type: { type: "string" },
                                    questions: {
                                       type: "array",
                                       items: {
                                          type: "object",
                                          properties: {
                                             question: { type: "string" },
                                             options: {
                                                type: "string",
                                                example: ["Option 1", "Option 2", "Option 3", "Option 4"],
                                             },
                                             answer: { type: "string" },
                                          },
                                       },
                                    },
                                 },
                              },
                           },
                        },
                     },
                  },
               },
               400: {
                  description: "Invalid category",
                  content: {
                     "application/json": {
                        schema: {
                           type: "object",
                           properties: {
                              status: {
                                 type: "boolean",
                                 description: "Success status",
                                 default: false,
                              },
                              statusCode: {
                                 type: "integer",
                                 description: "Success status code",
                                 default: 400,
                              },
                              message: { type: "string", default: "Invalid param" },
                           },
                        },
                     },
                  },
               },
               404: {
                  description: "Not found",
                  content: {
                     "application/json": {
                        schema: {
                           type: "object",
                           properties: {
                              status: {
                                 type: "boolean",
                                 description: "Success status",
                                 default: false,
                              },
                              statusCode: {
                                 type: "integer",
                                 description: "Success status code",
                                 default: 404,
                              },
                              data: {
                                 type: "object",
                                 default: {},
                              },
                           },
                        },
                     },
                  },
               },
               500: {
                  description: "Internal server error",
                  content: {
                     "application/json": {
                        schema: {
                           type: "object",
                           properties: {
                              status: {
                                 type: "boolean",
                                 description: "Success status",
                                 default: false,
                              },
                              statusCode: {
                                 type: "integer",
                                 description: "Success status code",
                                 default: 500,
                              },
                              message: { type: "string", default: "Something went wrong" },
                           },
                        },
                     },
                  },
               },
            },
         },
      },
   },
};
