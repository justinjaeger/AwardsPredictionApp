## Awards Expert App
• Predict any film
• See aggregate "community" rankings
• Follow friends, see recent updates
• Track your history throughout awards season

## Amplify instructions
- (https://docs.amplify.aws/start/getting-started/installation/q/integration/react-native/)
- amplify configure
    - sets up a new user with access key and secret
- amplify init
    - initializes project in the cloud
    - I do this with the access keys I created in the last command with the IAM user
- "When you’re ready to add a feature, run amplify add <category>"
    - like "amplify add api" or "amplify add auth" instead
- THEN:
    - Note: The below is better configured in the dashboard
    - (https://ui.docs.amplify.aws/react/connected-components/authenticator)
    - amplify add auth
        - ads auth resource locally
    - amplify push
        - builds backend resources and provisions it in cloud
