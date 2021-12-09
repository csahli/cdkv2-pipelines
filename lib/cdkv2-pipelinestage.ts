import { Stack, Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CdkServerlessApp } from './cdk-serverless-app';


export class Cdkv2PipelineStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const app = new CdkServerlessApp(this, 'App')

    }
  }