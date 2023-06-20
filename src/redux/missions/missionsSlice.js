import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  missions: [],
  selectedMission: null,
  loading: false,
  error: null,
};

export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
    try {
      const response = await axios.get('https://api.spacexdata.com/v4/missions');
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    setSelectedMission: (state, action) => {
      state.selectedMission = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMissions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMissions.fulfilled, (state, action) => {
      state.loading = false;
      const missions = action.payload;

      const missionItems = missions.map((mission) => ({
        id: mission.id,
        name: mission.name,
        description: mission.description,
        image: mission.flickr_images[0],
      }));
      state.missions = missionItems;
    });
    builder.addCase(fetchMissions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const getAllMissions = (state) => state.missions.missions;
export const getSelectedMission = (state) => state.missions.selectedMission;
export const getLoading = (state) => state.missions.loading;
export const getError = (state) => state.missions.error;

export const { setSelectedMission } = missionsSlice.actions;
export default missionsSlice.reducer;
