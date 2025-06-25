```
ocker run --rm -p 8888:3002 -v ./:/app 01-historical-06-esm:v1 node app/server.js

docker container inspect <name>

docker build -t 01-historical-06-esm:v1 .

docker run -p 8888:3002 01-historical-06-esm:v1 -it /bin/sh
```