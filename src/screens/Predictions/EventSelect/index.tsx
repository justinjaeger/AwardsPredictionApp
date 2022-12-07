import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import { Animated, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { AwardsBody } from '../../../API';
import { Body, SubHeader } from '../../../components/Text';
import {
  AWARDS_BODY_TO_IMAGE,
  AWARDS_BODY_TO_PLURAL_STRING,
  AWARDS_BODY_TO_STRING,
} from '../../../constants/awardsBodies';
import COLORS from '../../../constants/colors';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { useCategory } from '../../../context/CategoryContext';
import { iEvent } from '../../../types';
import theme from '../../../constants/theme';
import LoadingStatue from '../../../components/LoadingStatue';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import useQueryAllEvents from '../../../hooks/getAllEvents';
import AwardsBodyImage from '../../../components/AwardsBodyImage';

export const getEventName = (awardsBody: AwardsBody) => {
  return AWARDS_BODY_TO_PLURAL_STRING[AwardsBody[awardsBody]];
};

const EventSelect = () => {
  const { width } = useWindowDimensions();
  const { setEvent } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const bodyOpacity = useRef(new Animated.Value(0)).current;

  const { data: events, isLoading } = useQueryAllEvents();

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(loadingOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(bodyOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 500);
    }
  }, [isLoading]);

  const onSelectEvent = async (event: iEvent) => {
    setEvent(event);
    navigation.navigate('EventPredictions');
  };

  const eventList = Object.values(events || {});
  const orderedEvents = sortByObjectOrder<AwardsBody, iEvent>(
    AWARDS_BODY_TO_STRING,
    Object.values(eventList),
    eventList.map((e) => AwardsBody[e.awardsBody]),
  );
  const groupedByYear = _.groupBy(orderedEvents, (e) => e.year);

  return (
    <BackgroundWrapper>
      <>
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: loadingOpacity,
          }}
        >
          <LoadingStatue />
        </Animated.View>
        <Animated.ScrollView
          style={{ opacity: bodyOpacity }}
          contentContainerStyle={{
            alignSelf: 'flex-start',
            marginTop: theme.windowMargin,
            paddingBottom: 100,
            marginLeft: theme.windowMargin,
          }}
        >
          {Object.entries(groupedByYear).map(([key, val]) => (
            <>
              <SubHeader style={{ marginBottom: theme.windowMargin }}>{key}</SubHeader>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                {[...val, ...val, ...val, ...val].map((event) => {
                  const { awardsBody } = event;
                  return (
                    <TouchableHighlight
                      style={{
                        height: 80,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: theme.borderRadius,
                        borderWidth: 1,
                        borderColor: COLORS.white,
                        marginBottom: theme.windowMargin,
                        marginRight: theme.windowMargin,
                        width: width - theme.windowMargin * 2,
                        padding: 5,
                        justifyContent: 'center',
                      }}
                      underlayColor={COLORS.secondaryMiddle}
                      onPress={() => onSelectEvent(event)}
                    >
                      <>
                        <View style={{ flexDirection: 'row' }}>
                          <AwardsBodyImage
                            source={AWARDS_BODY_TO_IMAGE[AwardsBody[awardsBody]]}
                          />
                          <View>
                            <SubHeader>
                              {AWARDS_BODY_TO_PLURAL_STRING[AwardsBody[awardsBody]]}
                            </SubHeader>
                          </View>
                          <Body
                            style={{
                              alignSelf: 'flex-end',
                              justifyContent: 'flex-end',
                              color: COLORS.white,
                            }}
                          >{`Date: ${'TBD'}`}</Body>
                        </View>
                      </>
                    </TouchableHighlight>
                  );
                })}
              </View>
            </>
          ))}
        </Animated.ScrollView>
      </>
    </BackgroundWrapper>
  );
};

export default EventSelect;
