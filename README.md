# Review It Yourself (formerly How To)
# API Documentation

#### 1️⃣ Backend deployed at [Heroku](https://lambda-how-to.herokuapp.com/) <br>

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **yarn install** to install all required dependencies
- **yarn server** to start the local server
- **yarn test** to start server using testing environment

### Node.js and Express

- These are what everyone on the team is most familiar with.
- It is more dynamic and easier to read than other frameworks.
- Express gives us route support.
- Node.js is known for offering high performance, and the freedom to develop without restrictions.
- Express offers lightweight middleware support for routes.

## 2️⃣ Endpoints

#### Authentication Route

Utilizing passport we have implemented an authorization process using the google strategy that allows users to be login using an active gmail account.

| Method | Endpoint                | Access Control | Description                                                                    |
| ------ | ----------------------- | -------------- | ------------------------------------------------------------------------------ |
| GET    | `/auth/google`          | Account Owner  | Allows a registered user to login.                                             |
| GET    | `/auth/google/callback` | Account Owner  | If successful auth - redirects to front end home, if not - redirects to /login |
| GET    | `/auth/logout`          | Account Owner  | Allows a registered user to logout of session, redirects to home               |

#### User Routes

| Method | Endpoint          | Access Control      | Description                          |
| ------ | ----------------- | ------------------- | ------------------------------------ |
| GET    | `/users`          | all users           | Returns info for the logged in user. |
| GET    | `/users/:id`      | users, supervisors  | Returns info for a single user.      |
| GET    | `/users/:id/post` | users, supervisors  | Returns all posts for a single user. |
| POST   | `/users`          | users               | Create a new user.                   |
| PUT    | `/users/:id`      | owners, supervisors | Modify existing user info.           |
| DELETE | `/users/:id`      | owners, supervisors | Delete an existing user account.     |

#### Posts Routes

| Method | Endpoint                    | Access Control   | Description                 |
| ------ | --------------------------- | ---------------- | --------------------------- |
| GET    | `/posts`                    | all users        | Returns all posts.          |
| GET    | `/posts/:id`                | all users        | Returns the specified post. |
| GET    | `/posts/:id/steps`          | all users        | Gets steps for a specific post.  |
| POST   | `/posts`                    | registered users | Create a new post.          |
| POST   | `/posts/:id/tags`           | post creator     | Adds a tag to a post.       |
| POST   | `/posts/:id/steps`          | post creator     | Adds a step to a post.      |
| PUT    | `/posts/:id`                | post creator     | Modify an existing post.    |
| PUT    | `/posts/:id/tags/:tag_id`   | post creator     | Edit a tag on a post.       |
| PUT    | `/posts/:id/steps/:step_id` | post creator     | Edit a step on a post.      |
| DELETE | `/posts/:id`                | post creator     | Delete a post.              |
| DELETE | `/posts/:id/tags/:tag_id`   | post creator     | Remove a tag from a post.   |
| DELETE | `/posts/:id/steps/:step_id` | post creator     | Remove a step from a post.  |

#### Reviews Routes

| Method | Endpoint                   | AC    | Description                          |
| ------ | -------------------------- | ----- | ------------------------------------ |
| GET    | `/posts/:id/reviews`       | users | Returns info for a posts reviews.    |
| GET    | `/posts/reviews/:rId`      | users | Returns info for a single review.    |
| GET    | `/posts/user/:uId/reviews` | users | Returns info for users reviews.      |
| POST   | `/posts/:id/reviews`       | users | Create a new review.                 |
| PUT    | `/posts/reviews/:id`       | users | Modify an existing review.           |
| DELETE | `/posts/reviews/:id`       | users | Delete an existing review.           |

#### Favorites Routes

| Method | Endpoint                                 | AC    | Description                         |
| ------ | ---------------------------------------- | ----- | ----------------------------------- |
| GET    | `/favorites/users/:userId`               | users | Returns favorites of a user.        |
| GET    | `/posts/:postId/favorites`               | users | Returns favorites of a post.        |
| GET    | `/favorites/:id`                         | users | Returns info for a single favorite. |
| GET    | `/favorites/users/:userId/posts/:postId` | users | Returns info for a single user.     |
| POST   | `/favorites/users/:userId`               | users | Create a new favorite.              |
| DELETE | `/favorites/:id`                         | users | Delete an existing favorite.        |

#### Tags Routes

| Method | Endpoint    | Access Control | Description                 |
| ------ | ----------- | -------------- | --------------------------- |
| GET    | `/tags`     | owners         | Returns all available tags. |
| POST   | `/tags`     | owners         | Creates a new tag.          |
| PUT    | `/tags/:id` | owners         | Modify an existing tag.     |
| DELETE | `/tags/:id` | owners         | Delete a tag.               |

#### Image Upload Route

| Method | Endpoint  | Access Control | Description                         |
| ------ | --------- | -------------- | ----------------------------------- |
| POST   | `/upload` | owners         | Upload/store an image on cloudinary |

