
![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# On That Wave
![screen shot 2018-02-11 at 2 13 20 pm](https://user-images.githubusercontent.com/29477363/36074282-d174f4a0-0f35-11e8-97c1-21bc9f80467e.png)

![screen shot 2018-02-11 at 2 25 36 pm](https://user-images.githubusercontent.com/29477363/36074471-20f2f2be-0f38-11e8-8f67-8103e18b5913.png)

## Intro
"On That Wave" is a Full-Stack application using Mongo, Express, Node.js and AngularJS. It is the outcome of a week-long collaborative endeavour between three students of General Assembly's Web Development Immersive course, London programme. The idea was born following group discussions and assessing its merits and promises against other initial ideas. 

You can view the deployed app on **[Heroku](https://secure-plateau-56912.herokuapp.com/)**. 

## Planning and workflow

![screen shot 2018-02-04 at 11 10 03 am](https://user-images.githubusercontent.com/29477363/36074949-168ccda2-0f3f-11e8-9555-a115477ba251.png)

Our planning included wireframing via balsamiq.com and labour division in Trello. Communication was managed via Slack and the team contributions and collaboration was managed using a standard Git flow on Github. In terms of work dynamic, we had daily standups to check progress, did some pair programming - especially on the more buggy features - and individual work on assigned tasks via Trello. 

## Technologies

To view the code source check the **[GitHub project repository](https://github.com/floissac/WDI-GROUP-PROJECT)**.

### Frontend

The main techonology on the frontend was AngularJS and the following dependencies were utilized: 

  - "angular-ui-router": 1.0.14,
  - "angular-resource": 1.6.8,
  - "angular-messages": 1.6.8,
  - "satellizer": 0.15.5,
  - "angular": 1.6.9,
  - "angular-filepicker": 1.1.4

For this app, we consumed two APIs. The main one is the [Absolut Drinks Database](https://addb.absolutdrinks.com/docs/) and we have made proxy requests in the backend (using the request-promise library) to get the cocktails and access the API's quick search functionality. In addition, a separate connection was made to the API's image database. The other API, a file upload service, is called [Filestack](https://www.filestack.com/).

> **Styling** We have relied on **[Bulma](https://bulma.io/)** as a CSS framework, due to its reliance on **Flexbox**. We have applied it on top of our HTML5 skeleton and have used SASS to organize the CSS. 

### TDD

To test our app, we have used two libraries: [Mocha](https://mochajs.org/) to run the tests and [Chai](http://chaijs.com/) to run the assertions. To be able to make HTTP requests inside tests, we relied on a framework called [`supertest`](https://github.com/visionmedia/supertest).

### Backend
The core techonologies in the backend included MongoDB, Node.js and its web framework, Express. We relied on JSON Web Token (JWT), to securely transmit information between parties as a JSON object. We have encripted user passwords with bcrypt. A list of all backend dependencies is provided below.

| Dependencies | DevDependencies | 
| --- | --- |
| *"bcrypt"*: "1.0.3", *"bluebird"*: "3.5.1", *"body-parser"*: "1.13.2", *"express"*: "4.14.0", *"jsonwebtoken"*: "8.1.1", *"mongoose"*: "5.0.1", *"morgan"*: "1.6.1, *"request-promise"*: "4.2.2" | *"babel-cli"*: "6.18.0", *"babel-preset-es2015"*: "6.18.0", *"bower"*: "1.8.0", *"browser-sync"*: "2.17.6", *"chai"*: "4.1.2", *"event-stream"*: "^3.3.4", *"gulp"*: "^3.9.1",     *"gulp-sass"*: "^2.3.2", *"mocha"*: "^5.0.0", *"nyc"*: "^11.4.1", *"require-dir"*: "^0.3.1", *"supertest"*: "^3.0.0" |

## Achievements
This is a full stack, REST-ful MEAN APP: MongoDb, Express.js, AngularJS and Node.js. It relies on a third-party API as well as a local one to allow users to upload and update their own resources. It is a fully responsive app. We have applied form validation using AngularJS ngMessages directive. The third-party API is fully searchable and each cocktail offers the step-by-step instruction on how to make it. Search results can be further filtered by flavour and/or bartender ratings. Users can favorite a cocktail adding this to their profile. 
![screen shot 2018-02-11 at 2 29 39 pm](https://user-images.githubusercontent.com/29477363/36316282-d28cc48a-1331-11e8-9771-7b9e97a8abb5.png)


## Challenges
The main challenge encountered was enabling both an external and a local API. That required a lot of additional work as at times the two APIs needed different code to work.

## Next steps 

- replace the landing page with a modal on the index page
- add a functionality for users to type in ingredients they have at home and display the cocktails they can make with those
- add google places to display places where you buy missing ingredients or placed that offer those cocktails

## Acknowledgments 
This project would not have come to fruition without the brilliant support from General Assembly's instructional team. Kudos to Ben, Emily, Guy, and Rane.

![Here's to you all](https://media.giphy.com/media/Bg2rZ4Hcdp8Yg/giphy.gif)


    
