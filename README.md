# Been There, Done That

A travel destination log.

## Tech Stack

### API

- [Geoapify](https://apidocs.geoapify.com/)

### Server

- [Node](https://nodejs.org/en/)
- [apollo-server](https://www.npmjs.com/package/apollo-server)
- [axios](https://www.npmjs.com/package/axios)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [graphql](https://www.npmjs.com/package/graphql)

### Front End

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/)
- [graphql](https://www.npmjs.com/package/graphql)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Mapbox](https://www.mapbox.com/)
- [lodash.clonedeep](https://www.npmjs.com/package/lodash.clonedeep)

### Linting & Formatting

- [eslint-config-lucas-silbernagel](https://www.npmjs.com/package/eslint-config-lucas-silbernagel)

### Code Analysis

- [SonarCloud](https://sonarcloud.io/)

## Run Locally

### Prerequisites

In order to run this application locally, you must have node installed on your computer. To check if you already have it installed, enter `node -v` in your terminal. If you do not have node, you can install it here: https://nodejs.org/en/

### Clone the repository

Once you have confirmed that node is installed, `cd` into a folder on your computer and run the following command to clone the repository:

`git clone https://github.com/LucasSilbernagel/bt-dt.git`

Then `cd` into the root folder and open it in your code editor. For Visual Studio Code:

`cd bt-dt`
`code .`

### Install dependencies

To install all of the required dependencies, run `npm run installDeps`.

### Environment variables

Get an API key from [Geoapify](https://apidocs.geoapify.com/#docs).

In the root folder of the app, create a new file called `.env` and save your API key in it with a key of GEOAPIFY_KEY. The file should now look something like this:

`GEOAPIFY_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

There should be no quotation marks or brackets in this file.

A custom ESLint configuration has been added to the root folder of the app rather than the client folder. As a result, conflicts can occur between the custom ESLint configuration and the ESLint configuration built into `create-react-app`. In order for the app to run and build smoothly, create a `.env` file in the `client` folder and add the following variables:

```
SKIP_PREFLIGHT_CHECK = true

DISABLE_ESLINT_PLUGIN = true
```

The application map is built with Mapbox. Get an API key from [Mapbox](https://www.mapbox.com/) and add it to the `.env` file in the `client` folder.

### Start up the app

To start up the app, make sure you are in the root folder and then run `npm run dev` in your terminal. This should start both the app's server and the front end in a single terminal window, and launch the app in a new browser tab. You are now running the app locally!

## Testing

### Unit Tests

Unit tests are written with [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

Use `npm run test:unit` to run all unit tests, or `cd` into the client folder and use `npm test -- SomeFileToRun` to run a specific test file.

### End-to-End Tests

End-to-end tests are written with [Cypress](https://www.cypress.io/).

Use `npm run test:e2e` to launch the Cypress test runner.
