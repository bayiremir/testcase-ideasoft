import {useSelector} from 'react-redux';
import {userSliceInitialStateType} from '../../interface/user.interface';

export const useTheme = () => {
  const {theme} = useSelector(
    (state: {user: userSliceInitialStateType}) => state.user,
  );

  const isDark = theme === 'dark';

  return {
    cardTextColor: isDark ? 'white' : 'white',
    textColor: isDark ? 'white' : 'white',
    theme,
  };
};
