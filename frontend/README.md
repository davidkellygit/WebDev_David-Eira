# OhSheet! (Music Score Download Service)
OhSheet! is a MERN stack application where users can upload their own musical transcriptions and compositions to share with other users.

## Features
* Register: Create and read a user profile.
* Authentication: Log in and log out
* Search: Search for musical scores by name
* Upload pdf files in the users profile page, as well as view and delete any of their uploads.
* Any user can search for musical scores and see the results.

## Installation
1. Remove package-lock.json
2. Install packages with `npm i` in `/` and `/frontend`
3. Start the server and client with `npm run dev`
4. .env file is require at `/`

## .env
```
NODE_ENV = development
PORT = 5000
MONGO_URI = MongoURL // with the collection URL
JWT_SECRET = abc123
```

## Technologies
* MERN Stack (MongoDB, Express, React, Node.js)

### Frontend
* @reduxjs/toolkit
* @testing-library/jest-dom
* @testing-library/react
* @testing-library/user-event
* axios
* bootstrap
* react
* react-bootstrap
* react-dom
* react-icons
* react-pdf
* react-redux
* react-router-dom
* react-scripts
* react-toastify
* web-vitals

### Backend
* @emotion/react
* @emotion/styled
* @mui/material
* bcryptjs
* body-parser
* colors
* cors
* dotenv
* express
* express-async-handler
* fs-extra
* jsonwebtoken
* mongoose
* multer
* uuid

### Dev Dependencies
* nodemon
* concurrently

### Credits
* [FontAwesome](https://fontawesome.com/) - icons