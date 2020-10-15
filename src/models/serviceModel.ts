import { KubernetesMetadata } from "./kubernetesMetadata";

export interface ServiceModel extends KubernetesMetadata  {

    selector?: { [key: string]: string };
    type: string;
    portName: string; 
    port: number;
    targetPort: number;
    nodePort?: number;
    
}