import { DeploymentModel, ServiceModel } from "../models";

export class ConfigParser {
    
    public static ParseService (config: LevisConfig): ServiceModel {
        
        return {
            name: "",
            namespace: "",
        };
    }

    public static ParseDeployment (config: LevisConfig): DeploymentModel {
        
        return {
            name: "",
            namespace: "",
        };
    }
}