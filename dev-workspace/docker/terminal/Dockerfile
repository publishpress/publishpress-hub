ARG NODE_VERSION=18

FROM node:$NODE_VERSION-alpine AS node

FROM publishpress/dev-workspace-terminal:generic-4.3.7

ENV PLUGIN_NAME="PublishPress Hub"

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/share /usr/local/share
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

# Create devuser and add to a common group
RUN set -ex \
    && apk add --no-cache sudo \
    && addgroup -g 1000 devgroup \
    && adduser -D -s /bin/sh devuser \
    && adduser devuser devgroup \
    && mkdir -p /home/devuser/.ssh \
    && mkdir -p /home/devuser/.composer \
    && mkdir -p /home/devuser/.npm \
    && chown -R devuser:devgroup /home/devuser

RUN set -ex \
    && sudo -u devuser sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

COPY git/.gitconfig /home/devuser/.gitconfig
COPY .zshrc /home/devuser/.zshrc

RUN set -ex \
    && npm install -g cross-env \
    # Clean npm cache to reduce image size
    && npm cache clean --force \
    # Remove unnecessary files
    && rm -rf /tmp/* \
    && rm -rf /var/cache/apk/* \
    # Set permissions for SSH directory
    && chmod 700 /home/devuser/.ssh \
    && chown -R devuser:devgroup /home/devuser
