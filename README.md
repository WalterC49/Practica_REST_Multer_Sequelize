# Practica_REST_Multer_Sequelize

# To use

First create a MySQL DATABASE with rest_multer_sequelize.sql file.

# API Routes

GET / users - Get All Users

GET / users /id- Get Single User with the corresponded id

POST /users - Create New User

In body: {
"username":"username",
"email":"email@email.com",
"pass":"password",
"photo":"an image file"
}

PUT / users /id - Update Single User with the corresponded id

In body: {
"username":"username",
"email":"email@email.com",
"pass":"password",
"photo":"an image file"
}

PATCH / users /id - Update Single User.name with the corresponded id

In body: {
"username":"username"
}

DELETE / users /id - Delete Single User with the corresponded id

In body: {
"pass":"password"
}

POST / login – Login

{
"email":"email@email.com",
"pass":"password"
}

GET / profile - Profile

In Authorization the JSONWebToken from login when requested
