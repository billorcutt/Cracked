# README #

App version of ["I Dropped My Phone The Screen Cracked"](https://github.com/billorcutt/i_dropped_my_phone_the_screen_cracked)

Download the app for Mac & Linux under [releases](https://github.com/billorcutt/Cracked/releases).

Or build it yourself using Node.js 22.12 or newer:

```bash
npm install

npm run start

npm run test:smoke

npm run package

npm run make-installer
```

`npm run package` creates a native Apple silicon (`arm64`) application in
`Cracked-darwin-arm64/`. An Intel build remains available with
`npm run package-mac-intel`.

`npm run test:smoke` launches Cracked, verifies that the editor initializes,
changes the theme, opens a bundled demo, and exits with a nonzero status if any
of those checks fail.
