import type {RequestStatus} from "@/common/types"
import {createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit"
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";
import {tasksApi} from "@/features/todolists/api/tasksApi.ts";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        themeMode: "light" as ThemeMode,
        status: "idle" as RequestStatus,
        error: null as string | null,
        isLoggedIn: false,
    },
    selectors: {
        selectThemeMode: (state) => state.themeMode,
        selectAppStatus: (state) => state.status,
        selectAppError: (state) => state.error,
        selectIsLoggedIn: (state) => state.isLoggedIn,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, // isPending, isFulfilled, isRejected - встроенныые ф-ции-предикаты
                //но если нужно написать другую проверку, то нужно писать ее (ф-цию-предикат) вручную как показано ниже
                // (action) => {
                //     // console.log("🟢 matcher", action.type)
                //     // return true
                //     return action.type.endsWith('/pending')
                // },
                (state, action) => {
                    // console.log("🔴 reducer", action.type)
                    // изменение стейта
                    if (
                        todolistsApi.endpoints.getTodolists.matchPending(action) ||
                        tasksApi.endpoints.getTasks.matchPending(action)
                    ) {
                        return
                    }
                    state.status = 'loading'
                })
            .addMatcher(isFulfilled,
                // (action) => {
                //     return action.type.endsWith('/fulfilled')
                // },
                (state) => {
                    state.status = 'succeeded'
                })
            .addMatcher(isRejected, (state) => {
                state.status = 'failed'
            })
    },
    reducers: (create) => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
            state.status = action.payload.status
        }),
        setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
            state.error = action.payload.error
        }),
        setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }),
    }),
})

export const {selectThemeMode, selectAppStatus, selectAppError, selectIsLoggedIn} = appSlice.selectors
export const {changeThemeModeAC, setAppStatusAC, setAppErrorAC, setIsLoggedInAC} = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
