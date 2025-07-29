#!/usr/bin/env bash

# If not in the `dev-workspace` directory, change to it
if [[ ! $(pwd) =~ .*dev-workspace$ ]]; then
  cd dev-workspace
fi

set -a
source ../.env
set +a

echo "Testing user permissions in terminal container..."
echo "Current user: $(whoami)"
echo "Current groups: $(groups)"

# Run a simple command to test file creation
docker compose -f docker/compose.yaml run -e DROPBOX_ACCESS_TOKEN=$DROPBOX_ACCESS_TOKEN --rm terminal sh -c '
echo "Testing file creation..."
echo "Container user: $(whoami)"
echo "Container groups: $(groups)"
touch /project/test-file-created-by-container.txt
echo "File created successfully!"
ls -la /project/test-file-created-by-container.txt
rm /project/test-file-created-by-container.txt
echo "Test completed!"
'
