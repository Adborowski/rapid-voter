import { count } from 'console'
import styles from './room.module.css'
import Countdown from 'react-countdown'

interface DisplayTimeLimitProps {
   timeLimit: string
}

const DisplayTimeLimit = ({ timeLimit }: DisplayTimeLimitProps) => {
   if (!timeLimit) {
      return null
   }

   const countdownRenderer = ({ days, minutes, hours, seconds, completed }: any) => {
      if (!completed) {
         return (
            <span>
               <aside>Voting will close in</aside>
               {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
            </span>
         )
      } else {
         return <span>Voting has closed on {new Date(timeLimit).toDateString()}</span>
      }
   }

   return (
      <div className={styles.displayTimeLimit}>
         <Countdown date={new Date(timeLimit)} renderer={countdownRenderer} />
      </div>
   )
}

export default DisplayTimeLimit
