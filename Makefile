.DEFAULT_GOAL = run
DEBUG = app,config,db,server,router,handler,authent
run:
	DEBUG=$(DEBUG) node app.js
