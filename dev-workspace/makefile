SHELL := /bin/bash

all: build

help:
	@echo "Available targets:"
	@awk '/^[a-zA-Z0-9_-]+:/ {print "  " $$1}' $(MAKEFILE_LIST)

.PHONY: build push update push-terminal push-wp

build-%:
	docker compose -f docker/compose.yaml --env-file ../.env build $*

build-terminal:
	bash ./scripts/build-terminal.sh

build-wp:
	$(MAKE) build-dev-wp

build-wpcli:
	$(MAKE) build-dev-wpcli

build:
	$(MAKE) build-wp
	$(MAKE) build-wpcli

push:
	$(MAKE) push-terminal "$$@"
	$(MAKE) push-wp "$$@"
	$(MAKE) push-wpcli "$$@"

push-terminal:
	source ../.env && \
	export TERMINAL_IMAGE_NAME="$${TERMINAL_IMAGE_NAME}" && \
	bash ./scripts/build-push-image.sh "$${TERMINAL_IMAGE_NAME}" ./docker/terminal "$$@"

push-wp:
	source ../.env && \
	export WP_IMAGE_NAME="$${WP_IMAGE_NAME}" && \
	bash ./scripts/build-push-image.sh "$${WP_IMAGE_NAME}" ./docker/wp/wordpress "$$@"

push-wpcli:
	source ../.env && \
	export WPCLI_IMAGE_NAME="$${WPCLI_IMAGE_NAME}" && \
	bash ./scripts/build-push-image.sh "$${WPCLI_IMAGE_NAME}" ./docker/wp/wpcli "$$@"

update:
	bash ./scripts/services-pull-images.sh "$$@"
