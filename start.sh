#!/bin/bash

docker build -t node-study .
docker run --rm -d --name node-study-container node-study "Hello from container"