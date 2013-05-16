.DEFAULT_GOAL = run
DEBUG = app,config,db,server,router,handler
run:
	DEBUG=$(DEBUG) node app.js
