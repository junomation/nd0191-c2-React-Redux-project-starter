# **Would You Rather Project**
This is a web application that lets users post and answer "Would You Rather" questions. Users can view a list of questions, view individual questions, answer questions, and create new questions.

This project was built using React, Redux, and React Router.

## **Installation**
To run this project locally, follow these steps:

Clone this repository onto your local machine
```
git clone https://github.com/junomation/nd0191-c2-React-Redux-project-starter.git
```

change directory into the my-project directory since this is the project directory that's created with `create-react-app`:
```
cd my-project
```

Run ```npm install``` to install the required dependencies
```
npm install
```

Run ```npm start``` to start the development server
```
npm start
```

The application should now be running at http://localhost:3000.

## **Testing**

To run tests, use the command ```npm test``` in the project directory. This will launch the Jest test runner and execute the test suite.
```
npm test
```



## **Usage**
### *Login*
Before you can access any of the features of this application, you must log in with a valid user account. If you do not have a user account, you can create one by clicking the "Sign Up" button on the login page.

### *Home*
After logging in, you will be taken to the home page, where you can view a list of all of the "Would You Rather" questions that have been posted. You can click on a question to view the details of the question, including the two options and the number of votes each option has received.

### *Question Details*
On the question details page, you can vote for one of the two options by clicking the "Submit" button. Once you have voted, you will see the current vote totals for each option.

### *New Question*
To create a new "Would You Rather" question, click the "New Question" button on the navigation bar. You will be prompted to enter the two options for the question, and then the new question will be added to the list on the home page.

### *Leaderboard*
The leaderboard page shows a ranking of users based on the number of questions they have posted and the number of questions they have answered.

### *Navigation*
The navigation bar at the top of the page allows you to easily navigate between the different sections of the application