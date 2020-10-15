import { EnvVar, RollingUpdateDeployment } from "../../libs/k8s";
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
    resources?: ManagedResource;
    probe: Probe;
}

interface Strategy {
    type: string;
    rollingUpdate: RollingUpdateDeployment;
}

interface ManagedResource {
    requests?: RequiredResource;
    limits?: RequiredResource;
}

interface RequiredResource {
    cpu?: string;
    memory?: string;
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