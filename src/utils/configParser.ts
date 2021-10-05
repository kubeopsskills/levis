import { DeploymentModel, ServiceModel, LevisConfig } from "../models";
import * as Constants from "../models/constants";
import * as log4js from "log4js";
import { EnvVar, DeploymentStrategy, EnvFromSource, Volume, VolumeMount, Probe, Affinity, NodeSelectorRequirement, Toleration } from "../../libs/k8s";
import { TypeMapper } from ".";

const log = log4js.getLogger();

export class ConfigParser {

    private static isRollingUpdateEnable(type: string): boolean {
        return type == Constants.Deployment.STRATEGY_ROLLING_UPDATE;
    }
  
    private static createDeploymentStrategy(isCreate: boolean, maxSurge: string, maxUnavailable: string): DeploymentStrategy {
        if(!isCreate) return {
            type: "Recreate",
        };
        return {
            type: "RollingUpdate",
            rollingUpdate: {
                maxSurge: maxSurge,
                maxUnavailable: maxUnavailable
            }
        }
    }

    private static createEnvironmentFrom(configEnvName?: string, secretEnvName?: string): EnvFromSource[] {
       const envFrom: EnvFromSource[] = []
       if(configEnvName) {
          envFrom.push({
            configMapRef: {
                name: configEnvName,
            }
          })
       }
       if(secretEnvName) {
          envFrom.push({
            secretRef: {
                name: secretEnvName,
            }
        })
       }
       return envFrom;
    }

    private static createToleration(config: LevisConfig): Toleration[] | undefined {
        const toleration: Toleration[] = []
        const allower = config.levis.deployment.node?.allower || undefined;
        const keyList: Array<string> = ['effect', 'operator'];
        if(!allower) {
            return undefined;
        } 
        for(let i=0; i<allower?.length; i++) {
            for(const[key, value] of Object.entries(allower[i]) ){
                if(keyList.includes(key)){continue;}
                toleration.push({
                    effect: allower[i].effect,
                    operator: allower[i].operator,
                    key: key.toString(),
                    value: value ? value.toString(): ""
                })
            }
        }
        return toleration;
    }

    private static createAffinity(config: LevisConfig): Affinity {

        const mode: string = config.levis.deployment.node?.selector?.mode || "prefer";
        const operator: string = config.levis.deployment.node?.selector?.operator || "In";
        const labels: {[key: string]: string} = config.levis.deployment.node?.selector?.labels || {};

        if(mode.toLowerCase() === "require".toLowerCase()){
            return {
                nodeAffinity: {
                    requiredDuringSchedulingIgnoredDuringExecution: {
                        nodeSelectorTerms: [{
                            matchExpressions: this.createNodeSelectorRequirement(operator, labels)
                        }]
                    }
                }
            }
        }

        return {
            nodeAffinity: {
                preferredDuringSchedulingIgnoredDuringExecution: [{
                    weight: 1,
                    preference: {
                        matchExpressions: this.createNodeSelectorRequirement(operator, labels)
                    }
                }]
            }
        }
    }

    private static createNodeSelectorRequirement(operator: string, labels: {[key: string]: string}): NodeSelectorRequirement[] {
        const nodeSelectorReq: NodeSelectorRequirement[] = []
        for (const key in labels) {
            const value = labels[key];
            nodeSelectorReq.push({
                key: key,
                operator: operator,
                values: [
                  value
                ]
            })
        }
        return nodeSelectorReq;
    }

    private static createReadinessProbe(config: LevisConfig): Probe {
        const readinessProbe: Probe =  {
            initialDelaySeconds: config.levis.deployment.containers.readinessProbe?.initialDelaySeconds || Constants.Container.READINESS_INITIAL_DELAY_SECONDS,
            periodSeconds: config.levis.deployment.containers.readinessProbe?.intervalSeconds || Constants.Container.READINESS_PERIOD_SECONDS,
            successThreshold: config.levis.deployment.containers.readinessProbe?.successThreshold || Constants.Container.READINESS_SUCCESS_THRESHOLD,
            failureThreshold: config.levis.deployment.containers.readinessProbe?.failureThreshold || Constants.Container.READINESS_FAILURE_THRESHOLD,
            timeoutSeconds: config.levis.deployment.containers.readinessProbe?.timeoutSeconds || Constants.Container.READINESS_TIMEOUT_SECONDS,
        }
        switch(config.levis.deployment.containers.readinessProbe?.type){
            default:
            case Constants.Container.PROBE_TYPE_HTTP:
            readinessProbe.httpGet = {
                path: config.levis.deployment.containers.readinessProbe?.path || Constants.Container.LIVENESS_PATH,
                port: config.levis.deployment.containers.readinessProbe?.port || config.levis.deployment.containers.port,
            }
            break;
            case Constants.Container.PROBE_TYPE_SOCKET:
            readinessProbe.tcpSocket = {
                port: config.levis.deployment.containers.readinessProbe?.port || config.levis.deployment.containers.port,
            }
            break;
            case Constants.Container.PROBE_TYPE_COMMAND:
            readinessProbe.exec = {
                command: [
                    config.levis.deployment.containers.readinessProbe?.command || Constants.Container.PROBE_DEFAULT_COMMAND
                ]
            }    
            break;
        }
        return readinessProbe
    }

