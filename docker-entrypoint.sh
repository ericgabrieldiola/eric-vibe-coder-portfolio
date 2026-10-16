#!/bin/sh
set -e

# Render assigns the HTTP port via the PORT environment variable (default: 10000)
PORT="${PORT:-10000}"

# Dynamically adjust Apache ports.conf and virtual host configuration to match PORT
sed -i "s/Listen [0-9]*/Listen ${PORT}/g" /etc/apache2/ports.conf
sed -i "s/<VirtualHost \*:[0-9]*>/<VirtualHost \*:${PORT}>/g" /etc/apache2/sites-available/000-default.conf

exec "$@"
