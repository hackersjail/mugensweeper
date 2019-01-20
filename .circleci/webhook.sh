#!/usr/bin/env bash

if [ $CIRCLE_BRANCH = "master" ]; then
  DEPLOY_DEST="Production"
  DEPLOY_URL=$DEPLOY_API_PROD_URL
else
  DEPLOY_DEST="Staging"
  DEPLOY_URL=$DEPLOY_API_STG_URL
fi

if [ $DEPLOY_RESULT = "succeeded" ]; then
  WEBHOOK_MESSAGE="Successful deploy of $CIRCLE_PROJECT_REPONAME ($DEPLOY_DEST)\n$DEPLOY_URL"
else
  WEBHOOK_MESSAGE="Something went wrong deploying $CIRCLE_PROJECT_REPONAME ($DEPLOY_DEST)\nFailed <$CIRCLE_BUILD_URL|$CIRCLE_JOB>"
fi

if [ ${CIRCLECI} ]; then
  curl -X POST --data-urlencode \
    'payload={
      "attachments": [
        {
          "color": "'${WEBHOOK_COLOR}'",
          "text": "'"$WEBHOOK_MESSAGE"'"
        }
      ]
    }' \
  ${WEBHOOK_URL}
fi
