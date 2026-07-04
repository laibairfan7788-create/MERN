import { useState, useEffect } from 'react'
import api from '../api/axiosConfig'

export const useAxios = (config, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { immediate = true, ...axiosOptions } = options

  const fetchData = async (overrideConfig) => {
    try {
      setLoading(true)
      const finalConfig = overrideConfig || config
      const response = await api.request(finalConfig)
      setData(response.data)
      setError(null)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [JSON.stringify(config)])

  return { data, loading, error, refetch: fetchData }
}

export default useAxios