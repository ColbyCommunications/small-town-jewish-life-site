#!/usr/bin/env bash

BRANCH=$1
ID=$2

CHILDSIZE=$(echo ~/.platformsh/bin/platform db:size --environment=$BRANCH --format=plain --columns=used --no-header | sed 's/[^0-9]*//g')
PARENT=$(echo ~/.platformsh/bin/platform environment:info --format=plain parent)
PARENTSIZE=$(echo ~/.platformsh/bin/platform db:size --environment=$PARENT --format=plain --columns=used --no-header | sed 's/[^0-9]*//g')

echo $PARENTSIZE
echo $CHILDSIZE

if [[ $PARENTSIZE == $CHILDSIZE ]] ; then
	~/.platformsh/bin/platform sync data --project=$ID --environment=$BRANCH --yes
    echo "Synching Databases!"
else
	echo "Databases different! Not syncing"
fi
