export const openApiSpec = {
   openapi: "3.1.0",
   info: {
      version: "2.0.0",
      title: "Football Quiz API",
      description: "Keep refreshing until the openAPI 3.1 badge is shown",
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
      "/api/users/get": {
         post: {
            summary: "Get user",
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
                           password: {
                              type: "string",
                              description: "Must be at least 6 characters",
                              example: "123456",
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
                                       example: "1234",
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
                  },
               },
               401: {
                  description: "Incorrect password",
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
                                 default: 401,
                              },
                              message: { type: "string", default: "Incorrect password" },
                           },
                        },
                     },
                  },
               },
               404: {
                  description: "User not found",
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
                              message: { type: "string", default: "User not found" },
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
      "/api/users/edit": {
         put: {
            summary: "Edit user",
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
                              example: "1234",
                           },
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
               201: {
                  description: "User updated",
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
                                 default: 201,
                              },
                              data: {
                                 type: "object",
                                 properties: {
                                    id: {
                                       type: "string",
                                       example: "1234",
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
                  },
               },
               404: {
                  description: "User not found",
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
                              message: { type: "string", default: "User not found" },
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
      "/api/users/changepassword": {
         put: {
            summary: "Edit user's password",
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
                              example: "1234",
                           },
                           oldPassword: {
                              type: "string",
                              description: "Must be at least 6 characters",
                              example: "123456",
                           },
                           newPassword: {
                              type: "string",
                              description: "Must be at least 6 characters",
                              example: "123456",
                           },
                        },
                     },
                  },
               },
            },
            responses: {
               201: {
                  description: "Password user changed",
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
                                 default: 201,
                              },
                              data: {
                                 type: "object",
                                 properties: {
                                    id: {
                                       type: "string",
                                       example: "1234",
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
                  },
               },
               401: {
                  description: "Incorrect password",
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
                                 default: 401,
                              },
                              message: { type: "string", default: "Incorrect password" },
                           },
                        },
                     },
                  },
               },
               404: {
                  description: "User not found",
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
                              message: { type: "string", default: "User not found" },
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
                           password: {
                              type: "string",
                              description: "Must be at least 6 characters",
                              example: "123456",
                           },
                        },
                     },
                  },
               },
            },
            responses: {
               201: {
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
                                 default: 201,
                              },
                              data: {
                                 type: "object",
                                 properties: {
                                    id: {
                                       type: "string",
                                       example: "1234",
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
                  },
               },
               409: {
                  description: "Username already exists",
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
                                 default: 409,
                              },
                              message: { type: "string", default: "Username already exists" },
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
      "/api/score/get": {
         post: {
            summary: "Get user's score",
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
                              example: "1234",
                           },
                           category: {
                              type: "string",
                              description: "Available values: championsleague, premierleague, laliga",
                              example: "championsleague",
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
                                       example: "1234",
                                    },
                                    current_level: {
                                       type: "number",
                                       example: 2,
                                    },
                                    category: {
                                       type: "string",
                                       example: "championsleague",
                                    },
                                    levels: {
                                       type: "object",
                                       properties: {
                                          1: {
                                             type: "object",
                                             properties: {
                                                score: {
                                                   type: "number",
                                                   example: 100,
                                                },
                                                created_at: {
                                                   type: "string",
                                                   example: "2024-01-01T00:00:00.000Z",
                                                },
                                                updated_at: {
                                                   type: "string",
                                                   example: "2024-01-01T00:00:00.000Z",
                                                },
                                             },
                                          },
                                          2: {
                                             type: "object",
                                             properties: {
                                                score: {
                                                   type: "number",
                                                   example: 100,
                                                },
                                                created_at: {
                                                   type: "string",
                                                   example: "2024-01-01T00:00:00.000Z",
                                                },
                                                updated_at: {
                                                   type: "string",
                                                   example: "2024-01-01T00:00:00.000Z",
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
                  },
               },
               404: {
                  description: "The document of the category not found",
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
                              message: { type: "string", default: "The document of the category not found" },
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
            summary: "Add user's score",
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
                              example: "1234",
                           },
                           category: {
                              type: "string",
                              description: "Available values: championsleague, premierleague, laliga",
                              example: "championsleague",
                           },
                           level: {
                              type: "number",
                              description: "Level of the quiz",
                              example: "1",
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
               201: {
                  description: "Score created",
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
                                 default: 201,
                              },
                              data: {
                                 type: "object",
                                 properties: {
                                    id_user: {
                                       type: "string",
                                       example: "1234",
                                    },
                                    category: {
                                       type: "string",
                                       example: "championsleague",
                                    },
                                    level1: {
                                       type: "number",
                                       example: 80,
                                    },
                                    current_level: {
                                       type: "number",
                                       example: 1,
                                    },
                                    created_at: {
                                       type: "string",
                                       example: "2024-01-01T00:00:00.000Z",
                                    },
                                    updated_at: {
                                       type: "string",
                                       example: "2024-01-01T00:00:00.000Z",
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
               406: {
                  description: "Invalid level",
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
                                 default: 406,
                              },
                              message: { type: "string", default: "Invalid level progression" },
                           },
                        },
                     },
                  },
               },
               409: {
                  description: "Invalid level initial because never taken the quiz",
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
                                 default: 409,
                              },
                              message: { type: "string", default: "Invalid initial level" },
                           },
                        },
                     },
                  },
               },
               422: {
                  description: "Score not reach the minimum",
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
                                 default: 422,
                              },
                              message: { type: "string", default: "Score must be at least 50" },
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
      "/api/scores/get/{category}": {
         get: {
            summary: "List user scores by category",
            tags: ["Users"],
            parameters: [
               {
                  name: "category",
                  in: "path",
                  required: true,
                  description: "Available values: championsleague, premierleague, laliga",
                  example: "championsleague",
               },
               {
                  name: "sum",
                  in: "query",
                  description: "Is score sum or not",
                  example: "true",
               },
            ],
            responses: {
               200: {
                  description: "Score response",
                  content: {
                     "application/json": {
                        schema: {
                           oneOf: [
                              {
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
                                       type: "array",
                                       items: {
                                          type: "object",
                                          properties: {
                                             username: {
                                                type: "string",
                                             },
                                             name: {
                                                type: "string",
                                             },
                                             scores: {
                                                type: "object",
                                                properties: {
                                                   category: {
                                                      type: "string",
                                                   },
                                                   levels: {
                                                      type: "object",
                                                      properties: {
                                                         "1": {
                                                            type: "object",
                                                            properties: {
                                                               score: {
                                                                  type: "number",
                                                                  default: 100,
                                                               },
                                                               created_at: {
                                                                  type: "string",
                                                                  example: "2024-01-01T00:00:00.000Z",
                                                               },
                                                               updated_at: {
                                                                  type: "string",
                                                                  example: "2024-01-01T00:00:00.000Z",
                                                               },
                                                            },
                                                         },
                                                         "2": {
                                                            type: "object",
                                                            properties: {
                                                               score: {
                                                                  type: "number",
                                                                  default: 100,
                                                               },
                                                               created_at: {
                                                                  type: "string",
                                                                  example: "2024-01-01T00:00:00.000Z",
                                                               },
                                                               updated_at: {
                                                                  type: "string",
                                                                  example: "2024-01-01T00:00:00.000Z",
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
                                 },
                              },
                              {
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
                                       type: "array",
                                       items: {
                                          type: "object",
                                          properties: {
                                             username: {
                                                type: "string",
                                             },
                                             name: {
                                                type: "string",
                                             },
                                             scores: {
                                                type: "object",
                                                properties: {
                                                   category: {
                                                      type: "string",
                                                   },
                                                   total: {
                                                      type: "number",
                                                   },
                                                },
                                             },
                                          },
                                       },
                                    },
                                 },
                              },
                           ],
                        },
                        examples: {
                           example1: {
                              summary: "Default if sum is false or not defined",
                              value: {
                                 success: true,
                                 statusCode: 200,
                                 data: [
                                    {
                                       username: "john_doe",
                                       name: "John Doe",
                                       scores: {
                                          category: "championsleague",
                                          levels: {
                                             "1": {
                                                score: 100,
                                                created_at: "2024-01-01T00:00:00.000Z",
                                                updated_at: "2024-01-01T00:00:00.000Z",
                                             },
                                             "2": {
                                                score: 95,
                                                created_at: "2024-01-02T00:00:00.000Z",
                                                updated_at: "2024-01-02T00:00:00.000Z",
                                             },
                                          },
                                       },
                                    },
                                 ],
                              },
                           },
                           example2: {
                              summary: "Example if sum is true",
                              value: {
                                 success: true,
                                 statusCode: 200,
                                 data: [
                                    {
                                       username: "john_doe",
                                       name: "John Doe",
                                       scores: {
                                          category: "championsleague",
                                          total: 195,
                                       },
                                       answer: "Correct",
                                       level: 2,
                                    },
                                 ],
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
                                             received: {
                                                type: "string",
                                                description: "Received data type",
                                                default: "string",
                                             },
                                             code: {
                                                type: "string",
                                                description: "Error code",
                                                default: "invalid_enum_value",
                                             },
                                             options: {
                                                type: "array",
                                                default: ["championsleague", "premierleague", "laliga"],
                                                description: "Available values: championsleague, premierleague, laliga",
                                             },
                                             path: {
                                                type: "array",
                                                items: {
                                                   type: "string",
                                                   example: "category",
                                                },
                                                description: "Path to the field with error",
                                             },
                                             message: {
                                                type: "string",
                                                description: "Error message",
                                                default: "Category must be one of the league",
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
                              message: { type: "string", default: "The document of the category not found" },
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
                                             level: { type: "number" },
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
                                             received: {
                                                type: "string",
                                                description: "Received data type",
                                                default: "string",
                                             },
                                             code: {
                                                type: "string",
                                                description: "Error code",
                                                default: "invalid_enum_value",
                                             },
                                             options: {
                                                type: "array",
                                                default: ["championsleague", "premierleague", "laliga"],
                                                description: "Available values: championsleague, premierleague, laliga",
                                             },
                                             path: {
                                                type: "array",
                                                items: {
                                                   type: "string",
                                                   example: "category",
                                                },
                                                description: "Path to the field with error",
                                             },
                                             message: {
                                                type: "string",
                                                description: "Error message",
                                                default: "Category must be one of the league",
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
                              message: { type: "string", default: "Questions not found" },
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
      "/api/questions/category/{category}/level/{level}": {
         get: {
            summary: "List questions by category based on level",
            tags: ["Questions"],
            parameters: [
               {
                  name: "category",
                  in: "path",
                  required: true,
                  description: "Available values: championsleague, premierleague, laliga",
                  example: "championsleague",
               },
               {
                  name: "level",
                  in: "path",
                  required: true,
                  description: "Level must be a number",
                  example: 1,
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
                                                type: "array",
                                                example: ["Option 1", "Option 2", "Option 3", "Option 4"],
                                             },
                                             answer: { type: "string" },
                                             level: { type: "number" },
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
                                             received: {
                                                type: "string",
                                                description: "Received data type",
                                                default: "string",
                                             },
                                             code: {
                                                type: "string",
                                                description: "Error code",
                                                default: "invalid_enum_value",
                                             },
                                             options: {
                                                type: "array",
                                                default: ["championsleague", "premierleague", "laliga"],
                                                description: "Available values: championsleague, premierleague, laliga",
                                             },
                                             path: {
                                                type: "array",
                                                items: {
                                                   type: "string",
                                                   example: "category",
                                                },
                                                description: "Path to the field with error",
                                             },
                                             message: {
                                                type: "string",
                                                description: "Error message",
                                                default: "Category must be one of the league",
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
                              message: { type: "string", default: "Questions not found" },
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
