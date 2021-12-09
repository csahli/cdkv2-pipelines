#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkServerlessApp } from '../lib/cdk-serverless-app';
import { Cdkv2PipelineStack } from '../lib/cdkv2-pipeline-stack';


const app = new cdk.App();
new Cdkv2PipelineStack(app, 'Pipeline');

//new CdkServerlessApp(app, 'ServerlessApp');