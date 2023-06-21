import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://api.spacexdata.com/v3/missions';

export const fetchMissions = createAsyncThunk('missions/getMissions', async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return err;
  }
});

const initialState = {
  missions: [],
  loading: 'idle',
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    joinMission: (state, action) => {
      const { missionId } = action.payload;
      state.missions = state.missions.map((mission) => (mission.mission_id === missionId ? { ...mission, reserved: true } : mission));
    },
    leaveMission: (state, action) => {
      const { missionId } = action.payload;
      state.missions = state.missions.map((mission) => (mission.mission_id === missionId ? { ...mission, reserved: false } : mission));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMissions.fulfilled, (state, action) => {
      const missions = action.payload.map((mission) => ({
        mission_id: mission.mission_id,
        mission_name: mission.mission_name,
        description: mission.description,
        reserved: false,
      }));
      state.missions = missions;
      state.loading = 'fulfilled';
    });
  },
});

export const { joinMission, leaveMission } = missionsSlice.actions;

export const selectMissions = (state) => state.missions.missions;

export default missionsSlice.reducer;
