import DockerStreamOutput from "../types/dockerStreamOutout";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";

export default function decodeDockerString(buffer:Buffer):DockerStreamOutput{
    let offset = 0; // this variable keeps trackof the current position in the buffer while parsing

    // Output that will store the accumulated stdout and stderr output as string
    const output: DockerStreamOutput = {stdout:'',stderr:''};

    // loop until offset reaches end of the buffer
    while(offset < buffer.length){
        //typeofStream is read from buffer and has the value of type of stream
        const typeofStream = buffer[offset];

        // This lenght variable hold the length of the value
        // we will read this variable on an offset of 4 bytes from the start of the chunk
        const length = buffer.readUint32BE(offset + 4);

        // as now we have read the header, we can move forward to the value of the chunk
        offset += DOCKER_STREAM_HEADER_SIZE;

        if(typeofStream === 1){
            //stdout stream
            output.stdout += buffer.toString('utf-8',offset,offset + length)
        } else if(typeofStream === 2){
            //stderr stream
            output.stderr += buffer.toString('utf-8',offset,offset + length)
        }
        offset += length; // move offset to next chunk
    }

    return output;
}