    private static createLivenessProbe(config: LevisConfig): Probe{
        const livenessProbe: Probe = { 
            initialDelaySeconds: config.levis.deployment.containers.livenessProbe?.initialDelaySeconds || Constants.Container.LIVENESS_INITIAL_DELAY_SECONDS,
            periodSeconds: config.levis.deployment.containers.livenessProbe?.intervalSeconds || Constants.Container.LIVENESS_PERIOD_SECONDS,
            successThreshold: config.levis.deployment.containers.livenessProbe?.successThreshold || Constants.Container.LIVENESS_SUCCESS_THRESHOLD,
            failureThreshold: config.levis.deployment.containers.livenessProbe?.failureThreshold || Constants.Container.LIVENESS_FAILURE_THRESHOLD,
            timeoutSeconds: config.levis.deployment.containers.livenessProbe?.timeoutSeconds || Constants.Container.LIVENESS_TIMEOUT_SECONDS,
        }
        switch(config.levis.deployment.containers.livenessProbe?.type) {
            default:
            case Constants.Container.PROBE_TYPE_HTTP:
            livenessProbe.httpGet = {
                path: config.levis.deployment.containers.livenessProbe?.path || Constants.Container.LIVENESS_PATH,
                port: config.levis.deployment.containers.livenessProbe?.port || config.levis.deployment.containers.port,
            }
            break;
            case Constants.Container.PROBE_TYPE_SOCKET:
            livenessProbe.tcpSocket = {
                port: config.levis.deployment.containers.livenessProbe?.port || config.levis.deployment.containers.port,
            }
            break;
            case Constants.Container.PROBE_TYPE_COMMAND:
            livenessProbe.exec = {
                command: [
                    config.levis.deployment.containers.livenessProbe?.command || Constants.Container.PROBE_DEFAULT_COMMAND
                ]
            }    
            break;
        }
        return livenessProbe
    }

    private static createEnvField(config: LevisConfig): EnvVar[] {
        
        const envVar: EnvVar[] = []
        const envField = config.levis.deployment.containers.envField || [];
        for (let i=0; i<envField?.length; i++){
            for(const [key, value] of Object.entries(envField[i])) {
                envVar.push(
                    {  
                        name: key,
                        valueFrom: {
                            fieldRef: {
                                apiVersion: envField[i].apiVersion || "v1",
                                fieldPath: value || "undefined"
                            }
                        }
                    }
                )
            }
        }
        
        return envVar;
    }

    private static createContainerVolumeMounts(config: LevisConfig): VolumeMount[] {
        const volumeMounts: VolumeMount[] = []
        if(config.levis.deployment.containers.volumeMounts){
            for (const val of config.levis.deployment.containers.volumeMounts) {
               volumeMounts.push({
                  name: val.name,
                  mountPath: val.mountPath,
                  subPath: val.subPath,
                  readOnly: val.readOnly
               })
            }
        }
        return volumeMounts
    }

    private static createDeploymentVolume(config: LevisConfig): Volume[] {
        const volume: Volume[] = []
        if(config.levis.deployment.containers.volumeMounts){
            for (const val of config.levis.deployment.containers.volumeMounts) {
               if (val.configName){
                volume.push({
                    name: val.name,
                    configMap: {
                      name: val.configName
                    }
                 })
               }
               else if(val.secretName){
                volume.push({
                    name: val.name,
                    secret: {
                      secretName: val.secretName
                    }
                 })
               }
               else {
                volume.push({
                    name: val.name,
                    emptyDir: {}
                 }) 
               }
            }
        }
        return volume
    }
      