#### Comments Routes

| Method | Endpoint                                | AC    | Description                        |
| ------ | --------------------------------------- | ----- | ---------------------------------- |
| GET    | `/comments/users/:userId`               | users | Returns comments of a user.        |
| GET    | `/posts/:postId/comments`               | users | Returns comments of a post.        |
| GET    | `/comments/:id`                         | users | Returns info for a single comment. |
| GET    | `/comments/users/:userId/posts/:postId` | users | Returns info for a single comment. |
| POST   | `/comments/users/:userId`               | users | Create a new comment.              |
| PUT    | `/comments:id`                          | users | Modify an existing comment.        |
| DELETE | `/comments/:id`                         | users | Delete an existing comment.        |

**GET /posts**

Returns an array of objects with top-level details (not including steps):

```
{
  [
    {
      "id": INTEGER,
      "title": STRING, 
      "img_url": STRING,
      "vid_url": STRING,
      "description": TEXT,
      "difficulty": STRING,
      "duration": STRING,
      "skills": TEXT,
      "supplies": TEXT,
      "created_by": INTEGER, (auth_id)
      "created_at": TIMESTAMP WITHOUT TIMEZONE,
      "username": "Sibyl Runolfsdottir",
      "tags": [{
        "id": INTEGER,
        "post_id": INTEGER,
        "tag_id": INTEGER,
        "name": STRING
      }],
      "review_count": INTEGER,
      "review_avg": DECIMAL,
      "comments": INTEGER,
      "favorites": INTEGER
    }
  ]
}
```

**GET /posts/:id**

Returns an object with the following format:

```
{
  "id": INTEGER,
  "title": STRING,
  "img_url": STRING,
  "vid_url": STRING,
  "description": TEXT,
  "difficulty": STRING,
  "duration": STRING,
  "skills": TEXT,
  "supplies": TEXT,
  "created_by": INTEGER, (auth_id)
  "created_at": TIMESTAMP WITHOUT TIMEZONE,
  "tags": [
    {
      "id": INTEGER,
      "post_id": INTEGER,
      "tag_id": INTEGER,
      "name": STRING
    }
  ],
  "steps": [
    {
      "id": INTEGER,
      "post_id": INTEGER,
      "step_num": INTEGER,
      "title": STRING,
      "instruction": TEXT,
      "img_url": STRING,
      "vid_url": STRING
    },
    "reviews": [
      {
        "id": INTEGER,
        "user_id": INTEGER,
        "post_id": INTEGER,
        "rating": INTEGER,
        "review": TEXT
      }
    ],
    "comments": [
      {
        "id": INTEGER,
        "user_id": INTEGER,
        "post_id": INTEGER,
        "comment": TEXT
      }
    ],
    "favorites": [
      {
        "id": INTEGER,
        "user_id": INTEGER,
        "post_id": INTEGER
      },
    ]
  ]
}
```

**POST /posts**

Returns the ID of the created post. Required and optional inputs marked. Expects an object with the following format:

```
{
  "title": STRING, // required
  "img_url": STRING, // required
  "vid_url": STRING, // optional
  "description": TEXT, // required
  "difficulty": STRING, // required
  "duration": STRING, // required
  "skills": TEXT, // optional
  "supplies": TEXT, // optional
  "created_by": INTEGER, // Auth_id
}
```

**POST /posts/:id/steps**

Returns the ID of the step in the `post_steps` table. Expects an object with the following format:

```
{
  "step_num": INTEGER,
  "title": STRING, // required
  "instruction": TEXT, // required
  "img_url": STRING, // required
},
```

**PUT /posts/:id**

Returns with a success message. Expects an object with any of the following data:

```
{
  "title": STRING,
  "img_url": STRING,
  "vid_url": STRING,
  "description": TEXT,
  "difficulty": STRING,
  "duration": STRING,
  "skills": TEXT,
  "supplies": TEXT
}
```

**PUT /posts/:id/tags/:tag_id**

Returns with the ID of the post. Expects an object with the following format:

```
{
  "tag_id": INTEGER
}
```

**PUT /posts/:id/steps/:step_id**

Returns with a success message. Expects an object with any of the following data:

```
{
  "step_num": INTEGER,
  "title": STRING,
  "instruction": TEXT,
  "img_url": STRING,
  "vid_url": STRING
}
```

**DELETE /posts/:id**

Returns with a success message. All needed data is pulled from the route.

**DELETE /posts/:id/tags/:tag_id**

Returns with a success message. All needed data is pulled from the route.

**DELETE /posts/:id/steps/:step_id**

Returns with a success message. All needed data is pulled from the route.

**GET /posts/:id/reviews**
Returns an object with the following format:

