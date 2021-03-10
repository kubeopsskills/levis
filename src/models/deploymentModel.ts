import { EnvFromSource, EnvVar, ResourceRequirements, RollingUpdateDeployment, Affinity, Probe } from "../../libs/k8s";
import { KubernetesMetadata } from "./kubernetesMetadata";

export interface DeploymentModel extends KubernetesMetadata  {
    revisionHistoryLimit: number;
    replicas?: number;
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
    livenessProbe: Probe;
    readinessProbe: Probe;
    affinity?: Affinity;
}

interface Strategy {
    type: string;
    rollingUpdate: RollingUpdateDeployment;
}