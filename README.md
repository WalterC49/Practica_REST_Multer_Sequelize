# Practica_REST_Multer_Sequelize

# To use

First create a MySQL DATABASE with rest_multer_sequelize.sql file.

# Must hard code an User with role:"Admin"

# API Routes

GET /api/users - Get All Users

GET /api/users /id- Get Single User with the corresponded id

POST /api/users - Create New User

In body: {
"username":"username",
"email":"email@email.com",
"pass":"password",
"photo":"an image file"
}

PUT /api/users /id - Update Single User with the corresponded id

In body: {
"username":"username",
"email":"email@email.com",
"pass":"password",
"photo":"an image file"
}

PATCH /api/users /id - Update Single User.name with the corresponded id

In body: {
"username":"username"
}

DELETE /api/users /id - Delete Single User with the corresponded id

In body: {
"pass":"password"
}

POST /api/login – Login

{
"email":"email@email.com",
"pass":"password"
}

GET /api/profile - Profile

In Authorization the JSONWebToken from login when requested
