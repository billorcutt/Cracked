# README #

App version of ["I Dropped My Phone The Screen Cracked"](https://github.com/billorcutt/i_dropped_my_phone_the_screen_cracked)

Download the [app](https://github.com/billorcutt/Cracked/releases/download/0.1.1/Cracked.dmg) for Mac OS or
[Linux](https://github.com/billorcutt/Cracked/releases/download/0.1.1-Linux/Cracked-linux-x64.tar.gz).

Or build it yourself:

```bash
npm install

# to run---
./node_modules/.bin/electron . 

# to package--
electron-packager . Cracked --platform=darwin --arch=x64 --version=0.35.6 --icon=<path-to>/cracked.icns

# build installer--
electron-installer-dmg --overwrite Cracked-darwin-x64/Cracked.app Cracked --out=Installers/
```
