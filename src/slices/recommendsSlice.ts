import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
    PayloadAction
} from '@reduxjs/toolkit'
import { Recommend } from '../models/recommend'
import { fetchWithAuth, fetchStatus } from '../utils/fetch'
import { StoreState } from '../store'

const recommendAdapter = createEntityAdapter<Recommend>({
    selectId: recommend => recommend.id
})

export const fetchRecommends = createAsyncThunk(
    'recommends/fetchRecommends',
    async () => {
        const { results } = await fetchWithAuth({
            method: 'get',
            path: '/recommends'
        }).then(response => response.json())

        return results as Recommend[]
    }
)

export const deleteRecommendById = createAsyncThunk(
    'recommends/deleteRecommend',
    async (id: number) => {
        const { results } = await fetchWithAuth({
            method: 'delete',
            path: `/recommends/${id}`
        }).then(response => response.json())

        return results as Recommend
    }
)

export const recommendsSlice = createSlice({
    name: 'recommends',
    initialState: recommendAdapter.getInitialState({
        fetchStatus: fetchStatus.IDLE,
        deleteStatus: fetchStatus.IDLE
    }),
    reducers: {
        recommendRemoved(state, action: PayloadAction<number>) {
            recommendAdapter.removeOne(state, action.payload)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchRecommends.fulfilled, (state, { payload }) => {
                recommendAdapter.setAll(state, payload)
                state.fetchStatus = fetchStatus.SUCCESS
            })
            .addCase(fetchRecommends.pending, state => {
                state.fetchStatus = fetchStatus.LOADING
            })
            .addCase(fetchRecommends.rejected, state => {
                state.fetchStatus = fetchStatus.FAILURE
            })

        builder
            .addCase(deleteRecommendById.fulfilled, (state, { payload }) => {
                const { id } = payload
                recommendAdapter.removeOne(state, id)
                state.deleteStatus = fetchStatus.SUCCESS
            })
            .addCase(deleteRecommendById.pending, state => {
                state.deleteStatus = fetchStatus.LOADING
            })
            .addCase(deleteRecommendById.rejected, state => {
                state.deleteStatus = fetchStatus.FAILURE
            })
    }
})

export const {
    selectIds: selectRecommendIds,
    selectById: selectRecommendById,
    selectAll: selectAllRecommends
} = recommendAdapter.getSelectors<StoreState>(state => state.recommends)

export const selectFetchSelectStatus = (state: StoreState): fetchStatus =>
    state.recommends.fetchStatus
