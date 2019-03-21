Requirements The project doesnt require proxy due to node package dependencies, Unset your proxy. Download and install node from https://nodejs.org/en/download/ I have been using node v8.11.1 After installing node setup Install the angular CLI gloabally using npm install -g @angular/cli you can use git tool or appropriate cmd

Set up database: Start xampp and navigate to http://localhost/phpmyadmin on your browser then import the computing_nps.sql file in the db folder of the project. My connection to mysql database doesent require any password. In case your have passord edit the dbConnection file in the backend folder.

Set up back end: Navigate to back-end $ node index.js or type nodemon in the command line

Set up front end: Navigate to front-end $ npm install $ ng serve --open

The app will launch, on your browser type localhost:4200 Use the following credentials to access the homepage username: sam password: oduorsamuel