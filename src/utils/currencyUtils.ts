
// Convert a value from USD to INR based on exchange rate
export const convertToINR = (amount: number, exchangeRate: number = 83): number => {
  return amount * exchangeRate;
};
