export const formatDate = (date) => new Date(date).toLocaleDateString()
export const formatCurrency = (amount) => `$${amount.toFixed(2)}`