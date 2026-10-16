# Use official PHP 8.3 Apache image
FROM php:8.3-apache

# Install CA certificates for secure TLS/SSL remote database connections and required libraries
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    libonig-dev \
    && rm -rf /var/lib/apt/lists/* \
    && update-ca-certificates

# Install required PHP extensions (pdo_mysql, mbstring)
RUN docker-php-ext-install -j$(nproc) pdo_mysql mbstring

# Enable Apache rewrite and headers modules
RUN a2enmod rewrite headers

# Render default HTTP port
ENV PORT=10000
EXPOSE 10000

# Configure Apache virtual host and ports to listen on Render's port 10000 by default
RUN sed -i 's/Listen 80/Listen 10000/' /etc/apache2/ports.conf \
    && sed -i 's/<VirtualHost \*:80>/<VirtualHost \*:10000>/' /etc/apache2/sites-available/000-default.conf

# Custom Apache configuration:
# - Prioritize index.html and index.php as directory indices
# - Allow .htaccess overrides
# - Hide sensitive directory listings and server tokens
RUN { \
    echo '<Directory /var/www/html/>'; \
    echo '    DirectoryIndex index.html index.php'; \
    echo '    Options -Indexes +FollowSymLinks'; \
    echo '    AllowOverride All'; \
    echo '    Require all granted'; \
    echo '</Directory>'; \
    echo 'ServerSignature Off'; \
    echo 'ServerTokens Prod'; \
} > /etc/apache2/conf-available/portfolio.conf \
    && a2enconf portfolio

# Copy project files to Apache document root
COPY . /var/www/html/

# Copy and install entrypoint script for dynamic port adjustment
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Set correct ownership and permissions for the Apache web user
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
