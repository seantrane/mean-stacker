#!/usr/bin/env bash

PROCESS_ENV="local"

if [[ ! -z "${NODE_ENV:-}" ]]; then
  PROCESS_ENV=${NODE_ENV}
elif [[ ! -z "${ENV:-}" ]]; then
  PROCESS_ENV=${ENV}
fi

NODE_ENV=${PROCESS_ENV}
ENV=${PROCESS_ENV}

pm2 start ecosystem.config.js --env "$PROCESS_ENV"
