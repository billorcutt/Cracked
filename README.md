# README #

App version of "I Dropped My Phone The Screen Cracked"

npm install

to run---

./node_modules/.bin/electron . 

to package--

electron-packager . Cracked --platform=darwin --arch=x64 --version=0.35.6 --icon=<path-to>/cracked.icns

build installer--

electron-installer-dmg --overwrite Cracked-darwin-x64/Cracked.app Cracked --out=Installers/
