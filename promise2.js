var AWS = require('aws-sdk-promise');
var ec2 = new AWS.EC2({ region: 'us-east-1' });

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAI35YVDRTSJ47FJZA",
  secretAccessKey: "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"
});

ec2.describeInstances({}).promise().then(
  function(req) {
    // the promise is resolved on the 'complete' event of request object
    console.log(JSON.stringify(req.data, null, 2));
  },
  function(error) {
    // rejected if the 'complete' event contains an error
    console.log(error);
  }
);
