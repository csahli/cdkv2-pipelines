import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HitCounter } from './hitcounter';

export class CdkServerlessApp extends cdk.Stack {
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

        new cdk.aws_apigateway.LambdaRestApi(this, 'API', {
             handler: lambdaWithHitCounter.lambda
        });


    }

}