```
{
  "id": 4,
  "user_id": INTEGER, (Auto-Incremental)
  "auth_id": INTEGER, (Registered id #)
  "post_id": INTEGER, (Foreign Key Linking Review to Post)
  "rating": INTEGER,
  "review": TEXT,
  "username": TEXT, ie Jamey Sanford
}
```

**GET /posts/reviews/:id**
Returns an object with the following format:

```
{
  "id": INTEGER,
  "user_id": INTEGER, (Auto-Incremental)
  "auth_id": INTEGER, (Registered id #)
  "post_id": INTEGER, (Foreign Key Linking Review to Post)
  "rating": INTEGER,
  "review": TEXT,
  "username": TEXT, ie Jamey Sanford
}
```

**POST /posts/:id/reviews**
Returns the newly created review object. Expects an object with the following format:

```
{
  "user_id": INTEGER,
  "auth_id": INTEGER, (Registered id #, Foreign Key to User)
  "post_id": INTEGER, (Foreign Key Linking Review to Post)
  "rating": INTEGER,
  "review": TEXT,
}
```

**PUT /posts/reviews/:id**
Returns with a success message. Expects an object with any of the following data:

```
{
  "rating": INTEGER,
  "review": TEXT,
}
```

**DELETE /posts/reviews/:id**
Returns  with a success message. All needed data is pulled from the route.

# 2️⃣ Data Model


#### USERS

---

```
{
  id: INTEGER,
  username: STRING,
  auth_id: STRING, // this is where we are saving the id response from google
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
  vid_url: STRING,
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

#### REVIEWS
---
```
{
  "id": INTEGER, (Auto-Incremental)
  "user_id": INTEGER, 
  "auth_id": INTEGER, (Registered id #, Foreign Key to User)
  "post_id": INTEGER, (Foreign Key Linking Review to Post)
  "rating": INTEGER,
  "review": TEXT,
}
```

## 2️⃣ Actions

`createUser(user)` -> Creates a user in the users table and returns that user (used for registration)

`getUserByUsername(username)` -> Returns a specified user by username (used for login)

`getAllUsers()` -> Returns all registered users

`getUserById(id)` -> Returns a specified user by Id

`getAllPosts()` -> Returns all created posts

`getUserPosts(userId)` -> Returns all posts by the specified user

`getPostById(id)` -> Returns a specified post by Id

`getStepsByPostId(post_id)` -> Returns all steps for specified post by Id

`getTagsById` -> Returns all tags

`addNew(element)` -> Adds a new element, ie post, post-step, review

`remove(id)` -> Removes an element by Id, ie post, post-step, review

`update(id, changes)` -> Edits an element by id, ie post, post-step, review

`createPost(post)` -> Creates a new post and returns the Id

`addPostStep(post_id, step)` -> Creates a new post-step, attached to the specified post

`removePost(id)` -> Deletes a post

`removePostStep(id)` -> Deletes a post-step

`updatePost(id, changes)` -> Updates a post

`updatePostStep(id, changes)` -> Updates a post-step

`googleFindUserById(profileId)` -> Returns the users table, selects user where auth_id: profileId(google)

`googleCreateUser(user)` -> Matches the google account to the user object

`getByUser(id)` -> Matches specified element to the user

`getByPost(id)` -> Matches specified element to the post

`getId(id)` -> Returns specified element


## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

A cloudinary account is required to generate a cloud to store the uploaded images.
Please navigate to https://cloudinary.com/users/register/free and register an account.
Upon registration you can either receive an automatically generated cloud name or if you choose, you can edit it to be more personalized. After login you will be redirected to the console page where you can find the cloud name, API key, and API secret, that you will need to plug into your .env folder to properly upload images to that cloud.

create a .env file that includes the following:

- PORT - what port the server will run on
- HOST - set to "localhost" for "development" and "testing" environments
- DB_DEV - the name of the local PostgreSQL database cluster for development
- DB_TEST - the name of the local PostgreSQL database cluster for testing
- USER - the username set for your local PostgreSQL server
- PASS - the password set for your local PostgreSQL server
- JWT_SECRET - the secret used to encode JSON Web Tokens
- CLOUDINARY_CLOUD_NAME - the name given to your personal cloud
- CLOUDINARY_API_KEY - the api key provided by cloudinary
- CLOUDINARY_API_SECRET - the api secret provided by cloudinary
- GOOGLE_CLIENT_ID - The client ID provided by google after successfully registering the project on the google API console
- GOOGLE_CLIENT_SECRET - The client secret provided by google after successfully registering the project on the google API console
- BE_URL - The localhost url or the deployed application url: http://localhost:5000 or https://lambda-how-to.herokuapp.com
- FE_URL - The localhost url or the deployed application url: http://localhost:3000 or https://how-tutor.netlify.com

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

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

See [Frontend Documentation](https://github.com/labs13-how-to/frontend/blob/master/README.md) for details on the frontend of our project.

See [iOS Documentation](https://github.com/labs13-how-to/ios/blob/master/README.md) for details on the iOS portion of our project.