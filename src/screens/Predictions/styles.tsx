// @ts-ignore - has package and is just wrong
import styled from 'styled-components/native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';

export const CategoryHeader = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: theme.windowMargin,
  backgroundColor: COLORS.primary,
});
