import React, { useState } from 'react';
import { View } from 'react-native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { SubmitButton } from '../../../components/Buttons';
import FormInput from '../../../components/Inputs/FormInput';
import { BodyBold, SubHeader, SubHeaderLight } from '../../../components/Text';
import COLORS from '../../../constants/colors';
import SlackApi, { SlackChannel } from '../../../services/slack';
import { useAuth } from '../../../context/AuthContext';
import { useNavigateAwayEffect } from '../../../util/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HorizontalScrollingTabs from '../../../components/HorizontalScrollingTabs';
import theme from '../../../constants/theme';

const SendMessage = () => {
  const { userEmail } = useAuth();

  const [type, setType] = useState<SlackChannel>(SlackChannel.SUGGESTIONS);
  const [message, setMessage] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [userDidSubmitContact, setUserDidSubmitContact] = useState<boolean>(false);

  const reset = () => {
    setShowConfirmation(false);
    setUserDidSubmitContact(false);
  };

  useNavigateAwayEffect(() => {
    reset();
  }, []);

  const data = [
    {
      text: 'Suggestion',
      value: SlackChannel.SUGGESTIONS,
      isSelected: type === SlackChannel.SUGGESTIONS,
    },
    {
      text: 'Support',
      value: SlackChannel.SUPPORT,
      isSelected: type === SlackChannel.SUPPORT,
    },
    {
      text: 'Bug',
      value: SlackChannel.BUGS,
      isSelected: type === SlackChannel.BUGS,
    },
    {
      text: 'Question',
      value: SlackChannel.QUESTIONS,
      isSelected: type === SlackChannel.QUESTIONS,
    },
    {
      text: 'Other',
      value: SlackChannel.OTHER,
      isSelected: type === SlackChannel.OTHER,
    },
  ];

  const characterRequirement = 20;
  const characterRequirementContact = 6;
  const contactIsFilled = contact.length >= characterRequirementContact;
  const submitIsDisabled = message.length < characterRequirement;

  const onSubmit = () => {
    setMessage('');
    setShowConfirmation(true);
    if (contactIsFilled) {
      setUserDidSubmitContact(true);
    }
    const allInfo = `
        User Email: ${userEmail || 'none'}
        Contact: ${contact}
        Message: ${message}
    `;
    SlackApi.sendMessage(allInfo, type);
  };

  return (
    <BackgroundWrapper>
      <KeyboardAwareScrollView extraHeight={200} style={{ width: '100%' }}>
        <SubHeaderLight
          style={{ paddingLeft: theme.windowMargin, paddingTop: theme.windowMargin }}
        >
          {'Your feedback improves the app!'}
        </SubHeaderLight>
        <View
          style={{
            paddingTop: theme.windowMargin,
            paddingBottom: theme.windowMargin,
          }}
        >
          <HorizontalScrollingTabs<SlackChannel>
            options={data}
            onPress={(v) => setType(v)}
            contentContainerStyle={{ paddingLeft: theme.windowMargin }}
          />
        </View>
        <View
          style={{
            width: '100%',
            paddingLeft: theme.windowMargin,
            paddingRight: theme.windowMargin,
          }}
        >
          <FormInput
            label={'Message'}
            caption={
              submitIsDisabled && !showConfirmation
                ? `Must be at least ${characterRequirement} characters`
                : ''
            }
            value={message}
            setValue={setMessage}
            multiline
          />
          <FormInput
            label={'Your contact (optional)'}
            value={contact}
            setValue={setContact}
            style={{ marginTop: 20 }}
            textContentType={'emailAddress'}
          />
          <SubmitButton
            text={'Submit'}
            onPress={onSubmit}
            style={{ width: '100%', marginTop: 10 }}
            disabled={submitIsDisabled}
          />
          {showConfirmation ? (
            <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
              <SubHeader
                style={{ margin: 5, color: COLORS.secondaryLight, textAlign: 'center' }}
              >
                Reponse submitted!
              </SubHeader>
              <BodyBold style={{ marginTop: 20, textAlign: 'center' }}>
                Your feedback is greatly appreciated.
              </BodyBold>
              {userDidSubmitContact ? (
                <BodyBold style={{ margin: 5, textAlign: 'center', lineHeight: 24 }}>
                  We will be in touch if more info is needed.
                </BodyBold>
              ) : null}
            </View>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    </BackgroundWrapper>
  );
};

export default SendMessage;
