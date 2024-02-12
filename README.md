# 🚀 Welcome to CRUD API project!

You can run app:

dev mode - npm run start:dev
prod mode - npm run start:prod
multi mode - npm run start:multi
run tests - npm run test

Here are examples of curl commands for each of the API endpoints you can copy them and run in terminal:

1. Get all users:
curl -i -X GET http://127.0.0.1:8081/users

2. Get user by ID:
curl -i -X GET http://127.0.0.1:8081/users/{userId}
Replace {userId} with the actual ID of the user you want to retrieve.

3. Create a new user:
curl -i -X POST -H "Content-Type: application/json" -d '{"username": "John", "age": 29, "hobbies": ["snowboarding", "coding"]}' http://127.0.0.1:8081/users

4. Update existing user:
curl -i -X PUT -H "Content-Type: application/json" -d '{"username": "Updated Name", "age": 29, "hobbies": ["snowboarding", "coding"]}' http://127.0.0.1:8081/users/{userId}
Replace {userId} with the actual ID of the user you want to update.

5. Delete user:
curl -i -X DELETE http://127.0.0.1:8081/users/{userId}
Replace {userId} with the actual ID of the user you want to delete.