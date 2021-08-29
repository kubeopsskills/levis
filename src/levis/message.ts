/* eslint-disable no-console */

export class Message {

    public static Instruction(): void {
        console.log("Levis Kubernetes Manifest Generator \n");
        console.log("USAGE: ");
        console.log("    levis [COMMAND] [FLAGS] [OPTIONS] \n");
        console.log("COMMAND: ");
        console.log("    create    Gerate kubernetes configuration\n");
        console.log("FLAGS: ");
        console.log("    -f  [OPTIONS]    Levis configuration path followd by OPTION ");
        // console.log("    -v, --version    Print version info and exit ");
        process.exit(1);
    } 

    public static CreateInstruction(): void{
        console.log("No -f parameter passed.");
        process.exit(1);
    }

}