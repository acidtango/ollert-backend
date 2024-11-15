import { GleeFunction } from "@asyncapi/glee"

const cardAddedListener: GleeFunction = async ({ payload, channel }) => {
    console.log("cardAddedListener", payload, channel)

    return {reply: []}
}
export default cardAddedListener
