# Been There, Done That

A travel destination log.

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

### Start up the app

To start up the app, make sure you are in the root folder and then run `npm run dev` in your terminal. This should start both the app's server and the front end in a single terminal window, and launch the app in a new browser tab. You are now running the app locally!
