# User Permissions Setup

This document explains how to set up the dev-workspace container to work with your user account, preventing file ownership issues.

## Problem

By default, Docker containers run as root, which means files created inside the container belong to root instead of your user. This causes permission issues when trying to run commands like `composer build`.

## Solution

The dev-workspace has been configured to run as a non-root user (`devuser`) with a shared group approach, ensuring files created inside the container are accessible to your user.

## Quick Setup

For new users or when switching to a different machine, run:

```bash
cd dev-workspace
bash ./scripts/portable-setup.sh
```

This will:
1. Set the correct directory permissions
2. Fix ownership of any files owned by root
3. Create a portable setup that works for any user

## Manual Setup

If you prefer to set up manually:

1. **Set directory permissions:**
   ```bash
   chmod g+w ../src/ ../dist/
   ```

2. **Fix file ownership (if needed):**
   ```bash
   sudo chown -R $(id -u):$(id -g) ../src/include.php ../src/Versions.php
   sudo chown -R $(id -u):$(id -g) ../vendor/squizlabs/php_codesniffer/CodeSniffer.conf
   chmod g+w ../vendor/squizlabs/php_codesniffer/CodeSniffer.conf
   ```

3. **Build the container:**
   ```bash
   bash ./scripts/build-terminal.sh
   ```

## How It Works

- The container runs as `devuser` (UID 1000) in the `devgroup` (GID 1000)
- Files created inside the container belong to `devuser:devgroup`
- The project directories have group write permissions
- This ensures you have write access to all files created by the container

## Testing

After setup, test that everything works:

```bash
# Test basic file creation
bash ./scripts/test-user-permissions.sh

# Test composer build
./run composer build
```

## For Different Users

The solution is designed to work for any user:

1. **Each user runs the setup script:**
   ```bash
   cd dev-workspace
   bash ./scripts/portable-setup.sh
   ```

2. **The script automatically:**
   - Detects the user's UID/GID
   - Sets appropriate directory permissions
   - Fixes any file ownership issues
   - Works with the existing container

3. **No container rebuild needed:**
   - The container uses a standard `devuser:devgroup` setup
   - Directory permissions allow any user to write to the project
   - This makes it portable across different machines and users

## Troubleshooting

If you encounter permission issues:

1. **Check your user ID:**
   ```bash
   id
   ```

2. **Re-run the setup:**
   ```bash
   bash ./scripts/portable-setup.sh
   ```

3. **Check directory permissions:**
   ```bash
   ls -la ../src/ ../dist/
   ```

## Benefits

- ✅ Works for any user without rebuilding containers
- ✅ Portable across different machines
- ✅ No hardcoded UID/GID values
- ✅ Simple setup process
- ✅ Maintains security by not running as root
