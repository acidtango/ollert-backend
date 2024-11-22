rm types/*
npm run generate-models
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
