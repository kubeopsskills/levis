import { EnvFromSource, EnvVar, ResourceRequirements, RollingUpdateDeployment, Affinity } from "../../libs/k8s";
import { KubernetesMetadata } from "./kubernetesMetadata";

export interface DeploymentModel extends KubernetesMetadata  {
    revisionHistoryLimit: number;
    replicas: number;
    strategy: Strategy;
    matchLabels: { [key: string]: string };
    serviceAccount: string;
    containerName: string;
    containerImage: string;
    containerImagePullPolicy: string;
    containerPort: number;
    containerEnvironment?: EnvVar[];
    containerEnvironmentFrom?: EnvFromSource[]
    resources?: ResourceRequirements;
    probe: Probe;
    affinity?: Affinity;
}

interface Strategy {
    type: string;
    rollingUpdate: RollingUpdateDeployment;
}

interface Probe {
    readinessProbe: HealthCheckProbe;
    livenessProbe: HealthCheckProbe;

}

interface HealthCheckProbe {
    path: string;
    port: number;
    initialDelaySeconds: number;
    intervalSeconds: number;
    successThreshold: number;
    failureThreshold: number;
    timeoutSeconds: number;
}