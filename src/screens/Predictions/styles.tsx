// @ts-ignore - has package and is just wrong
import styled from 'styled-components/native';
import theme from '../../constants/theme';

export const CategoryHeader = styled.View({
  zIndex: 200,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: theme.windowMargin,
  backgroundColor: 'transparent',
  width: '100%',
});
