import { pipelines, Stack, StackProps } from 'aws-cdk-lib';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { CodeBuildStep, CodePipelineSource } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import {Cdkv2PipelineStage} from './cdkv2-pipelinestage'; 

export class Cdkv2PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const gitrepo = Repository.fromRepositoryName(this, 'cdkv2pipeline', 'master');
    
    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      pipelineName: 'CDK2Pipeline',
      synth: new CodeBuildStep('SynthStep', {
        input: CodePipelineSource.codeCommit(gitrepo, 'master'),
        installCommands: [
          'npm install -g aws-cdk'
        ],
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    });

    const deploy = new Cdkv2PipelineStage(this, 'Deploy');
    pipeline.addStage(deploy);

  }
}
