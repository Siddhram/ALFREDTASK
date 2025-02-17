import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstlevel:0,
        secondlevel:0,
  modecolour:0,
  thirdlevel: 0,
}

export const dataSlice = createSlice({
  name: 'dataReducer',
  initialState,
  reducers: {
    firstlevelcountincre: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.firstlevel += 1
    },modesetcolour:(state,action)=>{
      state.modecolour=action.payload.modecolour
    },
    apidataset:(state,action)=>{

        state.firstlevel=action.payload.firstlevel
                state.secondlevel=action.payload.secondlevel
        state.thirdlevel=action.payload.thirdlevel
        console.log("add",action.payload);
        

    }
    ,
    secondlevelcountincre: (state) => {
      state.secondlevel += 1
    },
    thirdlevelcountincre: (state) => {
      state.thirdlevel += 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { modesetcolour,firstlevelcountincre, secondlevelcountincre, thirdlevelcountincre,apidataset } = dataSlice.actions

export default dataSlice.reducer