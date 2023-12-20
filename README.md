# Happy birthday email

Happy birthday email is a simple React And Node project that runs locally on your computer.

## Instructions for Running the Project

1. Install [Node.js](https://nodejs.org/) if it's not already installed.

2. Install [npm](https://www.npmjs.com/) if it's not already installed.

2. Install [docker](https://docs.docker.com/desktop/install) if it's not already installed.

   ```shell

   To run client side
   cd Happy birthday email/client
   npm install
   npm start

   To run RabbitMQ
   docker run --rm -it --hostname my-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management

   Before running the server you need to set the 
   username and password of your email account in the Happy birthday email/server/conf/gmailConf.js file

   To run server side
   cd Happy birthday email/server
   npm install


   

The project will start running and open in 
your default web browser at http://localhost:3000/.