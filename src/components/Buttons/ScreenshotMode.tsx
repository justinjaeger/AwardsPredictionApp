import React from 'react';
import {
  StatusBar,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import BasicModal from '../BasicModal';
import { EventModel, WithId, iCategory, iPrediction } from '../../types/api';
import MovieGrid from '../MovieGrid';
import { BodyBold, SmallHeader, SubHeader } from '../Text';
import { eventToString } from '../../util/stringConversions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '../../constants/theme';
import useProfileUser from '../../screens/Profile/useProfileUser';
import useDevice from '../../util/device';
import FloatingButton from './FloatingButton';
import { useRouteParams } from '../../hooks/useRouteParams';
import { yyyymmddToDate } from '../../util/yyyymmddToDate';
import { toDateString } from '../../util/toDateString';

const ScreenshotMode = ({
  predictions,
  isCommunity,
  date,
}: {
  predictions: iPrediction[];
  isCommunity: boolean;
  date?: Date;
}) => {
  const { isAndroid } = useDevice();
  const { width, height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const { userInfo, yyyymmdd, phase } = useRouteParams();
  const { user } = useProfileUser(userInfo?.userId);

  const { event: _event, categoryData: _categoryData } = useRouteParams();
  const categoryData = _categoryData as iCategory;
  const event = _event as WithId<EventModel>;

  const [visible, setVisible] = React.useState(false);

  const marginSize = theme.windowMargin - theme.posterMargin;

  // format: June 7, 2021
  const d = yyyymmdd ? yyyymmddToDate(yyyymmdd) : date || new Date();
  const dateString = toDateString(d);

  return (
    <>
      <StatusBar hidden={visible} />
      {visible ? (
        <BasicModal
          visible={visible}
          onClose={() => setVisible(false)}
          height={height}
          width={width}
          innerContainerStyle={{ backgroundColor: '#1a1a1a', borderRadius: 0 }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setVisible(false);
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                height: '100%',
                width: '100%',
                paddingTop: top + (isAndroid ? 10 : 0),
              }}
            >
              <View
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  width: '100%',
                  paddingLeft: marginSize,
                  paddingRight: marginSize,
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'baseline',
                  }}
                >
                  <SmallHeader>{categoryData.name}</SmallHeader>
                  <BodyBold style={{ marginTop: 5, textAlign: 'right' }}>
                    {dateString}
                  </BodyBold>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'baseline',
                  }}
                >
                  <SubHeader>{eventToString(event.awardsBody, event.year)}</SubHeader>
                  <BodyBold style={{ marginTop: 5, textAlign: 'right' }}>
                    {isCommunity || !user
                      ? 'Award Expert Community'
                      : '@' + user.username ?? ''}
                  </BodyBold>
                </View>
              </View>
              <MovieGrid
                eventId={event._id}
                predictions={predictions.slice(0, 20)}
                categoryInfo={categoryData}
                showAccolades={!!yyyymmdd}
                phase={phase}
              />
            </View>
          </TouchableWithoutFeedback>
        </BasicModal>
      ) : (
        <FloatingButton onPress={() => setVisible(true)} icon={'grid'} />
      )}
    </>
  );
};
export default ScreenshotMode;
