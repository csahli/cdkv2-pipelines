import { pipelines, Stack, StackProps } from 'aws-cdk-lib';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { CodeBuildStep, CodePipelineSource } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import {Cdkv2PipelineStage} from './cdkv2-pipelinestage'; 

export class Cdkv2PipelineStack extends Stack {
  public readonly pipeline: pipelines.CodePipeline
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const gitrepo = Repository.fromRepositoryName(this, 'Repository', 'cdk2pipeline');
    
    this.pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      pipelineName: 'CDK2Pipeline',
      crossAccountKeys: true,
      selfMutation: true,
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

    

  }
}
