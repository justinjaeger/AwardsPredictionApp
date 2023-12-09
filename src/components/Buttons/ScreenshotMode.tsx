import React from 'react';
import {
  StatusBar,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import BasicModal from '../BasicModal';
import { iPrediction } from '../../types/api';
import MovieGrid from '../MovieGrid';
import { BodyBold, SmallHeader, SubHeader } from '../Text';
import { useEvent } from '../../context/EventContext';
import { eventToString } from '../../util/stringConversions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '../../constants/theme';
import useProfileUser from '../../screens/Profile/useProfileUser';
import useDevice from '../../util/device';
import FloatingButton from './FloatingButton';

const ScreenshotMode = ({
  predictions,
  userId,
  date,
}: {
  predictions: iPrediction[];
  userId?: string;
  date?: Date;
}) => {
  const { isAndroid } = useDevice();
  const { width, height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  const { user } = useProfileUser(userId);

  const { event: _event, category: _category } = useEvent();
  const event = _event!;
  const category = _category!;
  const categoryData = event.categories[category];

  const [visible, setVisible] = React.useState(false);

  const marginSize = theme.windowMargin - theme.posterMargin;

  const d = date ?? new Date();
  // format: June 7, 2021
  const dateString = d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

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
                paddingTop: Math.max(top, StatusBar.currentHeight + (isAndroid ? 10 : 0)),
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
                  <SmallHeader>{'Best ' + categoryData.name}</SmallHeader>
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
                    {user ? '@' + user.username ?? '' : 'Award Expert Community'}
                  </BodyBold>
                </View>
              </View>
              <MovieGrid
                predictions={predictions.slice(0, 20)}
                categoryInfo={categoryData}
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
