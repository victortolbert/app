import path from 'path'
import express from 'express'
import jsonServer from 'json-server'
import AWS from 'aws-s3'
const api = express()

function getUserId() {
  return 1
}
function getRandomFilename() {
  return 1
}

api.use(
  '/api',
  jsonServer.router(path.join(__dirname, '..', 'server', 'data.json')),
)

api.get('/sign_put', (req, res) => {
  const contentType = req.query.contentType
  // Validate the content type
  if (!contentType.startsWith('image/')) {
    throw new Error('must be image/')
  }
  const userid = getUserId() // some kind of auth

  // check if the user is authorized to upload!

  const url = AWS.S3.getSignedUrl('putObject', {
    Bucket: process.env.BUCKETNAME, // make it configurable
    Key: `${userid}-${getRandomFilename()}`, // random with user id
    ContentType: contentType,
    // can not set restrictions to the length of the content
  })
  res.json({url})
})

export default api
