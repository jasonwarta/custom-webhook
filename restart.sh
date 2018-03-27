#!/usr/bin/env bash
sleep 2
echo "in child"
kill `pgrep -f 'nodejs webhook.js'` 2>&1 1>/dev/null 
nodejs webhook.js