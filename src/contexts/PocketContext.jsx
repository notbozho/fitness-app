/* eslint-disable no-undef */
import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo
} from 'react'
import PocketBase from 'pocketbase'
import { useInterval } from 'usehooks-ts'
import jwtDecode from 'jwt-decode'
import ms from 'ms'

import DEFAULT_AVATAR_MAN from '../assets/default_avatar_man.jpg'
import DEFAULT_AVATAR_WOMAN from '../assets/default_avatar_woman.jpg'

const BASE_URL = 'http://127.0.0.1:8090'
const fiveMinutesInMs = ms('5 minutes')
const twoMinutesInMs = ms('2 minutes')

const PocketContext = createContext({})

// eslint-disable-next-line react/prop-types
export const PocketProvider = ({ children }) => {
  const pb = useMemo(() => new PocketBase(BASE_URL), [])

  const [token, setToken] = useState(pb.authStore.token)
  const [user, setUser] = useState(pb.authStore.model)

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token)
      setUser(model)
    })
  }, [])

  const register = useCallback(async (email, password) => {
    return await pb
      .collection('users')
      .create({ email, password, passwordConfirm: password })
  }, [])

  const login = useCallback(async (email, password) => {
    return await pb.collection('users').authWithPassword(email, password)
  }, [])

  const logout = useCallback(() => {
    pb.authStore.clear()
    setToken(null)
    setUser(null)
  }, [])

  const refreshSession = useCallback(async () => {
    if (!pb.authStore.isValid) return
    const decoded = jwtDecode(token)
    const tokenExpiration = decoded.exp
    const expirationWithBuffer = (decoded.exp + fiveMinutesInMs) / 1000
    if (tokenExpiration < expirationWithBuffer) {
      await pb.collection('users').authRefresh()
    }
  }, [token])

  const getAvatar = useCallback(async () => {
    if (!user?.avatar)
      return user.gender == 'male' ? DEFAULT_AVATAR_MAN : DEFAULT_AVATAR_WOMAN
    return await pb.files.getUrl(user, user.avatar, { thumb: '300x300' })
  }, [])

  const getImage = useCallback(async (image) => {
    return await pb.files.getUrl(user, image, { thumb: '300x300' })
  }, [])

  const getAllExercises = useCallback(async () => {
    return await pb.collection('exercises').getFullList()
  }, [])

  useInterval(refreshSession, token ? twoMinutesInMs : null)

  return (
    <PocketContext.Provider
      value={{
        register,
        login,
        logout,
        getAvatar,
        getAllExercises,
        user,
        token,
        pb
      }}
    >
      {children}
    </PocketContext.Provider>
  )
}

export const usePocket = () => useContext(PocketContext)
