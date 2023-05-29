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

const BASE_URL = 'http://127.0.0.1:8090'
const API_URL = BASE_URL + '/api'
const fiveMinutesInMs = ms('5 minutes')
const twoMinutesInMs = ms('2 minutes')

const PocketContext = createContext({})

// eslint-disable-next-line react/prop-types
export const PocketProvider = ({ children }) => {
  const pb = useMemo(() => new PocketBase(BASE_URL), [])

  const [token, setToken] = useState(pb.authStore.token)
  const [user, setUser] = useState(pb.authStore.model)
  const [exercises, setExercises] = useState([])
  const [workouts, setWorkouts] = useState([])
  const [completedWorkouts, setCompletedWorkouts] = useState([])

  const loadCompletedWorkouts = async () => {
    const workouts = await pb
      .collection('completedWorkouts')
      .getFullList({ filter: `user = "${user.id}"` })

    setCompletedWorkouts(workouts)
  }

  const updateUser = async (data) => {
    await pb.collection('users').update(user.id, data)
    await reloadUserData()
  }

  const finishTodayWorkout = async (workout) => {
    if (!user) return

    const data = {
      user: user.id,
      workout: workout,
      date: new Date()
    }

    await pb.collection('completedWorkouts').create(data)
    await loadCompletedWorkouts()
  }

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token)
      setUser(model)
      loadCompletedWorkouts()
    })
  }, [])

  const reloadUserData = useCallback(async () => {
    const u = await pb.collection('users').getOne(user.id)
    setUser(u)
  }, [user])

  const register = useCallback(async (email, password, username) => {
    return await pb
      .collection('users')
      .create({ username, email, password, passwordConfirm: password })
  }, [])

  const login = useCallback(async (email, password) => {
    return await pb.collection('users').authWithPassword(email, password)
  }, [])

  const logout = useCallback(() => {
    pb.authStore.clear()
    setToken(null)
    setUser(null)
    setCompletedWorkouts([])
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

  const getImageUrl = useCallback(async (entity, image, thumb) => {
    return await pb.files.getUrl(entity, image, { thumb: thumb || '300x300' })
  }, [])

  const loadAllExercises = useCallback(async () => {
    const exs = await pb.collection('exercises').getFullList()
    setExercises(exs)
  }, [])

  const loadTemplate = useCallback(async (template) => {
    let exs = await pb
      .collection('workouts')
      .getFullList({ sort: 'orderWeight', filter: `template = "${template}"` })

    setWorkouts(exs)
  }, [])

  useInterval(refreshSession, token ? twoMinutesInMs : null)

  return (
    <PocketContext.Provider
      value={{
        register,
        login,
        logout,
        loadAllExercises,
        loadTemplate,
        getImageUrl,
        finishTodayWorkout,
        loadCompletedWorkouts,
        reloadUserData,
        updateUser,
        user,
        token,
        exercises,
        setExercises,
        workouts,
        setWorkouts,
        completedWorkouts,
        pb,
        API_URL
      }}
    >
      {children}
    </PocketContext.Provider>
  )
}

export const usePocket = () => useContext(PocketContext)
