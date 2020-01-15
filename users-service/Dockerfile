# Set the baseImage to use for subsequent instructions.
# FROM must be the first instruction in a Dockerfile.
FROM node:12

# Copy files or folders from source to the dest path in the image's filesystem.
COPY . /opt/app

# Set the working directory for any subsequent ADD, COPY, CMD, ENTRYPOINT, or RUN instructions that follow it in the Dockerfile.
WORKDIR /opt/app

# Execute any commands on top of the current image as a new layer and commit the results.
RUN yarn

# Provide defaults for an executing container. If an executable is not specified, then ENTRYPOINT must be specified as well.
# There can only be one CMD instruction in a Dockerfile.
CMD yarn dev