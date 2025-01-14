import {createSlice} from '@reduxjs/toolkit';
import {userSliceInitialStateType} from '../../interface/userslice.interface';
import {storage} from '../../utils/Storage';

const initialState: userSliceInitialStateType = {
  listview: storage.getNumber('listview') || 1,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setListView: (state, action) => {
      state.listview = action.payload;
    },
  },
});

export const {setListView} = userSlice.actions;
export default userSlice.reducer;
