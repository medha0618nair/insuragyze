
export const convertToINR = (usdAmount: string, exchangeRate: number): string => {
  const amount = parseFloat(usdAmount.replace(/[$,]/g, ''));
  if (isNaN(amount)) return usdAmount;
  
  const inrAmount = amount * exchangeRate;
  return `₹${inrAmount.toLocaleString('en-IN')}`;
};
