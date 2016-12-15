Faculty Information Management implemented using MEAN stack.

So, basically for the execution of project NodeJS and MongoDB need to be installed on the user system.

Open command prompt and type 
mongod
This will open server connections to the database.

Then, open another command prompt and type below two commands
mongoimport --db FIM --collection logs --file a.json
mongoimport --db FIM --collection fdetails --file b.json

This will fill the mongoDB database with the data from the two json files.

Finally, open another command prompt and move to location of project-folder and type
node IMserver.js
This will start the server.

Now, open a browser and type http://localhost:8000/login



