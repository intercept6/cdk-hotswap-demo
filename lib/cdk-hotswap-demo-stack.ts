import { CfnOutput, Construct, Stack, StackProps } from "@aws-cdk/core";
import { Code, Function, Runtime } from "@aws-cdk/aws-lambda";
import { join } from "path";
import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { PythonFunction } from "@aws-cdk/aws-lambda-python";
import { GoFunction } from "@aws-cdk/aws-lambda-go";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";

export class CdkHotswapDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const httpApi = new HttpApi(this, "Api");

    httpApi.addRoutes({
      path: "/lambda",
      methods: [HttpMethod.GET],
      integration: new LambdaProxyIntegration({
        handler: new Function(this, "Function", {
          code: Code.fromAsset(join(__dirname, "../src/function")),
          handler: "index.handler",
          runtime: Runtime.NODEJS_14_X,
        }),
      }),
    });
    new CfnOutput(this, "LambdaOutput", { value: httpApi.url! + "lambda" });

    httpApi.addRoutes({
      path: "/lambda-python",
      methods: [HttpMethod.GET],
      integration: new LambdaProxyIntegration({
        handler: new PythonFunction(this, "FunctionPython", {
          entry: "src/function-python",
        }),
      }),
    });
    new CfnOutput(this, "LambdaPythonOutput", {
      value: httpApi.url! + "lambda-python",
    });

    httpApi.addRoutes({
      path: "/lambda-go",
      methods: [HttpMethod.GET],
      integration: new LambdaProxyIntegration({
        handler: new GoFunction(this, "FunctionGo", {
          entry: "src/function-go",
        }),
      }),
    });
    new CfnOutput(this, "LambdaGoOutput", {
      value: httpApi.url! + "lambda-go",
    });

    httpApi.addRoutes({
      path: "/lambda-nodejs",
      methods: [HttpMethod.GET],
      integration: new LambdaProxyIntegration({
        handler: new NodejsFunction(this, "FunctionNodejs", {
          entry: "src/function-nodejs/index.ts",
        }),
      }),
    });
    new CfnOutput(this, "LambdaNodejsOutput", {
      value: httpApi.url! + "lambda-nodejs",
    });
  }
}
