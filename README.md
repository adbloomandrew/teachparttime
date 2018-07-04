# Teachpartime.com

This is the server for the site

# How to run

1. You need to create a `.env` file inside the root folder of the project. You can do this by hand, or you can install `sudo npm install -g @0x4447/cucumber` and run inside the root folder this command: `cucumber`. The `.env` will be automatically created for you.
2. Run `npm install`
3. Run `npm start`

# What to expect

1. The server will start and load all the Environment Variables from the .env file
2. The server will start locally
3. The server will restart automatically at each file change, except if it is: .hjs, .css, or anything file in the public folder.

# Stack Details

- This project is hosted on Heroku,
- We use S3 to store resumes,
- Use Cognito Identity Pool to give the user temporary credentials to access S3.

# How to update the site

Heroku is setup with auto deployment, this means that every time there will be a new commit in to the master branch, the site will automatically redeploy.
