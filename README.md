# [Vincto Front Page](https://startbootstrap.com/template-overviews/freelancer/)

This is Vincto company website.

## Deployment

### Prerequisite

- Valid AWS account
- NPM
- Gulp
- [AWS cli](https://aws.amazon.com/cli/)
- [Sam cli](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

```
#Deploy backend
cd lambda
npm i
sam build
sam deploy --guide --parameter-overrides ContactMeEmail="<Your_email>" ContactMeTopicName="<Your_topic>"

#Copy ContactMeApi Url OutputValue

#Configure frontend
echo "let CONTACT_ME_URL = '<ContactMeApi Url OutputValue>';" >> js/config.js

#Create an S3 bucket
cd ..
npm i
gulp
aws s3 mb s3://BUCKET_NAME
aws s3 cp index.html s3://BUCKET_NAME
aws s3 sync css/ s3://BUCKET_NAME/css
aws s3 sync img/ s3://BUCKET_NAME/img
aws s3 sync js/ s3://BUCKET_NAME/js
aws s3 sync vendor/ s3://BUCKET_NAME/vendor
```

## Thanks

- [Start Bootstrap - Freelancer](https://startbootstrap.com/template-overviews/freelancer/)
