#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Cdkv2PipelineStack } from '../lib/cdkv2-pipeline-stack';
import { Cdkv2PipelineStage } from '../lib/cdkv2-pipelinestage';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';

const devEnv =  { account: '910537616703', region: 'us-east-1' }
const stgEnv =  { account: '810641005430', region: 'us-east-1' }

const app = new cdk.App();
const pipelineStack = new Cdkv2PipelineStack(app, 'Pipeline', {env: devEnv});


const devStage = new Cdkv2PipelineStage(app, 'DeployDev', {env: devEnv});
pipelineStack.pipeline.addStage(devStage);


const stgStage = new Cdkv2PipelineStage(app, 'DeployStaging', {env: stgEnv});
pipelineStack.pipeline.addStage(stgStage);

pipelineStack.pipeline.addStage(stgStage, 
    {
        pre: [ new ManualApprovalStep('PromoteStaging', {
            comment: `URL: ${stgStage.app.apiURL}`
        }),]
    }); 