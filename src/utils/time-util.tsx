export const hasTimeLimitElapsed = (timeLimit: string) => {
   const timestampToday = new Date().getTime()
   const timestampLimit = new Date(timeLimit).getTime()

   if (timestampLimit <= timestampToday) {
      return true
   } else {
      return false
   }
}
