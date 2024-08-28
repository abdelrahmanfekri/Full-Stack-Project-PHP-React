# Dockerfile for PHP backend using built-in server

# Use an official PHP CLI image
FROM php:8.1-cli

# Set the working directory
WORKDIR /var/www/html

# Install PHP extensions and other dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install zip pdo_mysql mysqli

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy Composer files
COPY composer.json composer.lock ./

# Install Composer dependencies
RUN composer install --no-scripts --no-autoloader

# Copy the application source code
COPY . .

# Generate optimized autoloader
RUN composer dump-autoload --optimize

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose port 8000 for PHP's built-in server
EXPOSE 8000

# Start PHP's built-in server
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]