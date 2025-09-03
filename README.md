<<<<<<< HEAD
- create a repository
- initilise the repository
- node_modules,package.json,package-lock.json
- install express
- create a server
- Listen to port 3000
- write request handlers for /test,/hello
- install nodemon and update scripts inside package.json 
- difference between caret and tilde (^ and ~)


-initialise git 
-.gitignore
-create a remote repo on githib
-push all code to remote origin
-order of routes is important


-Install postman app and make a workspace/colllection   >   Test API call
-write logic to handle GET,POST,PATCH,DELETE Api calls ad test themm on POSTMAN
-Explore routing ans use of ?,+,(),* in the routes
-use of regex in routed /a/,/.*fly$/
-Reading the query params in the routes
-Reading the dynamic routes

-Multiple route handlers-Play with the code
-next()
-next function and errors with res.send()
-app.use("/route",rh,[rh2,rh3],rh4,rh5);
-what kis a middleware
-how express js basically handles requests behind the scenes
-middlewares
-difference between app.use amd app.all
-write a api for auth
-error handling using app.use("/",(err,req,res,next))----(should be written at end)


-create a free cluster on mongo atlas 
-install mongoose
-connect your application to the database   "connection-url/weconnect"
-first connect to database then listen to server
-create a user schema (create a model and export it)


-difference betweeen json object and JSON
-express.json to understand datasend in json fromat
-make your signup API to receive data from the end user and save it to the databse
-user.findOne with duplicate eamilIds which one will it return
-API-get user by email
-API-get/feed-get all users from database


-explore schems type options
-add required,unique,min,minLength,trim
-add default-create a custom validation function for gender
-Improve the DB schema-PUT all approriate validation on each field in schema
-Add timestamps to the userSchema
-Add API leve validations on patch requests & signup post api
-Data Sanitizing - Add API validation for each field
-install validator
-explore valisator library function and use validator functions for password,email,photoURL
-never trust req.body

-validate data in sign up api create util folder and do it there 
-install bcrypt package
-create passwordHash using bcypt.hash & save the user encrypted password
-create login API
-Compare passwords and throw errors if email or password is invalid

-install cookie-parser
-create a dummy cookie,send a cookie 
-create a jwt token send it to user in cookie
-read the cookie and find the user
-add userAuth middleware in profile api 
-set the expiry of jwt token and cookies
-create user schema methods to getJwt and compare passwords


-logically categorise routes under resopective routers and what apis to made
-create routers using express router and import them in app.js


-create connectionrequest schema
-send connection request api
-proper validation of data
-think about all corner cases
-$or $and  and $not  query in mongooose
-schema.pre("save",fuction(){}) function
-compound indexes
-read more on indexes,why needeed,advantages,disadvantges

-write code with proper validations for review api
-ref and populate
-create connections and receivedrequesta api

-create feed api and read about nin and ne and other queries