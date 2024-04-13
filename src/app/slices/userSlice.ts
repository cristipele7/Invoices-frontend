import { createAppSlice } from "../createAppSlice"
import type { AuthModel, ErrorModel, UserModel } from "../../models"
import { login } from "../../service"

export interface UserSlice {
  user: UserModel | null
  errorMessage: string | null
}

const storagedUser = localStorage.getItem('user')
const initialState: UserSlice = {
  user: storagedUser ? JSON.parse(storagedUser) : null,
  errorMessage: null
}

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({
    fetchUser: create.asyncThunk(
      async (data: AuthModel) => {
        try {
          const response = await login(data)
          return response.data
        } catch (err) {
          const error = err as ErrorModel
          return {
            isError: true,
            errorMessage: error.response.data.message
          }
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload.isError) {
            state.user = null
            state.errorMessage = action.payload.errorMessage
          } else {
            state.user = action.payload
            state.errorMessage = null
            localStorage.setItem('user', JSON.stringify(action.payload))
          }
        },
      },
    ),
    logoutUser: create.reducer(state => {
      state.user = null
      state.errorMessage = null
      localStorage.removeItem('user')
    }),
  }),
  selectors: {
    selectUser: user => user.user,
    selectErrorMessage: user => user.errorMessage,
  },
})

export const { fetchUser, logoutUser } = userSlice.actions

export const { selectUser, selectErrorMessage } = userSlice.selectors
