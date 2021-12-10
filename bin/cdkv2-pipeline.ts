#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Cdkv2PipelineStack } from '../lib/cdkv2-pipeline-stack';
import { Cdkv2PipelineStage } from '../lib/cdkv2-pipelinestage';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';


/* 
cdk deploy \
    -c CICD_ENV_ACCOUNT_ID=${CICD-ENV-AccountID} \
    -c CICD_ENV_REGION=${CICD-ENV-Region} \
    -c STAGING_ENV_ACCOUNT_ID=${STG-ENV-AccountID} \
    -c STAGING_ENV_REGION=${STG-ENV-Region}
*/

const app = new cdk.App();
const devEnv =  { account: app.node.tryGetContext('CICD_ENV_ACCOUNT_ID'), region: app.node.tryGetContext('CICD_ENV_REGION') }
const stgEnv =  { account: app.node.tryGetContext('STAGING_ENV_ACCOUNT_ID'), region: app.node.tryGetContext('STAGING_ENV_REGION') }


const pipelineStack = new Cdkv2PipelineStack(app, 'Pipeline', {env: devEnv});


const devStage = new Cdkv2PipelineStage(app, 'DeployDev', {env: devEnv});
pipelineStack.pipeline.addStage(devStage, 
    { post: [ 
            new ManualApprovalStep('Check & Validate DevEnv'),
        ]
    });


const stgStage = new Cdkv2PipelineStage(app, 'DeployStaging', {env: stgEnv});
pipelineStack.pipeline.addStage(stgStage); 