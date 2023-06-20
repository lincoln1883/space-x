import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rockets: [],
  selectedRocket: null,
  loading: false,
  error: null,
};

export const fetchRockets = createAsyncThunk(
  'rockets/fetchRockets',
  async () => {
    try {
      const response = await axios.get('https://api.spacexdata.com/v4/rockets');
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    setSelectedRocket: (state, action) => {
      state.selectedRocket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRockets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRockets.fulfilled, (state, action) => {
      state.loading = false;
      const rockets = action.payload;

      const rocketItem = rockets.map((rocket) => ({
        id: rocket.id,
        name: rocket.name,
        description: rocket.description,
        image: rocket.flickr_images[0],
      }));
      state.rockets = rocketItem;
    });
    builder.addCase(fetchRockets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const getAllRockets = (state) => state.rockets.rockets;
export const getSelectedRocket = (state) => state.rockets.selectedRocket;
export const getLoading = (state) => state.rockets.loading;
export const getError = (state) => state.rockets.error;

export const { setSelectedRocket } = rocketsSlice.actions;
export default rocketsSlice.reducer;
