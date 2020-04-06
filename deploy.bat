setlocal

call git push
call git subtree push --prefix server heroku-server master
call git subtree push --prefix client heroku-client master
