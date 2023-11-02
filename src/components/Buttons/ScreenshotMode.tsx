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
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import ProfileImage from '../ProfileImage';
import useProfileUser from '../../screens/Profile/useProfileUser';
import { ScreenshotFab } from './DisplayFAB';

const ScreenshotMode = ({
  predictions,
  userId,
  date,
}: {
  predictions: iPrediction[];
  userId?: string;
  date?: Date;
}) => {
  const { width, height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  // TODO: do this everywhere
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
                // TODO: Check this on a device that actually has a notch
                paddingTop: top,
              }}
            >
              {/* <View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: theme.windowMargin - theme.posterMargin,
                  backgroundColor: COLORS.secondaryDark,
                  borderWidth: 1.5,
                  borderColor: COLORS.white,
                  zIndex: 10,
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 100,
                }}
              >
                <BodyBold style={{ color: COLORS.white }}>{'Award Expert'}</BodyBold>
              </View> */}
              <View
                style={{
                  alignItems: 'flex-start',
                  width: '100%',
                  paddingTop: 10,
                  paddingLeft: marginSize,
                  paddingBottom: 10,
                }}
              >
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <ProfileImage
                    imageSize={80}
                    image={user?.image}
                    style={{ marginRight: marginSize }}
                  />
                  <View
                    style={{
                      width: width - 80 - marginSize * 2 - 10,
                      justifyContent: 'flex-start',
                    }}
                  >
                    <SmallHeader>{categoryData.name}</SmallHeader>
                    <SubHeader style={{ marginTop: 5 }}>
                      {eventToString(event.awardsBody, event.year)}
                    </SubHeader>
                    {!userId ? (
                      <BodyBold style={{ marginTop: 10 }}>
                        {'Award Expert Community'}
                      </BodyBold>
                    ) : null}
                    <BodyBold style={{ marginTop: 5 }}>{dateString}</BodyBold>
                  </View>
                </View>
                {/* <BodyBold style={{ paddingTop: 5, paddingLeft: 2 }}>
                  {'@' + user?.username ?? ''}
                </BodyBold> */}
              </View>
              <MovieGrid predictions={predictions} categoryInfo={categoryData} />
              <SubHeader style={{ marginLeft: marginSize }}>
                {'@' + user?.username ?? ''}
              </SubHeader>
              <BodyBold
                style={{
                  marginLeft: marginSize,
                  marginTop: 5,
                  color: COLORS.secondaryDark,
                }}
              >
                {'follow on Award Expert'}
              </BodyBold>
            </View>
          </TouchableWithoutFeedback>
        </BasicModal>
      ) : (
        <ScreenshotFab onPress={() => setVisible(true)} />
      )}
    </>
  );
};
export default ScreenshotMode;
