.PHONY: dev-up


help:
	@echo "Usage: make <target>"
	@echo "Targets:"
	@echo "  dev-up         # Start the development environment"
	@echo "  dev-stop       # Stop the development environment"
	@echo "  dev-down       # Remove the development environment"
	@echo "  dev-restart    # Restart the development environment"
	@echo "  dev-refresh    # Refresh the development environment"
	@echo "  dev-info       # Show info about the development environment"
	@echo "  dev-logs       # Show logs for the development environment"
	@echo "  dev-clean      # Clean up dev environment, logs, and cache"
	@echo "  test-up        # Start the test environment"
	@echo "  test-stop      # Stop the test environment"
	@echo "  test-down      # Remove the test environment"
	@echo "  test-restart   # Restart the test environment"
	@echo "  test-refresh   # Refresh the test environment"
	@echo "  test-info      # Show info about the test environment"
	@echo "  test-logs      # Show logs for the test environment"
	@echo "  test-clean     # Clean up test environment, logs, and cache"
	@echo "  test-db-export # Export the test database"
	@echo "  test-db-import # Import the test database"
	@echo "  test-db-logs   # Show logs for the test database"
	@echo "  test-snippets  # Generate Gherkin snippets"
	@echo "  test-steps     # Generate Gherkin steps"
	@echo "  test-coverage  # Generate test coverage report"
	@echo "  test-unit      # Run unit tests"
	@echo "  test-integration # Run integration tests"
	@echo "  test-api       # Run API tests"
	@echo "  test-debug     # Run tests in debug mode"
	@echo "  test-driver    # Run test driver"
	@echo "  test           # Run tests"
	@echo "  test-coverage  # Generate test coverage report"
	@echo "  test-unit      # Run unit tests"
	@echo "  test-integration # Run integration tests"
	@echo "  test-api       # Run API tests"
	@echo "  test-debug     # Run tests in debug mode"
	@echo "  docker-cleanup # Clean up Docker"
	@echo "  cli-dev        # Run WP-CLI commands in the development environment"
	@echo "  cli-test       # Run WP-CLI commands in the test environment"
	@echo "  up             # Start the development and test environments"
	@echo "  down           # Stop the development and test environments"
	@echo "  stop           # Stop the development and test environments"
	@echo "  refresh        # Refresh the development and test environments"
	@echo "  clean          # Clean up the development and test environments"
	@echo "  info           # Show info about the development and test environments"
	@echo "  logs           # Show logs for the development and test environments"
	@echo "  sync           # Start watching and syncing plugin files to dev site"
	@echo "  sync-once      # Sync plugin files once to dev site"
	@echo "  sync-stop      # Stop the sync process"
	@echo "  watch          # Watch for changes in the assets and build assets using webpack"


dev-up:
	bash ./dev-workspace/scripts/env.sh up dev
	@make dev-info

dev-stop:
	bash ./dev-workspace/scripts/env.sh stop dev

dev-down:
	bash ./dev-workspace/scripts/env.sh down dev

dev-restart:
	bash ./dev-workspace/scripts/env.sh restart dev

dev-refresh:
	bash ./dev-workspace/scripts/env.sh refresh dev

dev-info:
	bash ./dev-workspace/scripts/env.sh info dev

dev-logs:
	bash ./dev-workspace/scripts/log-web.sh dev

dev-clean:
	bash ./dev-workspace/scripts/env.sh cleanup dev
	@make dev-clean-logs
	@make dev-clean-cache
	@make dev-clean-cachegrind

