#!/bin/bash

if [ -f "./server/configs/serviceAccountKey.json" ]; then
    docker build -f scripts/Dockerfile -t jira2notion:latest .
    docker stop jira2notion
    docker rm jira2notion
    docker run --name jira2notion -dit jira2notion
    docker image prune -f
else
    echo "Error ./server/configs/serviceAccountKey.json does not exists."
fi