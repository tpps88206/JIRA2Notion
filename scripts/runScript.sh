#!/bin/bash

if [ -f "./server/src/configs/serviceAccountKey.json" ]; then
    docker build -f scripts/Dockerfile -t jira2notion:latest .
    docker stop jira2notion || true
    docker rm jira2notion || true
    docker run --name jira2notion -dit jira2notion
    docker image prune -f
else
    echo "Error ./server/src/configs/serviceAccountKey.json does not exists."
fi