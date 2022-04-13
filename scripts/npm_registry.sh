#!/bin/bash

mv /app/web/.npmrc to .npmrc-gh
cat > /app/web/.npmrc <<EOL
//npm.pkg.github.com/:_authToken=$(echo $PLATFORM_VARIABLES | base64 --decode | jq '.webmaster_github_actions_token')
registry=https://npm.pkg.github.com/ColbyCommunications
EOL