    public static ParseService (config: LevisConfig): ServiceModel {
        const serviceName = config.levis.service?.name || config.levis.name;
        const deploymentName = config.levis.deployment.name || config.levis.name;
        const deploymentLabels = config.levis.deployment.labels || {app: deploymentName};
        const deploymentMatchLabels = config.levis.deployment.matchLabels || deploymentLabels;
        return {
            name: serviceName,
            namespace: config.levis.namespace || Constants.MetaData.DEFAULT_NAMESPACE,
            labels: config.levis.service?.labels || {app: serviceName},
            annotations: config.levis.service?.annotations,
            selector: config.levis.service?.selector || deploymentMatchLabels,
            type: config.levis.service?.type || Constants.Service.TYPE_CLUSTER_IP,
            portName: config.levis.service?.ports?.name || serviceName,
            port: config.levis.service?.ports?.port || config.levis.deployment.containers.port,
            targetPort: config.levis.service?.ports?.targetPort || config.levis.deployment.containers.port,
            nodePort: config.levis.service?.ports?.nodePort,
        };
    }

    public static ParseDeployment (config: LevisConfig): DeploymentModel {      
        const deploymentName = config.levis.deployment.name || config.levis.name;
        const deploymentLabels = config.levis.deployment.labels || {app: deploymentName};
        const envLevis = config.levis.deployment.containers.env;
        const envFieldLevis = config.levis.deployment.containers.envField;
        const env: EnvVar[] = envLevis ? TypeMapper.toEnvVar(envLevis): [];
        const envField: EnvVar[] = envFieldLevis ? this.createEnvField(config): [];
        const containerEnv = [...env, ...envField];
        const rollingUpdateType: string = config.levis.deployment.strategy?.type || Constants.Deployment.STRATEGY_ROLLING_UPDATE;
        const maxSurge: string = config.levis.deployment.strategy?.rollingUpdate?.maxSurge || Constants.Deployment.ROLLING_UPDATE_MAX_SURGE;
        const maxUnavailable: string = config.levis.deployment.strategy?.rollingUpdate?.maxUnavailable || Constants.Deployment.ROLLING_UPDATE_MAX_UNAVAILABLE;
        const affinity = config.levis.deployment.node?.selector ? this.createAffinity(config): {};
        const toleration: Toleration[]| undefined = config.levis.deployment.node?.allower ? this.createToleration(config): undefined;
        log.debug("affinity: ", JSON.stringify(affinity));
        const strategy = this.createDeploymentStrategy(
            this.isRollingUpdateEnable(rollingUpdateType),
            maxSurge,
            maxUnavailable
        );     
        log.debug("strategy: ", strategy);
        log.debug("envVar: ", containerEnv);
        return {
            name: deploymentName,
            namespace: config.levis.namespace || Constants.MetaData.DEFAULT_NAMESPACE ,
            labels: deploymentLabels,
            annotations: config.levis.deployment.annotations ,
            serviceAccount:config.levis.deployment.serviceAccount || Constants.Pod.DEFAULT_SERVICE_ACCOUNT ,
            revisionHistoryLimit:config.levis.deployment.revisionHistoryLimit || Constants.Deployment.REVISION_HISTORY_LIMIT,
            replicas: config.levis.deployment.replicas,
            strategy: strategy,
            matchLabels: config.levis.deployment.matchLabels || deploymentLabels,
            containerName: config.levis.deployment.containers?.name || deploymentName,
            containerImage: config.levis.deployment.containers?.image,
            containerImagePullPolicy: config.levis.deployment.containers?.imagePullPolicy || Constants.Container.IMAGE_PULL_POLICY,
            containerPort: config.levis.deployment.containers?.port,
            containerEnvironment: containerEnv,
            containerEnvironmentFrom: this.createEnvironmentFrom(config.levis.deployment.containers.configEnvName, config.levis.deployment.containers.secretEnvName),
            resources: config.levis.deployment.containers.resources,
            readinessProbe: this.createReadinessProbe(config),
            livenessProbe: this.createLivenessProbe(config),
            deploymentVolumes: this.createDeploymentVolume(config),
            containerVolumeMounts: this.createContainerVolumeMounts(config),
            affinity: affinity,
            toleration: toleration
        };
    }
}