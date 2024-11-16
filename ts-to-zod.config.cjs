/**
 * ts-to-zod configuration.
 *
 * @type {import("ts-to-zod").TsToZodConfig}
 */
module.exports = { input: "types/types.ts", output: "types/types.zod.ts", getSchemaName: (id) => id + "Schema" };
