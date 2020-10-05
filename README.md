![Alt text](https://raw.githubusercontent.com/gkarlovskis/react-sandbox/master/src/assets/preview.png)

# React Sandbox (Authentication app)

Authentication app is written in React/TypeScript.

# Project Configuration

## Folder Structure

The source code is located under **src** folder, meanwhile the tests are under **test**.
In **src** folder you can find a TypeScript file called `index.tsx` which is entry point of app.
The **test** folder contains a `jest` test cases.

## Configuration

Configuration is handled via Environment variables and stored in Git. The directory "config" contains configuration files for all supported environments where this service will be run.

### Configuration parameters

| Paramter          | Description          |
| ----------------- | -------------------- |
| AUTH_API_ENDPOINT | Auth server endpoint |

## How to install and run locally

To install related packages:
`npm install`

To prettify:
`npm run format`

To lint:
`npm run lint`

To run the unittest:
`npm test`

To build (to transpile .ts files into .js files):
`npm run build`

To run the app:
`npm run start`

## Testing data

Username: demo@demo.lv and demo1@demo.lv
Password: anypassword

To test app, please use CORS Plugin in Chrome (https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf).
