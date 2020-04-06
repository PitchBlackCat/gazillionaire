setlocal

call git push
call git subtree push --prefix server heroku-server master
call heroku logs --tail --remote heroku-server
