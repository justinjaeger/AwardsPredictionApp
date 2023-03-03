import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { SubmitButton } from '../../../components/Buttons';
import FormInput from '../../../components/Inputs/FormInput';
import { Body, BodyBold, SubHeader } from '../../../components/Text';
import COLORS from '../../../constants/colors';
import SlackApi, { SlackChannel } from '../../../services/slack';
import Tmdb from '../../../assets/tmdb.svg';
import { useAuth } from '../../../context/UserContext';
import { useNavigateAwayEffect } from '../../../util/hooks';

type iTypeButtonProps = { text: string; selected: boolean; onPress: () => void };

const TypeButton = ({ text, selected, onPress }: iTypeButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: selected ? COLORS.secondaryDark : COLORS.primaryLightest,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        margin: 10,
      }}
      activeOpacity={0.8}
    >
      <BodyBold
        style={{
          color: selected ? COLORS.white : 'black',
          textAlign: 'center',
        }}
      >
        {text}
      </BodyBold>
    </TouchableOpacity>
  );
};

const SendMessage = () => {
  const { userEmail } = useAuth();

  const [type, setType] = useState<SlackChannel>(SlackChannel.SUPPORT);
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

  const data: iTypeButtonProps[] = [
    {
      text: 'Contact Support',
      selected: type === SlackChannel.SUPPORT,
      onPress: () => setType(SlackChannel.SUPPORT),
    },
    {
      text: 'Report Bug',
      selected: type === SlackChannel.BUGS,
      onPress: () => setType(SlackChannel.BUGS),
    },
    {
      text: 'Question',
      selected: type === SlackChannel.QUESTIONS,
      onPress: () => setType(SlackChannel.QUESTIONS),
    },
    {
      text: 'Suggestion',
      selected: type === SlackChannel.SUGGESTIONS,
      onPress: () => setType(SlackChannel.SUGGESTIONS),
    },
    {
      text: 'Other',
      selected: type === SlackChannel.OTHER,
      onPress: () => setType(SlackChannel.OTHER),
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
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ width: '90%', alignSelf: 'center' }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          {data.map((item) => (
            <TypeButton key={item.text} {...item} />
          ))}
        </View>
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
          style={{ marginTop: 20 }}
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40 }}>
          <Body style={{ color: 'rgba(255,255,255,0.6)' }}>
            Movie data and images powered by
          </Body>
          <Tmdb style={{ width: 80, height: 40, marginLeft: 10 }} />
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default SendMessage;
