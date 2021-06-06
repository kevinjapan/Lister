
const truncate = (str,len) => {
   if(str !== null && str !== "" && str !== undefined && str.length > len) {
      return str.substring(0, len) + '..';
    }
    return str
}

export default truncate
