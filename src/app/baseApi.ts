import {AUTH_TOKEN} from "@/common/constants"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {handleError} from "@/common/utils/handleError.ts";

export const baseApi = createApi({
    reducerPath: "todolistsApi",
    tagTypes: ["Todolist", "Task"],
    // baseQuery: fetchBaseQuery({
    //   baseUrl: import.meta.env.VITE_BASE_URL,
    //   prepareHeaders: (headers) => {
    //     headers.set("API-KEY", import.meta.env.VITE_API_KEY)
    //     headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    //   },
    // }),
    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            prepareHeaders: headers => {
                headers.set('API-KEY', import.meta.env.VITE_API_KEY)
                headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
            },
        })(args, api, extraOptions)

        handleError(result, api)

        return result
    },
    endpoints: () => ({}),
})
