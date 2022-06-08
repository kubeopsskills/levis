import { ResourceRequirements, ServicePort } from "../../libs/k8s";

export interface LevisConfig {
    levis: Levis;
}

interface Levis {
    name: string;
    namespace: string;
    deployment: Deployment;
    service?: Service;
}

/* Deployment Section */
interface Deployment {
  name?: string;
  labels?: { [key: string]: string };
  annotations?: { [key: string]: string };
  revisionHistoryLimit?: number;
  replicas?: number;
  strategy?: Strategy;
  matchLabels?: { [key: string]: string };
  serviceAccount?: string;
  containers: Containers;
  node?: Node;
  enableHealthCheck?: boolean;
}

interface Node {
    selector?: NodeSelector;
    allower?: NodeAllower[];
}

// Mapping to Affinity on Kubernetes Configuration
interface NodeSelector {
    mode?: string;
    operator?: string;
    labels: { [key: string]: string };
}

// Mapping to Toleration on Kubernetes Configuration
interface NodeAllower {
    effect?: string;
    operator?: string;
    [key: string]: string | undefined;
}

/* Deployment Strategy */
interface Strategy {
    type?: string;
    rollingUpdate?: RollingUpdate;
}

interface RollingUpdate {
    maxSurge?: string;
    maxUnavailable?: string;
}

/* Deployment Container */
interface Containers {
    name?: string;
    image: string;
    imagePullPolicy?: string;
    port: number;
    env?: { [key: string]: string };
    envField?: EnvField[];
    command?: string[];
    args?: string[];
    resources?: ResourceRequirements;
    livenessProbe?: LivenessProbe;
    readinessProbe?: ReadinessProbe;
    configEnvName?: string;
    secretEnvName?: string; 
    volumeMounts?: Volume[];
    terminationGracePeriodSeconds?: number;
}

/* Container Probe */
interface LivenessProbe {
    type?: string;
    path?: string;
    command?: string;
    port?: number;
    initialDelaySeconds?: number;
    periodSeconds?: number;
    successThreshold?: number;
    failureThreshold?: number;
    timeoutSeconds?: number;
}

interface ReadinessProbe {
    type?: string;
    path?: string;
    command?: string;
    port?: number;
    initialDelaySeconds?: number;
    periodSeconds?: number;
    successThreshold?: number;
    failureThreshold?: number;
    timeoutSeconds?: number;
}

interface Volume {
    name: string;
    mountPath: string;
    subPath?: string;
    readOnly: boolean;
    secretName?: string;
    configName?: string;
    claimName?: string
}

interface EnvField {
    apiVersion?: string;
    [key: string]: string | undefined;
}

/* Service Section */
interface Service {
    name?: string;
    enabled?: boolean;
    labels?: { [key: string]: string };
    annotations?: { [key: string]: string };
    selector?: { [key: string]: string };
    type?: string;
    ports?: ServicePort[];
}