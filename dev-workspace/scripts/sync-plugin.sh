#!/bin/bash

# PublishPress Hub Plugin Sync Script
# Watches for changes in the plugin directory and syncs to WordPress dev site

# Configuration
SOURCE_DIR="/var/git-repos/publishpress/publishpress-hub"
TARGET_DIR="/var/www/publishpress-hub.dev.realcodelab.com/htdocs/wp-content/plugins/publishpress-hub"
EXCLUDE_FILE=".rsync-filters-pre-build"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to sync files
sync_files() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')] Syncing files...${NC}"

    # Create target directory if it doesn't exist
    sudo mkdir -p "$TARGET_DIR"

    # Sync files using rsync
    if sudo rsync -av --delete \
        --exclude-from="$SOURCE_DIR/$EXCLUDE_FILE" \
        --exclude=".git/" \
        --exclude="node_modules/" \
        --exclude="vendor/" \
        --exclude="dev-workspace/" \
        --exclude="tests/" \
        --exclude=".cursor/" \
        --exclude=".github/" \
        --exclude="dist/" \
        --exclude="*.log" \
        --exclude=".env" \
        --exclude=".env.example" \
        --exclude=".babelrc" \
        --exclude="webpack.config.js" \
        --exclude="webpack.prototype.config.js" \
        --exclude="package.json" \
        --exclude="yarn.lock" \
        --exclude="composer.json" \
        --exclude="composer.lock" \
        --exclude="makefile" \
        --exclude="codeception.yml" \
        --exclude=".phpcs.xml" \
        --exclude=".phplint.yml" \
        --exclude="phpstan.neon" \
        --exclude="phpmd.ruleset.xml" \
        --exclude=".gitignore" \
        --exclude=".gitattributes" \
        --exclude=".gitmodules" \
        --exclude=".distignore" \
        --exclude=".rsync-filters-*" \
        --exclude="jsconfig.json" \
        --exclude="*.code-workspace" \
        --exclude="CHANGELOG.md" \
        --exclude="README.md" \
        --exclude="readme.txt" \
        --exclude="LICENSE" \
        --exclude="mockups/" \
        --exclude="docs/" \
        --exclude="languages/" \
        --exclude="lib/" \
        "$SOURCE_DIR/" "$TARGET_DIR/"; then

        echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] Sync completed successfully${NC}"

        # Fix permissions
        sudo chown -R www-data:www-data "$TARGET_DIR"
        sudo find "$TARGET_DIR" -type d -exec chmod 755 {} \;
        sudo find "$TARGET_DIR" -type f -exec chmod 644 {} \;

        echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] Permissions fixed${NC}"
    else
        echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] Sync failed${NC}"
    fi
}

# Function to check if inotifywait is available
check_inotify() {
    if ! command -v inotifywait &> /dev/null; then
        echo -e "${RED}Error: inotifywait is not installed.${NC}"
        echo "Please install it with: sudo apt-get install inotify-tools"
        exit 1
    fi
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  -o, --once     Sync once and exit"
    echo "  -w, --watch    Watch for changes and sync continuously (default)"
    echo ""
    echo "Examples:"
    echo "  $0              # Watch for changes and sync continuously"
    echo "  $0 --once       # Sync once and exit"
    echo "  $0 --watch      # Watch for changes and sync continuously"
}

# Parse command line arguments
WATCH_MODE=true

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_usage
            exit 0
            ;;
        -o|--once)
            WATCH_MODE=false
            shift
            ;;
        -w|--watch)
            WATCH_MODE=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}Error: Source directory does not exist: $SOURCE_DIR${NC}"
    exit 1
fi

# Check if inotifywait is available
check_inotify

echo -e "${BLUE}PublishPress Hub Plugin Sync Script${NC}"
echo -e "${BLUE}Source: $SOURCE_DIR${NC}"
echo -e "${BLUE}Target: $TARGET_DIR${NC}"
echo ""

# Initial sync
echo -e "${YELLOW}Performing initial sync...${NC}"
sync_files

if [ "$WATCH_MODE" = false ]; then
    echo -e "${GREEN}One-time sync completed. Exiting.${NC}"
    exit 0
fi

echo -e "${YELLOW}Watching for changes... (Press Ctrl+C to stop)${NC}"
echo ""

# Watch for changes
inotifywait -m -r -e modify,create,delete,move "$SOURCE_DIR" --format '%w%f %e' | while read file event; do
    # Skip certain file types and directories
    if [[ "$file" =~ \.(git|node_modules|vendor|dev-workspace|tests|cursor|github|dist|log|env|babelrc|webpack|package|yarn|composer|makefile|codeception|phpcs|phplint|phpstan|phpmd|gitignore|gitattributes|gitmodules|distignore|rsync-filters|jsconfig|code-workspace|changelog|readme|license|mockups|docs|languages|lib) ]]; then
        continue
    fi

    # Skip if it's a directory we want to exclude
    if [[ "$file" =~ /(\.git|node_modules|vendor|dev-workspace|tests|\.cursor|\.github|dist|mockups|docs|languages|lib)/ ]]; then
        continue
    fi

    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] Change detected: $file ($event)${NC}"
    sync_files
done
