#!/bin/bash
set -ex

if [[ "$(uname)" == 'Darwin' ]]; then
    shopt -s expand_aliases
    alias date='gdate'
fi

sunday='sunday'
if [ $(date +%w) -ne 0 ] ; then
  sunday="next sunday"
fi

year=$(date +%Y --date "${sunday}")
week=$(date +%U --date "${sunday}")
slug=${year}-${week}
to_date=$(date '+%Y-%m-%d' --date "${sunday}")
from_date=$(date '+%Y-%m-%d' --date "6 day ago ${to_date}")
post_dir=src/pages/ja/blog/posts
image_dir=public/ja/blog/posts/${slug}

# mkdir, hero alias
mkdir -p ${image_dir}
touch ${image_dir}/.gitkeep

# make blog file
erb from_date=${from_date} \
    to_date=${to_date} \
    slug=${slug} \
    src/templates/blog/post.mdx.erb > ${post_dir}/${slug}.mdx

# set env in global(GitHub Actions)
if [[ "$GITHUB_ACTION" == true ]]; then
    echo "from_date=${from_date}" >> $GITHUB_ENV
    echo "to_date=${to_date}" >> $GITHUB_ENV
    echo "slug=${slug}" >> $GITHUB_ENV
fi
