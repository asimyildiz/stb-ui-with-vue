# nstb
POC for new STB UI code using vue.js

## Project initial steps
Project uses beINFW package which needs to be published to local npm registry (verdaccio)
```
npm config set registry http://localhost:4873
```
- Project is tested on a Chrome Browser with disabled web security
- Install chrome browser
- Run chrome browser with options "--disable-web-security --user-data-dir='~/ChromeDataDir/'" (Ubuntu) 
- Before serving the code, make sure that there is an 'sdk' folder created on root of the project

## Project setup
```
npm install
```

## Loads FW and create vendor specific codes to sdk folder
```
npm run aliases desktop
```

### Compiles and hot-reloads for development
```
npm run serve
```

## Use application
- Open chrome browser with disabled web security
- Navigate to http://localhost:8080
- Press numeric keys to open TuneScreen and press enter to change channel
- Press left-right-up-down keys while InfoScreen is opened to focus between different components
- Press 'P' key to open VOD
- Press 'Q' key to close any screen
- Press 'V' and 'B' buttons to manage volume

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```
