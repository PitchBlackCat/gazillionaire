setlocal

exec git push
git subtree push --prefix server heroku-server master
git subtree push --prefix client heroku-client master
