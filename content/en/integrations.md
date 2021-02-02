---
title: Integrations
position: 1
category: Documentation
services:
  - API Gateway
  - CloudFront
  - Route53
  - CloudWatch
  - Certificate Manager
  - CloudFormation model a collection of related AWS and third-party resources,
    provision them quickly and consistently
  - Cognito control access to AWS resources from your app
  - DynamoDB a fully managed proprietary NoSQL database service that supports
    key-value and document data structures
  - EC2 allows users to rent virtual computers on which to run their own
    computer applications
  - IAM enables you to manage access to AWS services and resources securely
  - Lambda an event-driven, serverless computing platform
  - S3 provides object storage through a web service interface
  - SES scalable email service that enables developers to send mail from within
    any application
  - SNS messaging service for both application-to-application (A2A) and
    application-to-person (A2P) communication
  - SQS
  - VPC launch AWS resources in a logically isolated virtual network
---

## Amazon Web Services

```
AWS::SQS::Queue - our queue
AWS::SNS::Topic - our topic
AWS::SNS::Subscription - the subscription between the queue and the topic
AWS::SQS::QueuePolicy - the IAM policy which allows this topic to send messages to the queue
```

### Amazon Cognito

Amazon Cognito offers user pools and identity pools. User pools are user
directories that provide sign-up and sign-in options for your app users.
Identity pools provide AWS credentials to grant your users access to other AWS
services.

### URL Signer Example

Create AWS S3 url parameters to upload directly from browser
<https://github.com/vrajroham/aws-s3-url-signer-php>

<!-- TODO: Migrate url-signer code to reside alongside other apis (or not) ...perhaps a candidate for 'lambda' function. -->

- <http://url-signer.test/>

#### PHP

```php{5-7}[application/helpers/signature_helper.php]
use EddTurtle\DirectUpload\Signature;
require_once __DIR__ . "/vendor/autoload.php";
$options = array('acl' => 'public-read-write');
$upload = new Signature(
    "YOUR_S3_KEY",
    "YOUR_S3_SECRET",
    "YOUR_S3_BUCKET",
    "eu-west-1",
    $options
);
echo json_encode([
    'signature' => $upload->getFormInputs(),
    'postEndpoint' => $upload->getFormUrl()
]);
```

#### Sample Output

```json
{
  "signature": {
    "Content-Type": "",
    "acl": "public-read-write",
    "success_action_status": "201",
    "policy": "eyJleHBpcmF0aW9uIjoiMjAyMS0wMS0xNFQxOToyOTowMVoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJ0ZC1hd3MtYnVja2V0In0seyJhY2wiOiJwdWJsaWMtcmVhZC13cml0ZSJ9LFsic3RhcnRzLXdpdGgiLCIka2V5IiwiIl0sWyJzdGFydHMtd2l0aCIsIiRDb250ZW50LVR5cGUiLCIiXSxbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwwLDUyNDI4ODAwMF0seyJzdWNjZXNzX2FjdGlvbl9zdGF0dXMiOiIyMDEifSx7IngtYW16LWNyZWRlbnRpYWwiOiJBS0lBWEdZWEhTWFhIWUJSNUhPRVwvMjAyMTAxMTRcL3VzLWVhc3QtMVwvczNcL2F3czRfcmVxdWVzdCJ9LHsieC1hbXotYWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsieC1hbXotZGF0ZSI6IjIwMjEwMTE0VDEzMjkwMVoifV19",
    "X-amz-credential": "AKIAXGYXHSXXHYBR5HOE/20210114/us-east-1/s3/aws4_request",
    "X-amz-algorithm": "AWS4-HMAC-SHA256",
    "X-amz-date": "20210114T132901Z",
    "X-amz-signature": "71288f979a077396de210b1ef54f185395d2c1b9972014cc01d90b5059ac5b42",
    "key": "${filename}"
  },
  "postEndpoint": "//s3.amazonaws.com/td-aws-bucket"
}
```

### Dropzone Vue Example

#### Browser side

- Once a file been added, request the `GetSignedURL` API to have a pre-signed
  URL to upload file directly to S3
- Process one file at a time, the `Dropzone.options.url` is changing over time
  for each file
- Use PUT method to simplify configuration on S3, so we should modify the upload
  behavior of Dropzone (it always uses a formData scenario)

#### AWS API Gateway

Create and deploy an API to trigger the Lambda function, don't forget to enable
CORS. An example invoke URL will be something like:

```
https://<some-hash-id>.execute-api.<some-region>.amazonaws.com/<stage>
```

#### AWS Lambda

This Lambda function will sign a URL which allows PUT upload for each file to
S3, so make sure the Role executing the Lambda have at least `PutObject` and
`PutObjectAcl` permission on your S3 bucket. An example Role might looks like:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:PutObjectAcl"],
      "Resource": ["arn:aws:s3:::<YOUR_BUCKET_NAME>/*"]
    }
  ]
}
```

#### AWS S3

A working example of CORS config for the bucket:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>PUT</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

### Object key and metadata

Each Amazon S3 object has data, a key, and metadata. The object key (or key
name) uniquely identifies the object in a bucket. Object metadata is a set of
name-value pairs. You can set object metadata at the time you upload it. After
you upload the object, you cannot modify object metadata. The only way to modify
object metadata is to make a copy of the object and set the metadata.

The following are examples of valid object key names:

- `4my-organization`
- `my.great_photos-2014/jan/myvacation.jpg`
- `videos/2014/birthday/video1.wmv`

#### Object metadata

There are two kinds of metadata: system metadata and user-defined metadata.

### Amazon S3 storage classes

Each object in Amazon S3 has a storage class associated with it. For example, if
you list the objects in an S3 bucket, the console shows the storage class for
all the objects in the list.

Amazon S3 offers a range of storage classes for the objects that you store. You
choose a class depending on your use case scenario and performance access
requirements. All of these storage classes offer high durability.

### Policies

A Policy is a container for permissions. The different types of policies you can
create are an [IAM Policy], an [S3 Bucket Policy], an [SNS Topic Policy], a [VPC
Endpoint Policy], and an [SQS Queue Policy].

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowPublicRead",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::victortolbert/*"
        }
    ]
}

{
    "Version": "2012-10-17",
    "Id": "Policy1610569368938",
    "Statement": [
        {
            "Sid": "Stmt1610569306870",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::td-aws-bucket/*"
        }
    ]
}
```

[iam policy]:
  http://docs.amazonwebservices.com/IAM/latest/UserGuide/PermissionsAndPolicies.html
[s3 bucket policy]:
  http://docs.amazonwebservices.com/AmazonS3/latest/dev/UsingBucketPolicies.html
[sns topic policy]:
  http://docs.amazonwebservices.com/sns/latest/gsg/AccessPolicyLanguage.html
[vpc endpoint policy]:
  http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/vpc-endpoints.html
[sqs queue policy]:
  http://docs.amazonwebservices.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/AccessPolicyLanguage.html

## Google Cloud Platform

```
key=AIzaSyBvOoQe7xFg-XaWj9w_l7ODbMqb4BK0B9E
```
