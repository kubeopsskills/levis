export interface KubernetesMetadata {

    /**
     * 
     * KubernetesMetadata is metadata that all persisted resources must have, which includes all objects users must create.
     * 
     */
    name: string;
    namespace: string;
    labels?: { [key: string]: string };
    annotations?: { [key: string]: string };
    
}