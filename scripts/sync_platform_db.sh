#!/usr/bin/env bash

BRANCH=$1
ID=$2

CHILDSIZE='~/.platformsh/bin/platform db:size --environment=${BRANCH} --format=plain --columns=used --no-header'
PARENT='~/.platformsh/bin/platform environment:info --format=plain parent'
PARENTSIZE='~/.platformsh/bin/platform db:size --environment=${PARENT} --format=plain --columns=used --no-header'

echo $PARENTSIZE
echo $CHILDSIZE

if [[ $PARENTSIZE == $CHILDSIZE ]] ; then
	~/.platformsh/bin/platform sync data --project=$ID --environment=$BRANCH --yes
    echo "Synching Databases!"
else
	echo "Databases different! Not syncing"
fi

