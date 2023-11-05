## Awards Expert App
• Predict any film
• See aggregate "community" rankings
• Follow friends, see recent updates
• Track your history throughout awards season

# Notes on how to release:
• Update the app version
  • info.plist CFBundleShortVersionString
  • project.pbxproj
    • MARKETING_VERSION
    • CURRENT_PROJECT_VERSION
  • Gemfile.lock
  • `package.json.version`
• Update `appinfo` collection in mongodb to be in sync with the info.plist version