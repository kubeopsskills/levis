import { ResourceRequirements } from "../../libs/k8s";

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
    resources?: ResourceRequirements;
    livenessProbe?: LivenessProbe;
    readinessProbe?: ReadinessProbe;
    configEnvName?: string;
    secretEnvName?: string; 
}

/* Container Probe */
interface LivenessProbe {
    path?: string;
    port?: number;
    initialDelaySeconds?: number;
    intervalSeconds?: number;
    successThreshold?: number;
    failureThreshold?: number;
    timeoutSeconds?: number;
}

interface ReadinessProbe {
    path?: string;
    port?: number;
    initialDelaySeconds?: number;
    intervalSeconds?: number;
    successThreshold?: number;
    failureThreshold?: number;
    timeoutSeconds?: number;
}

/* Service Section */
interface Service {
    name?: string;
    labels?: { [key: string]: string };
    annotations?: { [key: string]: string };
    selector?: { [key: string]: string };
    type?: string;
    ports?: Ports;
}

interface Ports {
    name?: string;
    port?: number;
    targetPort?: number;
    nodePort?: number;
}