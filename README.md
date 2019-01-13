# README #

App version of ["I Dropped My Phone The Screen Cracked"](https://github.com/billorcutt/i_dropped_my_phone_the_screen_cracked)

Download the app for Mac & Linux under [releases](https://github.com/billorcutt/Cracked/releases).

Or build it yourself using Node JS v10.11.0

```bash
npm install

# to run---
./node_modules/.bin/electron . 

# to package for Mac
./node_modules/electron-packager/cli.js . Cracked --platform=darwin --arch=x64 --icon=./cracked.icns --overwrite

# to package for Linux
./node_modules/electron-packager/cli.js . Cracked --platform=linux --arch=x64 --icon=./cracked.icns --overwrite

# build installer for Mac
./node_modules/electron-installer-dmg/bin/electron-installer-dmg.js --overwrite Cracked-darwin-x64/Cracked.app Cracked --out=Installers/
```
