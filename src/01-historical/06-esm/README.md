# Dockerizing
## Dockerizing project in runtime
```shell
docker run --name "esm-project-mounted" --rm -p 8888:3002 -v ./:/app -w /app node:24.2.0-alpine -- server.js
```

## Building an image with the project
```shell
docker build -t "01-historical-06-esm:v1" .
```
Or we can debug the to-be content of the image by:
```shell
docker build -o image-content .
ls -l image-content/app
```

And finally run it:
```shell
docker run --name "esm-project-our-image" --rm -p 8888:3002 01-historical-06-esm:v1
```