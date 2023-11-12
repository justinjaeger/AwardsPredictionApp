## Awards Expert App
* Predict any film
* See aggregate "community" rankings
* Follow friends, see recent updates
* Track your history throughout awards season

## How to release:
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
* 