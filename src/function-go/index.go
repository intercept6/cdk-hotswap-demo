package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler() (events.APIGatewayV2HTTPResponse, error) {

	return events.APIGatewayV2HTTPResponse{
		Body:       "🎉Hello World from AWS Lambda Go🎉",
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(handler)
}
