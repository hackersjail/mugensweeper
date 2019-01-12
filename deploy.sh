#!/usr/bin/env bash

cd /home/ec2-user/mugensweeper
yarn
yarn ps:stop
yarn deploy
