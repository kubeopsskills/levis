/* eslint-disable no-console */

export class Message {

    public static Instruction(): void {
        console.log("create: text");
        process.exit(1);
    } 

    public static CreateInstruction(): void{
        console.log("No -f parameter passed.");
        process.exit(1);
    }

}