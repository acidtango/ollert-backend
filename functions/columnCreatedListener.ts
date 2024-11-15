import { GleeFunction } from "@asyncapi/glee"

const columnCreatedListener: GleeFunction = async ({payload, channel}) => {
    console.log("columnCreatedListener", payload, channel)

    return {reply: []}
}
export default columnCreatedListener
