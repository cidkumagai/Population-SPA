import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 都道府県一覧の取得
export const getPrefectureList = createAsyncThunk(
    'populations/getPrefectureList',
    async () => {
        return await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures',{
                            headers: {
                                'X-API-KEY': process.env.REACT_APP_APIKEY
                            }
                        })
                        .then((res) => res.json());
    }
)

// 都道府県別データの取得
export const getPrefectureData = createAsyncThunk(
    'populations/getPrefectureData',
    async ({id}) => {
        return await fetch(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${id}`,{
                            headers: {
                                'X-API-KEY': process.env.REACT_APP_APIKEY
                            }
                        })
                        .then((res) =>{
                            return res.json();
                        });
    }
)


const populationSlice = createSlice({
    name: 'populations',
    initialState: {
        result: [],
        nowPref: 0,
        period: [],
    },
    reducers: {
        updatePref: (state, action) => {
            if(action.payload.checked) {
                state.nowPref = action.payload.id;
                state.result[action.payload.id].isChecked = true;
            } else {
                state.result[action.payload.id].isChecked = false;
            }
        }
    },
    extraReducers: {
        [getPrefectureList.fulfilled]: (state, action) => {
            state.result = action.payload.result.map((item) => {
               return {prefCode:item.prefCode, prefName:item.prefName, isChecked:false, prefData:{data: false}}
            })
        },
        [getPrefectureData.fulfilled]: (state, action) => {
            state.period = action.payload.result.data[0].data.map((data) => {
                return data.year;
            })
            state.result[state.nowPref].prefData = action.payload.result.data[0].data.map((data) => {
                return data.value;
            });
        }
    },
});

export const { updatePref } = populationSlice.actions;
export default populationSlice.reducer;