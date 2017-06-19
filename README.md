# mean_QnA

MEAN application using MongoDB, Express, AngularJS, and Node.js

Written in JavaScript, styled with Bootstrap

### User Story

Register or login with feedback of validation issues

Post questions, answer other people's questions, and like answers

Search questions with a live filter

### Technical Points of Interest

Angular Cookies tracks if someone is logged in, and which specific user it is

Validation errors from creating or updating entries in the database are displayed to the client on the front-end

Mongo database has separate collections for users, questions and answers that use associations rather than embedded documents

Mongoose queries use `.populate` to increase efficiency by eliminating the need to query the database multiple times to get associated data
