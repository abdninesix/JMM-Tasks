#!/bin/bash
set -e

# Run database migrations
php artisan migrate --force

# Start Laravel server on the Render-assigned port
php artisan serve --host=0.0.0.0 --port=$PORT