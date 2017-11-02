#!/bin/bash
export GITLAB_URL=`echo http://``dig +short td-gitlab-docker`
export `python2 apptoken.py`
npm start