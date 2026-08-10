#!/bin/sh
set -eu

APP_PATH="Cracked-darwin-arm64/Cracked.app"
OUTPUT_DIR="Installers"
OUTPUT_PATH="${OUTPUT_DIR}/Cracked-arm64.dmg"

if [ ! -d "$APP_PATH" ]; then
    echo "Missing $APP_PATH; run npm run package first." >&2
    exit 1
fi

STAGING_DIR="$(mktemp -d "${TMPDIR:-/tmp}/cracked-dmg.XXXXXX")"
trap 'rm -rf "$STAGING_DIR"' EXIT

mkdir -p "$OUTPUT_DIR"
cp -R "$APP_PATH" "$STAGING_DIR/"
ln -s /Applications "$STAGING_DIR/Applications"
rm -f "$OUTPUT_PATH"

hdiutil create \
    -volname "Cracked" \
    -srcfolder "$STAGING_DIR" \
    -ov \
    -format UDZO \
    "$OUTPUT_PATH"

echo "Wrote $OUTPUT_PATH"
