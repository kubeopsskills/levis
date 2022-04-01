import { EnvFromSource, EnvVar, ResourceRequirements, Volume, VolumeMount, Affinity, Probe, DeploymentStrategy, Toleration } from "../../libs/k8s";
import { KubernetesMetadata } from "./kubernetesMetadata";

export interface DeploymentModel extends KubernetesMetadata  {
    revisionHistoryLimit: number;
    replicas?: number;
    strategy: DeploymentStrategy;
    matchLabels: { [key: string]: string };
    serviceAccount: string;
    deploymentVolumes?: Volume[];
    containerName: string;
    containerImage: string;
    containerImagePullPolicy: string;
    containerPort: number;
    containerEnvironment?: EnvVar[];
    containerEnvironmentFrom?: EnvFromSource[];
    containerCommand?: string[];
    containerArgs?: string[];
    containerVolumeMounts?: VolumeMount[];
    resources?: ResourceRequirements;
    livenessProbe: Probe;
    readinessProbe: Probe;
    affinity?: Affinity;
    toleration?: Toleration[] | undefined;
}