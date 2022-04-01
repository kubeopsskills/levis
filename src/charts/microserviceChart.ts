import * as log4js from "log4js";
import * as YAML from "yaml";
import * as Fs from "fs"
import { Chart } from "cdk8s";
import { Construct } from "constructs";
import { Command, ServiceModel, DeploymentModel } from "../models";
import { Deployment, Service } from "../../libs/k8s";
import { LevisConfig } from "../models/levisConfig";
import { ConfigParser } from "../utils/configParser";

const log = log4js.getLogger();

export class MicroServiceChart extends Chart {
    
    constructor(scope: Construct, command: Command) {
        super(scope, "levis");
        const configFilePath = command.configFilePath;
        log.debug(configFilePath);
        // Path yaml to LevisConfig
        const config: LevisConfig = YAML.parse(Fs.readFileSync(configFilePath, {encoding: 'utf-8'}))
        log.debug("LevisConfig: ", config);
        log.debug("Service: ", config.levis.service);
        const isServiceEnabled = config.levis.service?.enabled ?? true;
        if ( !!config.levis.service && isServiceEnabled ){
          log.debug("Generate Service ...")
          this.generateService(ConfigParser.ParseService(config));
        }
        log.debug("Deployment: ", config.levis.deployment);
        log.debug("Generate Deployment ...")
        this.generateDeployment(ConfigParser.ParseDeployment(config));
    }

    private generateService(model: ServiceModel): void {
      log.debug("servicePort: ", model.servicePort);
      new Service(this, 'service', {
        metadata: {
          name: model.name,
          namespace: model.namespace,
          labels: model.labels,
          annotations: model.annotations,
        },
        spec: {
          type: model.type,
          ports: model.servicePort,
          selector: model.selector
        }
      });
    }
    
    private generateDeployment(model: DeploymentModel): void {
        log.debug("generateDeployment");

        new Deployment(this, 'deployment', {
            metadata: {
              name: model.name,
              namespace: model.namespace,
              labels: model.labels,
              annotations: model.annotations,
            },
            spec: {
              revisionHistoryLimit: model.revisionHistoryLimit,
              replicas: model.replicas,
              strategy: model.strategy,
              selector: {
                matchLabels: model.matchLabels
              },
              template: {
                metadata: {
                  labels: model.matchLabels,
                  annotations: model.annotations
                },
                spec: {
                  tolerations: model.toleration,
                  affinity: model.affinity,
                  serviceAccountName: model.serviceAccount,
                  volumes: model.deploymentVolumes,
                  containers: [
                    {
                      name: model.containerName,
                      image: model.containerImage,
                      imagePullPolicy: model.containerImagePullPolicy,
                      ports: [ 
                        { 
                          name: model.containerName, 
                          containerPort: model.containerPort 
                        } 
                      ],
                      command: model.containerCommand,
                      args: model.containerArgs,
                      env: model.containerEnvironment,
                      resources: model.resources,
                      envFrom: model.containerEnvironmentFrom,
                      livenessProbe: model.livenessProbe,
                      readinessProbe: model.readinessProbe,
                      volumeMounts: model.containerVolumeMounts
                    }
                  ]
                }
              }
            }
          });
        }
}