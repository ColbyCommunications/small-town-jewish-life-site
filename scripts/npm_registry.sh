#!/bin/bash

mv /app/.npmrc .npmrc-gh
cat > /app/.npmrc <<EOL
//npm.pkg.github.com/:_authToken=${WEBMASTER_GITHUB_ACTIONS_TOKEN}
@ColbyCommunications:registry=https://npm.pkg.github.com
EOL