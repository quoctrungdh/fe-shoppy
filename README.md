# Typescript + React + Parcel = ❤️ 

## Built in settings

- React + ReactDOM (ver.16)
- Typescript (with TSLint setting)
- Prettier + tslint-config-prettier
- Test configuration using Jest + Enzyme
- Parcel bundler

## How to set up the project

```
git clone git@github.com:quoctrungdh/fe-shoppy.git
cd fe-shoppy
npm install
```

## How to start development for the application

    npm run start

Execute the command and you can run the application on `localhost:1234` in the browser.

## How to build the application

    npm run build

The default output directory is `/dist`. You can change the destination wherever you want.

```
// package.json
// ...
"scripts": {
  // ...
  "build": "parcel build ./client/index.html -d YOUR_OUTPUT_DIR --public-url '/'" <- Change here
}
// ...
```