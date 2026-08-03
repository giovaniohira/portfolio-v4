#!/usr/bin/env bash
# Kill switch: swap giovaniohira.com between portfolio v3 (static) and v4 (Next export).
# Usage: portfolio-switch v3|v4|status
set -euo pipefail

WEB="/var/www/giovaniohira.com"
V3="$WEB/current"
V4="$WEB/v4/current"
ACTIVE="$WEB/active"

usage() {
  echo "Usage: portfolio-switch v3|v4|status"
  exit 1
}

mode="${1:-}"
[[ -n "$mode" ]] || usage

case "$mode" in
  v3)
    ln -sfn "$V3" "$ACTIVE"
    echo "active -> v3 ($V3)"
    ;;
  v4)
    ln -sfn "$V4" "$ACTIVE"
    echo "active -> v4 ($V4)"
    ;;
  status)
    echo "active -> $(readlink -f "$ACTIVE" 2>/dev/null || readlink "$ACTIVE")"
    exit 0
    ;;
  *)
    usage
    ;;
esac

nginx -t
systemctl reload nginx
echo "nginx reloaded"
