# teachparttime.com

This is the official repository for teachparttime.com.

# How to run this project

First install all the necessary modules

```
npm install
```

Then build the project

```
npm run build
```

Then go to the `_preview` folder and open `home.html`

# Where is this project hosted

This project is hosted on AWS. We use S3 to store the site, and then use CloudFront to deliver the site using AWS Certificate Manager.

# How to update the site

You can do it manually by updating the file on S3, and then invalidating the cash in CloudFront. Or you can use [potato](https://www.npmjs.com/package/@0x4447/potato) to automatically do it for you.

# Everything in one command

`npm run build && potato -s _output -u -b dev.teachpart-time.com -a KEY -t SECRET_KEY`

To preview the project visit the `_preview` folder and click on the `home.html` file to open the page.

