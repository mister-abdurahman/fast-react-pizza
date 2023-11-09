import { getAddress } from "../../services/apiGeocoding";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { storeType } from "../../store";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// first parameter is the action type name, second parameter is thunk fn
// this kind of action reducer produces 3 action types: pending promise, fulfilled, rejected and we need to account for all 3 cases
// whatever is returned from this fn becomes the payload of the fulfilled state

// fetchAaddress here is just like "updateName" action fn, just that we need to run an async fn so we need to use a thunk, you get the gist...?, yup.
export const fetchAddress:any = createAsyncThunk('user/fetchAddress', async function() {
  const positionObj: any = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
})

interface initialStateType {
  username: string,
  status: string,
  position: {longitude: number, latitude: number} | {},
  address: string,
  error?: string
}

const initialState:initialStateType = {
  username: "abu tolha",
  status: "idle",
  position: {},
  address: "",
  error: ""
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action){
      state.username = action.payload
    }
  }, 
  extraReducers: (builder) => builder.addCase(fetchAddress.pending, (state, action)=> {
    state.status = 'loading'
  }).addCase(fetchAddress.fulfilled, (state, action)=> {
    state.address = action.payload.address
    state.position = action.payload.position
    state.status = 'idle'
  }).addCase(fetchAddress.rejected, (state, action)=> {
    state.status = 'error'
    state.error = "There was a problem getting your address. Make sure to fill this field!"
  })
})

export const {updateName} = userSlice.actions; //so we can use the action in any component

export default userSlice.reducer;

export const getUserName = (state:storeType)=> state.user.username