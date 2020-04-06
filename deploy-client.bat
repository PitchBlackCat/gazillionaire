setlocal

call git push
call git subtree push --prefix client heroku-client master
call heroku logs --tail --remote heroku-client
