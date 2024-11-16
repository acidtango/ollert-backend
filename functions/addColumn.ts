import { GleeFunction } from "@asyncapi/glee"

const addColumn: GleeFunction = async ({ payload, channel }) => {
    console.log("addColumn", payload, channel)

    return {reply: []}
}

export default addColumn
