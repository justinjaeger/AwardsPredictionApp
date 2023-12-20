# Awards Expert App
* Predict any film
* See aggregate "community" rankings
* Follow friends, see recent updates
* Track your history throughout awards season

# To build:
* Android: `yarn start` in one terminal, then `yarn android` in another

# How to release:
1. Make sure ENV is pointing to production!!

## IOS
### Update the app version in:
* info.plist CFBundleShortVersionString
* project.pbxproj - MARKETING_VERSION, CURRENT_PROJECT_VERSION
* `package.json.version` (for ability to version check / force updates)
* Update `appinfo` collection in mongodb to be in sync with the info.plist version
### Open app in XCode
* `xed ios`
#### Sign into correct account under Signing & Capabilities
* Profile = `"Justin Jaeger"` - NOT "Justin Jaeger (Personal Team)"
* Account is `oscarexpertapp@gmail.com` - NOT jjustinjaeger@gmail.com
• If not seeing the profile, click "team" in xcode then "add account" and sign in
#### Build
* First, build for physical device; plug in iPhone
* Then, `Product -> Archive`
* Open `Window -> Organizer`
* Inside the window, `Validate App`
* Then, `Distribute App` and choose either for Testflight or App Store
### Testflight
* Go to App Store Connect account (https://appstoreconnect.apple.com/apps/6446135720/testflight/ios)

## ANDROID
### In VSCode
* Update version `app/build.gradle` -> `versionName` AND `versionCode`
* Important: versionCode must be an integer, and is NOT what is displayed on play store
* (https://developer.android.com/studio/publish/versioning)
### Build
* Overall guide: (https://developer.android.com/studio/publish/app-signing#sign-apk)
* I created an upload key already, which must be used to sign the app
* To Sign:
* Open Android studio
* From top bar, `Build -> Generate Signed Bundle / APK`, then hit Next
* Enter passwords (they're the same, see notes)
* Choose `Release`
* After the build runs, it will be at `/Users/justinjaeger/VSCode/OscarExpert/AwardsPredictionApp/android/app/release/app-release.aab`
### Upload to Play Console
* Now that we have a build file, we can upload it to the play store `[sidebar] App bundle explorer` (https://play.google.com/console/u/0/developers/7592820188677524175/app/4975201475300894677/bundle-explorer-selector)
### Testing
* Before we publish, we have to do a round of testing
* Not sure about subsequent rounds, but for FIRST ROUND, Play store requires a published  round of Closed testing (https://play.google.com/console/u/0/developers/7592820188677524175/app/4975201475300894677/closed-testing)
* Hit `Manage Track`, `Create new release`, add the App bundle from library, Next, Save
* Publish for review - click `Send changes out for review` (https://play.google.com/console/u/0/developers/7592820188677524175/app/4975201475300894677/publishing)