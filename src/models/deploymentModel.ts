import { KubernetesMetadata } from "./kubernetesMetadata";

export interface DeploymentModel extends KubernetesMetadata  {
    serviceAccount?: string;
    revisionHistoryLimit?: number;
    replicas?: number;
    strategy?: Strategy;
    matchLabels?: { [key: string]: string };
    containerName?: string;
    containerImage: string;
    containerImagePullPolicy?: string;
    containerPort: number;
    containerEnvironment: { [key: string]: string };
    resources?: ManagedResource;
    probe?: Probe;
}

interface Strategy {
    type?: string;
    rollingUpdate?: RollingUpdate;
}

interface RollingUpdate {
    maxUnavailable?: string;
    maxSurge?: string;
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
    readinessProbe?: HealthCheckProbe;
    livenessProbe?: HealthCheckProbe;

}

interface HealthCheckProbe {
    path?: string;
    port?: number;
    initialDelaySeconds?: number;
    intervalSeconds?: number;
    successThreshold?: number;
    failureThreshold?: number;
    timeoutSeconds?: number;
}