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
        super(scope, "Levis");
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
              name: serviceName,
              namespace: namespaceValue
            },
            spec: {
              type: 'ClusterIP',
              ports: [ { port: options.service.port, targetPort: options.service.port } ],
              selector: label
            }
          });
    }
    private generateDeployment(model: DeploymentModel): void {
        log.debug("generateDeployment");
        new Deployment(this, 'deployment', {
            metadata: {
              name: serviceName,
              namespace: namespaceValue
            },
            spec: {
              replicas: replicas,
              selector: {
                matchLabels: label
              },
              template: {
                metadata: {
                  labels: label,
                  annotations: annotationList
                },
                spec: {
                  imagePullSecrets: [
                    {
                      name: imagePullSecretName
                    }
                  ],
                  serviceAccountName: serviceAccount,
                  containers: [
                    {
                      name: serviceName,
                      image: secretImage,
                      ports: [ { containerPort: options.service.port } ],
                      livenessProbe: {
                        httpGet: {
                          path: serviceHealthCheckPath,
                          port: options.service.port
                        },
                        periodSeconds: serviceInitialDelaySeconds,
                        initialDelaySeconds: serviceHealthCheckIntervalSeconds
                      },
                      readinessProbe: {
                        httpGet: {
                          path: serviceHealthCheckPath,
                          port: options.service.port
                        },
                        periodSeconds: serviceInitialDelaySeconds,
                        initialDelaySeconds: serviceHealthCheckIntervalSeconds
                      },
                      resources: {
                        limits: {
                          cpu: cpuLimits,
                          memory: memoryLimits
                        },
                        requests: {
                          cpu:  cpuRequests,
                          memory: memoryRequests
                        }
                      }
                    }
                  ]
                }
              }
            }
          });
        }
    }
}
