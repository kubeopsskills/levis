import * as log4js from "log4js";
import * as YAML from "yamljs";
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
        log.debug(command.configFilePath);
        const configFilePath = command.configFilePath;
        const config: LevisConfig = YAML.load(configFilePath);
        this.generateService(ConfigParser.ParseService(config));
        this.generateDeployment(ConfigParser.ParseDeployment(config));
    }

    private generateService(model: ServiceModel): void {
      log.debug("generateService");
      new Service(this, 'service', {
        metadata: {
          name: model.name,
          namespace: model.namespace,
          labels: model.labels,
          annotations: model.annotations,
        },
        spec: {
          type: model.type,
          ports: [ 
            { 
              name: model.name, 
              port: model.port, 
              targetPort: model.targetPort, 
              nodePort: model.nodePort 
            } 
          ],
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
              strategy: {
                type: model.strategy.type,
                rollingUpdate: model.strategy.rollingUpdate
              },
              selector: {
                matchLabels: model.matchLabels
              },
              template: {
                metadata: {
                  labels: model.matchLabels,
                  annotations: model.annotations
                },
                spec: {
                  serviceAccountName: model.serviceAccount,
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
                      env: model.containerEnvironment,
                      livenessProbe: {
                        httpGet: {
                          path: model.probe.livenessProbe.path,
                          port: model.probe.livenessProbe.port
                        },
                        periodSeconds: model.probe.livenessProbe.intervalSeconds,
                        initialDelaySeconds: model.probe.livenessProbe.initialDelaySeconds,
                        successThreshold: model.probe.livenessProbe.successThreshold,
                        failureThreshold: model.probe.livenessProbe.failureThreshold,
                        timeoutSeconds: model.probe.livenessProbe.timeoutSeconds
                      },
                      readinessProbe: {
                        httpGet: {
                          path: model.probe.readinessProbe.path,
                          port: model.probe.readinessProbe.port
                        },
                        periodSeconds: model.probe.readinessProbe.intervalSeconds,
                        initialDelaySeconds: model.probe.readinessProbe.initialDelaySeconds,
                        successThreshold: model.probe.readinessProbe.successThreshold,
                        failureThreshold: model.probe.readinessProbe.failureThreshold,
                        timeoutSeconds: model.probe.readinessProbe.timeoutSeconds
                      },
                      resources: model.resources
                    }
                  ]
                }
              }
            }
          });
        }
}