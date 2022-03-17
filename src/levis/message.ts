/* eslint-disable no-console */

export class Message {

    public static Instruction(): void {
        console.log("Levis Kubernetes Manifest Generator \n");
        console.log("USAGE: ");
        console.log("    levis [COMMAND] [FLAGS] [OPTIONS] \n");
        console.log("COMMAND: ");
        console.log("    create [FLAGS] Generate kubernetes configuration\n");
        console.log("FLAGS: ");
        console.log("    -f  [OPTIONS] Levis configuration path");
        console.log("    -o  [OPTIONS] Output of kubernetes configuration file ");
        console.log("    -v  [OPTIONS] log level 1: info (default) 2: debug ");
        console.log("    version    Print version info and exit ");
        process.exit(0);
    } 

    public static CreateInstruction(): void{
        console.log("No -f parameter passed.");
        process.exit(1);
    }

}