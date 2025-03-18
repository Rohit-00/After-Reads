export const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  
export const changeHttpToHttps = (obj: any): any => {
    
  // Base case for recursion: if the value is a string and contains 'http'
  if (typeof obj === 'string' && obj.startsWith('http://')) {
    return obj.replace('http://', 'https://');
  }}      