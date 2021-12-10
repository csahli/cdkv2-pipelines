import { Stack, Stage, StageProps } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { CdkServerlessApp } from './cdk-serverless-app';


export class Cdkv2PipelineStage extends Stage {

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

      const app = new CdkServerlessApp(this, 'App');
    }
  }