# API Documentation

#### 1️⃣ Backend deployed at [Heroku](https://lambda-how-to.herokuapp.com/) <br>

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **yarn install** to install all required dependencies
- **yarn server** to start the local server
- **yarn test** to start server using testing environment

### Node.js and Express

-    These are what everyone on the team is most familiar with.
-    It is more dynamic and easier to read than other frameworks.
-    Express gives us route support.
-    Node.js is known for offering high performance, and the freedom to develop without restrictions.
-    Express offers lightweight middleware support for routes.

## 2️⃣ Endpoints

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/users`                | all users           | Returns info for the logged in user.               |
| GET:id | `/users/:id`            | users, supervisors  | Returns info for a single user.                    |
| POST   | `/users/login`          | none                | Allows a registered user to login.                 |
| POST   | `/users/register`       | none                | Creates a new registered user.                     |
| PUT    | `/users/:id`            | owners, supervisors | Modify existing user info.                         |
| DELETE | `/users/:id`            | owners, supervisors | Delete an existing user account.                   |

#### Posts Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/posts`                | all posts      | Returns the information for an post.         |
| GET:id | `/posts/:id`            | specific post  | Returns the information for an post.         |
| POST   | `/posts`                | owners         | Create a new post.                           |
| PUT    | `/posts/:id`            | owners         | Modify an existing post.                     |
| DELETE | `/posts/:id`            | owners         | Delete an post.                              |

#### Tags Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/tags`                 | all tags            | Returns all available tags.                        |

#### Reviews Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |

# 2️⃣ Data Model

#### USERS

---

```
{
  id: INTEGER, 
  username: STRING,
  password: STRING,
  role: STRING,
  created_at: TIMESTAMP WITHOUT TIMEZONES
}
```

#### POSTS

---

```
{
  id: INTEGER,
  title: STRING,
  img_url: STRING,
  description: TEXT,
  difficulty: STRING,
  duration: STRING,
  skills: TEXT,
  supplies: TEXT,
  created_by: INTEGER foreign key in USERS table,
  created_at: TIMESTAMP WITHOUT TIMEZONES
}
```

#### POST_STEPS

---

```
{
  id: INTEGER,
  post_id: INTEGER foreign key in POSTS table,
  step_num: INTEGER,
  title: STRING,
  instruction: TEXT,
  img_url: STRING,
  vid_url: STRING
}
```

#### TAGS

---

```
{
  id: INTEGER,
  name: STRING
}
```

#### POST_TAGS

---

```
{
  id: INTEGER,
  post_id: INTEGER foreign key in POSTS table,
  tag_id: INTEGER foreign key in TAGS table
}
```

#### USER_POST_REVIEWS

---

```
{
  id: INTEGER,
  user_id: INTEGER foreign key in USERS table,
  post_id: INTEGER foreign key in POSTS table,
  rating: INTEGER,
  review: TEXT,
}
```

#### FOLLOWERS

---

```
{
  id: INTEGER,
  follower_id: INTEGER foreign key in USERS table,
  following_id: INTEGER foreign key in USERS table
}
```

#### USER_FAVORITES

---

```
{
  id: INTEGER,
  user_id: INTEGER foreign key in USERS table,
  post_id: INTEGER foreign key in POSTS table
}
```

## 2️⃣ Actions

`getAllUsers()` -> Returns all registered users

`getUserById(id)` -> Returns a specified user by Id

`getAllPosts()` -> Returns all created posts

`getPostById(id)` -> Returns a specified post by Id

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    
    *  PORT - what port the server will run on
    *  HOST - set to "localhost" for "development" and "testing" environments
    *  DB_DEV - the name of the local PostgreSQL database cluster for development
    *  DB_TEST - the name of the local PostgreSQL database cluster for testing
    *  USER - the username set for your local PostgreSQL server
    *  PASS - the password set for your local PostgreSQL server
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/labs13-how-to/frontend/blob/master/README.md) for details on the fronend of our project.

See [iOS Documentation](https://github.com/labs13-how-to/ios/blob/master/README.md) for details on the iOS portion of our project.
