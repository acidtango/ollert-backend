rm types/*
asyncapi generate models typescript asyncapi.yml -o types --tsExportType named --tsIncludeComments --tsModelType interface --tsRawPropertyNames --tsEnumType union
for file in types/*
do
    echo "" >> "$file"
done
cat types/* | grep -v import > types.ts
rm types/*
mv types.ts types/types.ts
npx ts-to-zod
