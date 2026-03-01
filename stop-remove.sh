#!/bin/bash

CONTAINER_NAME="node-web-app-container"

if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  echo ">> Stopping container..."
  docker stop $CONTAINER_NAME

  echo ">> Removing container..."
  docker rm $CONTAINER_NAME

  echo ">> Container removed successfully."
else
  echo ">> Container does not exist."
fi
