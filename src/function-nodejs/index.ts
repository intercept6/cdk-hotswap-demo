export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "๐Hello World from AWS Lambda Node.js(TypeScript)๐",
    }),
  };
};
