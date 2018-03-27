#!/usr/bin/env bash

git reset --hard && git pull
./restart.sh &
echo "spawned child"
exit 0