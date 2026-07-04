export const handleApiError = (error) => {
  const message = error.response?.data?.message || error.message || 'Something went wrong'
  return message
}