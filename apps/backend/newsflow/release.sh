#!/bin/bash
TAG=$(git describe --abbrev=0 --tags)
printf "Release $1\n\n" > ChangeLog-$1.txt
git log --no-merges --oneline $TAG..HEAD >> ChangeLog-$1.txt
git tag -a $1 -F ChangeLog-$1.txt
echo "Tagged Release $1"
