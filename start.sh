#!/bin/bash

IMAGE_NAME="node-web-app"
CONTAINER_NAME="node-web-app-container"
PORT=3000

echo ">> Building image..."
docker build -t $IMAGE_NAME .

# Remove container antigo se existir
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  echo ">> Removing old container..."
  docker rm -f $CONTAINER_NAME
fi

echo ">> Starting container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p $PORT:3000 \
  --restart unless-stopped \
  $IMAGE_NAME

echo ">> Application running at http://localhost:$PORT"
