import * as cdk from 'aws-cdk-lib';
import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HitCounter } from './hitcounter';

export class CdkServerlessApp extends cdk.Stack {
    public readonly url: CfnOutput
    constructor(scope: Construct, id: string, props?: cdk.StackProps){
        super(scope, id, props);

        const lambda = new cdk.aws_lambda.Function(this, 'Function', {
            code: cdk.aws_lambda.Code.fromAsset(__dirname + '/../lambda'),
            handler: 'hello.handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_14_X
        });

        const lambdaWithHitCounter = new HitCounter(this, 'LambdaHitCounter', {
            downstream: lambda
        });

        const api = new cdk.aws_apigateway.LambdaRestApi(this, 'API', {
             handler: lambdaWithHitCounter.lambda
        });
        
        this.url = new cdk.CfnOutput(this, "URL", {
          value: api.url,
          exportName: "URL"
        })
    }
}
