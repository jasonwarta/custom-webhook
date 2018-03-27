#!/usr/bin/env bash

kill `pgrep -f 'nodejs webhook.js'`
nodejs webhook.js