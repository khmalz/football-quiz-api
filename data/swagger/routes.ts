export const openApiSpec = {
   openapi: "3.1.0",
   info: {
      version: "2.0.0",
      title: "Football Quiz API",
      description: "Refresh 2x until the openAPI 3.1 badge is shown",
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
      "/api/users": {
         post: {
            summary: "Add user",
            tags: ["Users"],
            requestBody: {
               required: true,
               content: {
                  "application/json": {
                     schema: {
                        type: "object",
                        properties: {
                           username: {
                              type: "string",
                              description: "Must be at least 3 characters",
                              example: "John",
                           },
                           name: {
                              type: "string",
                              description: "Must be at least 3 characters",
                              example: "John Doe",
                           },
                        },
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "User created",
                  content: {
                     "application/json": {
                        schema: {
                           type: "object",
                           properties: {
                              success: {
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
                                    id: {
                                       type: "string",
                                       example: "123",
                                    },
                                    username: {
                                       type: "string",
                                       example: "John",
                                    },
                                    name: {
                                       type: "string",
                                       example: "John Doe",
                                    },
                                 },
                              },
                           },
                        },
                     },
                  },
               },
               400: {
                  description: "Bad request",
                  content: {
                     "application/json": {
                        schema: {
                           type: "object",
                           oneOf: [
                              {
                                 properties: {
                                    type: "object",
                                    properties: {
                                       success: {
                                          type: "boolean",
                                          description: "Success status",
                                          default: false,
                                       },
                                       statusCode: {
                                          type: "integer",
                                          description: "Success status code",
                                          default: 400,
                                       },
                                       message: {
                                          type: "string",
                                          description: "Error message",
                                          default: "Username already exists",
                                       },
                                    },
                                 },
                              },
                              {
                                 properties: {
                                    type: "object",
                                    properties: {
                                       success: {
                                          type: "boolean",
                                          description: "Success status",
                                          default: false,
                                       },
                                       error: {
                                          type: "object",
                                          description: "Error details",
                                          properties: {
                                             issues: {
                                                type: "array",
                                                items: {
                                                   type: "object",
                                                   properties: {
                                                      code: {
                                                         type: "string",
                                                         description: "Error code",
                                                         default: "too_small",
                                                      },
                                                      minimum: {
                                                         type: "integer",
                                                         description: "Minimum length (if applicable)",
                                                         default: 3,
                                                      },
                                                      type: {
                                                         type: "string",
                                                         description: "Data type",
                                                      },
                                                      inclusive: {
                                                         type: "boolean",
                                                         description: "Inclusive minimum (if applicable)",
                                                      },
                                                      exact: {
                                                         type: "boolean",
                                                         description: "Exact length required (if applicable)",
                                                      },
                                                      message: {
                                                         type: "string",
                                                         description: "Error message",
                                                         default: "Name must be at least 3 characters",
                                                      },
                                                      path: {
                                                         type: "array",
                                                         items: {
                                                            type: "string",
                                                            example: "name",
                                                         },
                                                         description: "Path to the field with error",
                                                      },
                                                   },
                                                },
                                                description: "Array of specific issues with the error",
                                             },
                                             name: {
                                                type: "string",
                                                description: "Error name",
                                                default: "ZodError",
                                             },
                                          },
                                       },
                                    },
                                 },
                              },
                           ],
                        },
                        examples: {
                           usernameExists: {
                              summary: "Username already exists",
                              value: {
                                 success: false,
                                 statusCode: 400,
                                 message: "Username already exists",
                              },
                           },
                           validationError: {
                              summary: "Validation error",
                              value: {
                                 success: false,
                                 error: {
                                    issues: [
                                       {
                                          code: "too_small",
                                          minimum: 3,
                                          type: "string",
                                          inclusive: true,
                                          exact: false,
                                          message: "Name must be at least 3 characters",
                                          path: ["name"],
                                       },
                                    ],
                                    name: "ZodError",
                                 },
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
                              success: {
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
      "/api/score": {
         post: {
            summary: "Add user score",
            tags: ["Users"],
            requestBody: {
               required: true,
               content: {
                  "application/json": {
                     schema: {
                        type: "object",
                        properties: {
                           id: {
                              type: "string",
                              description: "ID of the user",
                              example: "John",
                           },
                           category: {
                              type: "string",
                              description: "Available values: championsleague, premierleague, laliga",
                              example: "championsleague",
                           },
                           level: {
                              type: "string",
                              description: "Level of the quiz",
                              example: "level1",
                           },
                           score: {
                              type: "number",
                              description: "Score of the user",
                              example: 80,
                           },
                        },
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "User created",
                  content: {
                     "application/json": {
                        schema: {
                           type: "object",
                           properties: {
                              success: {
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
                                    id_user: {
                                       type: "string",
                                       example: "123",
                                    },
                                    category: {
                                       type: "string",
                                       example: "championsleague",
                                    },
                                    level: {
                                       type: "string",
                                       example: "level1",
                                    },
                                    score: {
                                       type: "number",
                                       example: 80,
                                    },
                                 },
                              },
                           },
                        },
                     },
                  },
               },
               400: {
                  description: "Bad request",
                  content: {
                     "application/json": {
                        schema: {
                           type: "object",
                           properties: {
                              success: {
                                 type: "boolean",
                                 description: "Success status",
                                 default: false,
                              },
                              error: {
                                 type: "object",
                                 description: "Error details",
                                 properties: {
                                    issues: {
                                       type: "array",
                                       items: {
                                          type: "object",
                                          properties: {
                                             code: {
                                                type: "string",
                                                description: "Error code",
                                                default: "invalid_type",
                                             },
                                             expected: {
                                                type: "string",
                                                description: "Expected data type",
                                                default: "number",
                                             },
                                             received: {
                                                type: "string",
                                                description: "Received data type",
                                                default: "string",
                                             },
                                             message: {
                                                type: "string",
                                                description: "Error message",
                                                default: "Score is required",
                                             },
                                             path: {
                                                type: "array",
                                                items: {
                                                   type: "string",
                                                   example: "score",
                                                },
                                                description: "Path to the field with error",
                                             },
                                          },
                                       },
                                       description: "Array of specific issues with the error",
                                    },
                                    name: {
                                       type: "string",
                                       description: "Error name",
                                       default: "ZodError",
                                    },
                                 },
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
                              success: {
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
                              success: {
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
                              success: {
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
                              success: {
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
                              success: {
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
