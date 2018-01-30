# Angular Cordova Sandbox

This project is a Hybrid Cordova Web + Mobile app in Angular 4

## Install dependencies

* Install Node.js from: `https://nodejs.org/en/download/`
* Install Angular cli using: `npm i -g @angular/cli@latest`
* Install Cordova using: `npm install -g cordova`
* Install `jdk 8` or higher
* Install `AndroidStudio` from: `https://developer.android.com/studio/install.html`
* Add path for `tools` and `platform-tools` path to WINDOWS path (tool and platform-tools can be found in android SDK path, usually: `C:\Users\<username>\AppData\Local\Android\Sdk`)
* Accept Android licenses from `AndroidStudio` or using the following from command line `./sdkmanager --licenses`. `SDKManager.bat` file is located in android SDK `path\tools\bin`.

## Install Project

* Clone angular_cordova_sandbox repository: `git clone https://bitbucket.org/ctisrnd/angular_cordova_sandbox.git`
* Go to angular_cordova_sandbox repository: `cd angular_cordova_sandbox`
* Install dependencies: `npm install`

## Development server

* Development project folder is `src/`. You should start building your Angular 4 app there!
* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build Angular project

* For Android App to work, change base url in index.html to: `<base href="file:///android_asset/www/">` or simple: `<base href=".">`
* For iOS App to work, change base url in index.html to: `<base href="./">` or `<base href=".">`
* Run `ng build` to build the Angular project.
* The build artifacts will be stored in the `www/` directory.
* Use the `-prod` flag for a production build.

## Adding Cordova platform

* Running `ng serve` removes the `www/` directory while `ng build` restores it. You will need `www/` directory for `cordova` commands
* Go to angular_cordova_sandbox repository: `cd angular_cordova_sandbox\`
* Add sqlite plugin: `cordova plugin add cordova-sqlite-storage --save`
* List available Cordova platforms: `cordova platform ls`
* Add a desired platform: `cordova platform add [ browser | android | ios | .. ]`

## Run Cordova app

* After adding Cordova platform, we can run our app in desired platform: `cordova run [ browser | android | .. ]`
* Run in emulator using: `cordova emulate android`. If no emulator found, setup emulator by opening `AndroidStudio` -> create blank new project -> Open AVD Manager -> Follow steps to create a new AVD.
* Troubleshoot `console.log` messages in the source code for the app running in the emulator using chrome browser. With the emulator running visit `chrome://inspect/#devices` and click `inspect` under `Remote Target` section to view `Google developer tools` window for the emulator application.

## Build Cordova project

* Run `cordova build [ browser | android | .. ]` to build the Cordova project.
* For example android build .apk is located in: `platforms/android/build/outputs/apk/`