dev-clean-logs:
	rm -f dev-workspace/.cache/dev-db/logs/*

dev-clean-cache:
	rm -rf dev-workspace/.cache/dev-wp && rm -rf dev-workspace/.cache/dev-db && rm -rf dev-workspace/.cache/dev-wpcli

dev-clean-cachegrind:
	rm -rf dev-workspace/.cache/dev-wp/tmp/cachegrind.out.*


test-up:
	bash ./dev-workspace/scripts/env.sh up test
	@make test-info

test-stop:
	bash ./dev-workspace/scripts/env.sh stop test

test-down:
	bash ./dev-workspace/scripts/env.sh down test

test-restart:
	bash ./dev-workspace/scripts/env.sh restart test

test-refresh:
	bash ./dev-workspace/scripts/env.sh refresh test

test-info:
	bash ./dev-workspace/scripts/env.sh info test

test-clean:
	bash ./dev-workspace/scripts/env.sh cleanup test
	@make test-clean-logs
	@make test-clean-cache
	@make test-clean-cachegrind
	./vendor/bin/codecept clean

test-clean-logs:
	rm -f dev-workspace/.cache/test-db/logs/*

test-clean-cache:
	rm -rf dev-workspace/.cache/test-wp && rm -rf dev-workspace/.cache/test-db && rm -rf dev-workspace/.cache/test-wpcli

test-clean-cachegrind:
	rm -rf dev-workspace/.cache/test-wp/tmp/cachegrind.out.*

test-db-export:
	bash ./dev-workspace/scripts/tests-db-export.sh $@

test-db-import:
	bash ./dev-workspace/scripts/tests-db-import.sh $@

test-db-logs:
	bash ./dev-workspace/scripts/tests-db-logs.sh $@

test-snippets:
	./vendor/bin/codecept gherkin:snippets $@

test-steps:
	./vendor/bin/codecept gherkin:steps $@

test-logs:
	bash ./dev-workspace/scripts/log-web.sh test

test:
	source ./.env && EDD_LICENSE_FOR_TESTS=$EDD_LICENSE_FOR_TESTS vendor/bin/codecept run $@

test-coverage:
	./vendor/bin/codecept run --coverage --coverage-html

test-unit:
	./vendor/bin/codecept run Unit

test-integration:
	./vendor/bin/codecept run Integration

test-api:
	./vendor/bin/codecept run Api

test-debug:
	php -d xdebug.mode=debug -d xdebug.start_with_request=yes vendor/bin/codecept run $@

test-driver:
	source ./.env && $CHROMEDRIVER_BINARY --port=$CHROMEDRIVER_PORT



cli-dev:
	bash dev-workspace/scripts/tests-wp-cli.sh dev-wpcli $@

cli-test:
	bash dev-workspace/scripts/tests-wp-cli.sh test-wpcli $@



docker-cleanup:
	docker system prune -f



up:
	@make dev-up
	@make test-up
	@make dev-info
	@make test-info

info:
	@make dev-info
	@make test-info

stop:
	@make dev-stop
	@make test-stop

down:
	@make dev-down
	@make test-down

refresh:
	@make dev-refresh
	@make test-refresh

clean:
	@make dev-clean
	@make test-clean

logs:
	@make dev-logs
	@make test-logs

# Plugin sync commands
sync:
	@echo "Starting plugin sync (watching for changes)..."
	@echo "Press Ctrl+C to stop"
	@./dev-workspace/scripts/sync-plugin-remote.sh --watch

sync-once:
	@echo "Syncing plugin files once..."
	@./dev-workspace/scripts/sync-plugin-remote.sh --once

sync-stop:
	@echo "Stopping sync process..."
	@pkill -f "sync-plugin-remote.sh" || true

local-sync:
	@echo "Syncing plugin files locally..."
	@./dev-workspace/scripts/local-sync.sh --watch

local-sync-once:
	@echo "Syncing plugin files locally once..."
	@./dev-workspace/scripts/local-sync.sh --once

local-sync-stop:
	@echo "Stopping local sync process..."
	@pkill -f "local-sync.sh" || true

# Dev-workspace commands

watch:
	./dev-workspace/run composer watch

build-js:
	./dev-workspace/run composer build:js

build:
	./dev-workspace/run composer build

build-lang:
	./dev-workspace/run composer build:lang

# Code quality checks
check-lint:
	./dev-workspace/run composer check:lint

check-php:
	./dev-workspace/run composer check:php

check-cs:
	./dev-workspace/run composer check:cs

# Pre-commit hooks
pre-commit-check:
	@make check-lint
	@make check-php
	@make check-cs
	@make test-unit
	@make test-integration

# Metrics

metrics:
	./dev-workspace/run composer metrics
