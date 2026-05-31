#!/usr/bin/env bash

set -euo pipefail

SSH_USER="${SSH_USER:-root}"
SSH_HOST="${SSH_HOST:-de1zyeu.tech}"
SSH_PORT="${SSH_PORT:-22}"
SSH_KEY="${SSH_KEY:-}"

APP_NAME="${APP_NAME:-project-mystery}"
REMOTE_APP_DIR="${REMOTE_APP_DIR:-/opt/${APP_NAME}}"
HOST_PORT="${HOST_PORT:-4173}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REMOTE="${SSH_USER}@${SSH_HOST}"

SSH_OPTS=(-p "$SSH_PORT" -o StrictHostKeyChecking=accept-new)
RSYNC_OPTS=(-az --delete --exclude='.git' --exclude='node_modules' --exclude='.env*' --exclude='.cache' --exclude='.tmp')
if [[ -n "$SSH_KEY" ]]; then
  SSH_OPTS+=(-i "$SSH_KEY")
  RSYNC_OPTS+=(-e "ssh -p $SSH_PORT -i $SSH_KEY -o StrictHostKeyChecking=accept-new")
else
  RSYNC_OPTS+=(-e "ssh -p $SSH_PORT -o StrictHostKeyChecking=accept-new")
fi

echo "Deploying ${APP_NAME} to ${REMOTE}:${REMOTE_APP_DIR}"

ssh "${SSH_OPTS[@]}" "$REMOTE" "mkdir -p '$REMOTE_APP_DIR'"
rsync "${RSYNC_OPTS[@]}" "$SCRIPT_DIR/" "${REMOTE}:${REMOTE_APP_DIR}/"

if [[ -f "$SCRIPT_DIR/.env.local" ]]; then
  if [[ -n "$SSH_KEY" ]]; then
    scp -P "$SSH_PORT" -i "$SSH_KEY" "$SCRIPT_DIR/.env.local" "${REMOTE}:${REMOTE_APP_DIR}/.env.local"
  else
    scp -P "$SSH_PORT" "$SCRIPT_DIR/.env.local" "${REMOTE}:${REMOTE_APP_DIR}/.env.local"
  fi
fi

ssh "${SSH_OPTS[@]}" "$REMOTE" "
  set -e
  command -v docker >/dev/null 2>&1 || { curl -fsSL https://get.docker.com | sh; }
  cd '$REMOTE_APP_DIR'
  docker build -t ${APP_NAME}:latest .
  docker stop ${APP_NAME} 2>/dev/null || true
  docker rm ${APP_NAME} 2>/dev/null || true
  if [ -f '${REMOTE_APP_DIR}/.env.local' ]; then
    docker run -d \
      --name ${APP_NAME} \
      --restart unless-stopped \
      -p ${HOST_PORT}:4173 \
      --env-file '${REMOTE_APP_DIR}/.env.local' \
      ${APP_NAME}:latest
  else
    docker run -d \
      --name ${APP_NAME} \
      --restart unless-stopped \
      -p ${HOST_PORT}:4173 \
      ${APP_NAME}:latest
  fi
  docker ps --filter name=${APP_NAME} --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
"

echo "Live app container: http://${SSH_HOST}:${HOST_PORT}/projectmystery/"
echo "Expected public route after reverse proxy: https://${SSH_HOST}/projectmystery/"
