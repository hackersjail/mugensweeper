#!/usr/bin/env bash

if [ $CIRCLE_BRANCH = "master" ]; then
  DEPLOY_DEST="Production"
  if [ $DEPLOY_ENV = "web" ]; then
    DEPLOY_URL=$DEPLOY_WEB_PROD_URL
  elif [ $DEPLOY_ENV = "api" ]; then
    DEPLOY_URL=$DEPLOY_API_PROD_URL
  fi
else
  DEPLOY_DEST="Staging"
  if [ $DEPLOY_ENV = "web" ]; then
    DEPLOY_URL=$DEPLOY_WEB_STG_URL
  elif [ $DEPLOY_ENV = "api" ]; then
    DEPLOY_URL=$DEPLOY_API_STG_URL
  fi
fi

if [ $DEPLOY_RESULT = "succeeded" ]; then
  WEBHOOK_MESSAGE="Successful deploy of $DEPLOY_ENV server ($DEPLOY_DEST)\n$DEPLOY_URL"
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
