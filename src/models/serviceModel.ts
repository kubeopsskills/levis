import { ServicePort } from "../../libs/k8s";
import { KubernetesMetadata } from "./kubernetesMetadata";

export interface ServiceModel extends KubernetesMetadata  {

    selector?: { [key: string]: string };
    type: string;
    servicePort?: ServicePort[];
}