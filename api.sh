rm types/*
asyncapi generate models typescript asyncapi.yml -o types  --tsExportType named --tsIncludeComments --tsModelType interface