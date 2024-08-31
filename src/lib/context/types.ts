export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string

  // roleId:string;
  password: string

  // rememberMe?: boolean
}



export type UserDataType = {

  email: string
  name: string

}


export type AuthValuesType = {
  loading: boolean
  actionLoading: boolean

  setActionLoading: (value: boolean) => void
  user: any | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  refetchUserData: () => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  logout: () => void
}

