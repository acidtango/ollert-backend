rm types/*
/Users/danielramos/Documents/repos/others/cli/bin/run_bin generate models typescript asyncapi.yml -o types --tsExportType named --tsIncludeComments --tsModelType interface --tsRawPropertyNames --tsEnumType union
for file in types/*
do
    echo "" >> "$file"
done
cat types/* \
    | grep -v import \
    | grep -v export \
    | sed 's/interface /export interface /g' \
    | sed 's/type /export type /g' \
    > types.ts
rm types/*
mv types.ts types/types.ts
npx ts-to-zod
