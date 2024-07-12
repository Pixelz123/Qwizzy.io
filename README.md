# Realtime Quizzing Webapp
This is a web app built with Nextjs for conducting live quizzes.One can create quizzes and present them to audience for realtime feedback.The frontend connects to a external websocket(socket.io) server deployed separately as a NodeJS application(github link: https://github.com/Pixelz123/LiveQuiz_wsBackend) for realtime responces and leaderboard updates    
## Features
##### 1.A single user creates a quiz with unique quiz code. all client user with that code joins that quiz with the unique quiz code to give feedback
##### 2.Realtime leaderboard update as per the users responce 
## Demo
### Creating quiz
![create](https://github.com/user-attachments/assets/e383d0ff-6a46-4d4a-8874-0e1691b6c132)
### Conducting live quiz 
![quiz](https://github.com/user-attachments/assets/87b5a1f8-292b-4703-9a9c-1ddda3d5a6e4)
## Requirements
##### 1.NextJS(v13.5.6)
##### 2.NodeJS(v18.10.15)
##### 3.Socket.io(v4.7.4)
##### 4.Jsonwebtoken(v8.5)
##### 5.Mongoose(v8.2.0)
## Usage 
##### 1.Clone The project 
##### 2.Install the nessessary packages using npm or yarn or pnpm
##### 3.Run the project in Development mode with command `yarn dev` or `npm run dev` 
##### 4.The project should be live on port 3000 of the localhost .Open a browser and type the url 127.0.0.1:3000 to view the project
