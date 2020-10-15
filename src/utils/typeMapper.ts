import { EnvVar } from "../../libs/k8s";

export class TypeMapper {

    public static toEnvVar(containerEnv: { [key: string]: string }): EnvVar[]{
    
        const envVar: EnvVar[] = []
        let counter = 0
        for (const [key, value] of Object.entries(containerEnv)) {
            envVar[counter] = {
            name: key,
            value: value
            }
            counter++;
        }

        return envVar
    }
    
}