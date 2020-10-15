import { DeploymentModel, ServiceModel, LevisConfig } from "../models";
import * as Constants from "../models/constants";

export class ConfigParser {

    
    public static ParseService (config: LevisConfig): ServiceModel {

        return {
            name: config.levis.service.name || config.levis.name,
            namespace: config.levis.namespace || Constants.MetaData.DEFAULT_NAMESPACE,
            labels: config.levis.service.labels || [{app: this.name}],
            annotations: config.levis.service.annotations,
            selector: config.levis.service.selector || config.levis.deployment.matchLabels,
            type: config.levis.service.type || Constants.Service.TYPE_CLUSTER_IP,
            portName: config.levis.service.ports.name || this.name,
            port: config.levis.service.ports.port || config.levis.deployment.containers.port,
            targetPort: config.levis.service.ports.targetPort || config.levis.deployment.containers.port,
            nodePort: config.levis.service.ports.nodePort,
        };
    }

    public static ParseDeployment (config: LevisConfig): DeploymentModel {
        
        return {
            name: config.levis.deployment.name || config.levis.name ,
            namespace: config.levis.namespace || Constants.MetaData.DEFAULT_NAMESPACE ,
            labels: config.levis.deployment.labels || [{app: this.name}],
            annotations: config.levis.deployment.annotations ,
            serviceAccount:config.levis.deployment.serviceAccount || Constants.Pod.DEFAULT_SERVICE_ACCOUNT ,
            revisionHistoryLimit:config.levis.deployment.revisionHistoryLimit || Constants.Deployment.REVISION_HISTORY_LIMIT,
            replicas:config.levis.deployment.replicas || Constants.Deployment.REPLICAS,
            strategy:{
                type: config.levis.deployment.strategy.type || Constants.Deployment.STRATEGY_ROLLING_UPDATE,
                rollingUpdate: {
                    maxSurge: config.levis.deployment.strategy.rollingUpdate.maxSurge || Constants.Deployment.ROLLING_UPDATE_MAX_SURGE,
                    maxUnavailable: config.levis.deployment.strategy.rollingUpdate.maxUnavailable || Constants.Deployment.ROLLING_UPDATE_MAX_UNAVAILABLE
                }
            }, 
            matchLabels: config.levis.deployment.matchLabels || [{app: this.name}],
            containerName: config.levis.deployment.containers.name || this.name,
            containerImage: config.levis.deployment.containers.image,
            containerImagePullPolicy: config.levis.deployment.containers.imagePullPolicy || Constants.Container.IMAGE_PULL_POLICY,
            containerPort: config.levis.deployment.containers.port,
            containerEnvironment: config.levis.deployment.containers.env,
            resources: {
                requests: {
                    cpu: config.levis.deployment.containers.resources.requests.cpu,
                    memory: config.levis.deployment.containers.resources.requests.memory
                },
                limits: {
                    cpu: config.levis.deployment.containers.resources.limits.cpu,
                    memory: config.levis.deployment.containers.resources.limits.memory
                } 
            },
            probe: {
                readinessProbe: {
                    path: config.levis.deployment.containers.readinessProbe.path || Constants.Container.READINESS_PATH,
                    port: config.levis.deployment.containers.readinessProbe.port || config.levis.deployment.containers.port,
                    initialDelaySeconds: config.levis.deployment.containers.readinessProbe.initialDelaySeconds || Constants.Container.READINESS_INITIAL_DELAY_SECONDS,
                    intervalSeconds: config.levis.deployment.containers.readinessProbe.intervalSeconds || Constants.Container.READINESS_PERIOD_SECONDS,
                    successThreshold: config.levis.deployment.containers.readinessProbe.successThreshold || Constants.Container.READINESS_SUCCESS_THRESHOLD,
                    failureThreshold: config.levis.deployment.containers.readinessProbe.failureThreshold || Constants.Container.READINESS_FAILURE_THRESHOLD,
                    timeoutSeconds: config.levis.deployment.containers.readinessProbe.timeoutSeconds || Constants.Container.READINESS_TIMEOUT_SECONDS,
                },
                livenessProbe: {
                    path: config.levis.deployment.containers.livenessProbe.path || Constants.Container.LIVENESS_PATH,
                    port: config.levis.deployment.containers.livenessProbe.port || config.levis.deployment.containers.port,
                    initialDelaySeconds: config.levis.deployment.containers.livenessProbe.initialDelaySeconds || Constants.Container.LIVENESS_INITIAL_DELAY_SECONDS,
                    intervalSeconds: config.levis.deployment.containers.livenessProbe.intervalSeconds || Constants.Container.LIVENESS_PERIOD_SECONDS,
                    successThreshold: config.levis.deployment.containers.livenessProbe.successThreshold || Constants.Container.LIVENESS_SUCCESS_THRESHOLD,
                    failureThreshold: config.levis.deployment.containers.livenessProbe.failureThreshold || Constants.Container.LIVENESS_FAILURE_THRESHOLD,
                    timeoutSeconds: config.levis.deployment.containers.livenessProbe.timeoutSeconds || Constants.Container.LIVENESS_TIMEOUT_SECONDS,
                }
            },
        };
    }
}