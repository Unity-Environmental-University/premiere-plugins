# Write SRT to TXT File

This Premiere Pro plugin, built with React, provides a way to generate readable transcripts directly within the Adobe Creative Cloud app. It removes sequence numbers and timecodes from an SRT file and saves the clean text in a new file. The simple panel interface includes a file picker for uploading SRT files and gives feedback once the process is complete.

## Install dependencies

After you ensure that your terminal is in the root of this project, use `npm` to install the various dependencies needed:

```
npm install
```

## Build Process

There are two ways to build the plugin for use in Premiere Pro:

-  `npm watch` will build a development version of the plugin, and recompile everytime you make a change to the source files. The result is placed in `dist` folder.
- `npm build` will build a production version of the plugin and place it in `dist` folder. It will not update every time you make a change to the source files.

> You **must** run either `watch` or `build` prior to trying to use within Premiere Pro.

## Launching in Premiere Pro

You can use the UXP Developer Tools to load the plugin into Premiere Pro.

If the plugin hasn't already been added to your workspace in the UXP Developer Tools, you can add it by clicking "Add Plugin...". You can either add the `manifest.json` file in the `dist` folder or the `plugin` folder.

- If you add the one in the `plugin` folder, then you need to update the relative path to the plugin build folder ( `dist` ) by clicking the ••• button > "Options" > "Advanced" > "Plugin build folder".
- During development, it is recommended to build the plugin using `yarn watch` and load the `manifest.json` in the (plugin build) `dist` folder.

Once added, you can load it into PremierePro by clicking the ••• button on the corresponding row, and clicking "Load". Switch to PremierePro and you should see the starter panels.

### Common Issues

If you're getting errors with `npm install`, we can reinstall the project dependencies. Let's first make sure to delete `node_modules/*` from the `template` folder as well as the `package-lock.json` and `yarn.lock` file. Staying in the `template` directory, run `npm install` again and this will regenerate your `package-lock.json` file.

Premiere Pro Version : 23.0.0 or higher
UXP Version : 5.6 or higher
