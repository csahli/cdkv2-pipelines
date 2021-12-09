import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';


interface HitCounterProps extends cdk.StackProps{
    downstream: cdk.aws_lambda.IFunction
}


export class HitCounter extends Construct {
    public readonly lambda: cdk.aws_lambda.Function
    constructor(scope: Construct, id: string, props: HitCounterProps){
        super(scope, id)

        const ddb = new cdk.aws_dynamodb.Table(this, 'Table', {
            partitionKey: {name: 'path', type: cdk.aws_dynamodb.AttributeType.STRING}
        });
        
        this.lambda = new cdk.aws_lambda.Function(this, 'HitCounterHandler', {
            runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
            code: cdk.aws_lambda.Code.fromAsset(__dirname + '/../lambda'),
            handler: 'hitcounter.handler',
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: ddb.tableName
            }
        });

        ddb.grantReadWriteData(this.lambda);
        props.downstream.grantInvoke(this.lambda);
    }
}