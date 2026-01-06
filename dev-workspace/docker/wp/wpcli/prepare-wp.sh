#! /bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

show_header() {
    echo -e "\n${BLUE}=============================================================="
    echo ""
    echo -e "🚀 $1"
}

show_status() {
    echo -e "${GREEN}✓ $1${NC}"
}

show_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

show_error() {
    echo -e "${RED}✗ $1${NC}"
}

ENVIRONMENT_TYPE=$3

# Cleanup the done flag
rm -f /tmp/prepare-wp.sh.done

# Ensure proper permissions on mounted volumes
chmod -R 777 /var/www/html 2>/dev/null || true
chmod 777 /project 2>/dev/null || true

# Clean up the database
show_header "Cleaning up the database"
wp db reset --yes --allow-root
show_status "Database reset completed successfully"

# Install WordPress
show_header "WordPress installation"
if wp core is-installed --allow-root; then
    show_status "WordPress is already installed"
else
    wp core install --url="$1" --title="$2" --admin_user="admin" --admin_password="admin" --admin_email="test@example.com" --skip-email --allow-root
    show_status "WordPress installed successfully"
fi

# Make sure WP is updated
show_header "Updating WordPress"
wp core update --allow-root
show_status "WordPress core updated successfully"

# Make sure the database is up to date
show_header "Updating the database"
wp core update-db --allow-root
show_status "Database updated successfully"

# Make sure all plugins are updated
show_header "Updating all plugins"
wp plugin update --all --allow-root
show_status "All plugins updated successfully"

# Make sure all themes are updated
show_header "Updating all themes"
wp theme update --all --allow-root
show_status "All themes updated successfully"

# Install Classic Editor
show_header "Installing Classic Editor"
wp plugin install classic-editor --activate --allow-root
show_status "Classic Editor installed and activated"

# Install Spatie Ray as must-use plugin
show_header "Installing Spatie Ray as must-use plugin"
echo -e "${YELLOW}Cleaning up previous Spatie Ray installation...${NC}"
rm -rf /var/www/html/wp-content/mu-plugins/spatie-ray

echo -e "${YELLOW}Installing Spatie Ray plugin...${NC}"
wp plugin install spatie-ray --activate --allow-root

echo -e "${YELLOW}Setting up as must-use plugin...${NC}"
mkdir -p /var/www/html/wp-content/mu-plugins
mv /var/www/html/wp-content/plugins/spatie-ray /var/www/html/wp-content/mu-plugins/spatie-ray
show_status "Spatie Ray configured as must-use plugin"

echo -e "${YELLOW}Configuring environment type in wp-config.php...${NC}"
wp config set WP_ENVIRONMENT_TYPE "local" --allow-root
show_status "Environment type set to 'local'"

# Enable HTTP mocking for test environment
if [ "$ENVIRONMENT_TYPE" = "TEST" ]; then
    wp config set PP_HUB_ENABLE_HTTP_MOCK "true" --raw --allow-root
    show_status "HTTP mocking enabled for test environment"
fi

# Update MailHog options
show_header "Updating MailHog options"
wp config set WP_MAILHOG_SMTP_HOST "mailhog" --allow-root
wp config set WP_MAILHOG_SMTP_PORT "1025" --allow-root
wp config set WP_MAILHOG_MAIL_FROM "test@example.com" --allow-root
wp config set WP_MAILHOG_MAIL_FROM_NAME "Test Email" --allow-root
wp option update admin_email "test@example.com" --allow-root
wp option update new_admin_email "test@example.com" --allow-root
show_status "MailHog configuration completed"

show_header "Bypassing admin email verification"
# Bypass admin email verification
wp option update admin_email_lifespan 2060442225 --allow-root
show_status "Admin email verification bypassed"

# Update configuration
show_header "Updating configuration"
echo -e "${YELLOW}Setting debug options...${NC}"
wp config set WP_DEBUG true --raw --allow-root
wp config set WP_DEBUG_LOG "/var/www/html/wp-content/debug.log" --allow-root
wp config set WP_DEBUG_DISPLAY false --raw --allow-root
wp config set SCRIPT_DEBUG true --raw --allow-root
show_status "Debug configuration completed"

# Activate publishpress-hub
show_header "Activating publishpress-hub"
wp plugin activate publishpress-hub --allow-root
show_status "publishpress-hub activated successfully"

# Activate dummy-plugin-1
show_header "Activating dummy-plugin-1"
wp plugin activate dummy-plugin-1 --allow-root
show_status "dummy-plugin-1 activated successfully"

# Activate dummy-plugin-2
show_header "Activating dummy-plugin-2"
wp plugin activate dummy-plugin-2 --allow-root
show_status "dummy-plugin-2 activated successfully"

# Create the application password
show_header "Creating application password"

if wp user application-password exists admin api-tests --allow-root; then
    wp user application-password delete admin api-tests --allow-root
fi
PASSWORD=$(wp user application-password create admin api-tests --porcelain --allow-root)

echo -e "${YELLOW}Application password: $PASSWORD${NC}"

# Update the application password in the .env file
echo -e "${YELLOW}Updating the application password in the .env file...${NC}"
sed -i "s/WP_${ENVIRONMENT_TYPE}_APP_PASSWORD=.*/WP_${ENVIRONMENT_TYPE}_APP_PASSWORD=$PASSWORD/" /project/.env 2>/dev/null || \
    show_warning "Could not update .env file (permission denied - this is OK in CI)"
AUTH_HASH=$(echo -n "admin:$PASSWORD" | base64)
sed -i "s/WP_${ENVIRONMENT_TYPE}_AUTH_HASH=.*/WP_${ENVIRONMENT_TYPE}_AUTH_HASH=$AUTH_HASH/" /project/.env 2>/dev/null || \
    show_warning "Could not update .env file (permission denied - this is OK in CI)"

show_status "Application password created successfully"

# Activate the permalinks structure
show_header "Activating the permalinks structure"
wp rewrite structure '/%postname%/' --hard --allow-root
show_status "Permalinks structure activated successfully"

echo -e "\n${GREEN}================================================================"
echo -e "✨ WordPress environment setup completed successfully!"
echo -e "================================================================"

# Create the done flag
touch /tmp/prepare-wp.sh.done
