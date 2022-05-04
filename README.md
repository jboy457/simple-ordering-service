# simple-ordering-service

- Install [Node.js](https://nodejs.org/en/) version 16.13.0


# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Create a .env file in the project directory
- Copy all key param in .env.example into .env and update them with values

- Build and run the project
```
npm start
```

- Build and run the project in development
```
npm run dev
```
Note that the above command will only work if you have nodemon installed globally on your system
- To Run all test cases.
- Update test credentails in setup_test.js
```
npm test or npm run test
```

- To Run a single test cases
```
npm run test:only <test file name>
```

- API Document endpoints

  swagger-ui  Endpoint : http://localhost:{PORT}
