# CDK Cross-Environments Pipeline 

## Requirements:

- CDK environment is an account/region pair
- Every involved environment must be bootstraped 
  - The `Dev environment` (Pipeline Owner or CICD Environment) must be bootstraped
  - The Target environments (Test US / Test CA / Staging US / Prod CA)
    - Every environment must be bootstraped with the `--trust` option to allow the `Dev environment`
    - Optionally environment must be bootstraped with the `--trust-for-lookup` option to allow the `Dev environment`
    ```shell
    $ cdk bootstrap aws://${PipelineAccountID}/${Region} --cloudformation-execution-policies 'arn:aws:iam::aws:policy/AdministratorAccess' 
    $ cdk bootstrap aws://${AccountID}/${Region} --trust ${PipelineAccountID} --cloudformation-execution-policies 'arn:aws:iam::aws:policy/AdministratorAccess' --trust-for-lookup ${PipelineAccountID}

    ``` 

- The Pipeline construct must explicitly enable the `crossAccountKeys` option
  -   
  ```javascript
    new pipelines.CodePipeline(this, 'Pipeline', {
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

```   

## Additional info

- The `cdk.json` file tells the CDK Toolkit how to execute your app.

### Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
