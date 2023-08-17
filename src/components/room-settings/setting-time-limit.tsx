import styles from './room-settings.module.css'
import { useState, useEffect } from 'react'
import { SettingComponentProps } from '@/utils/types'

const SettingTimeLimit = ({ setting, updateRoomSettings }: SettingComponentProps) => {
   const [isActivated, setIsActivated] = useState(false)
   const [selectedDate, setSelectedDate] = useState<Date | boolean>(false)

   useEffect(() => {
      if (!isActivated) {
         updateRoomSettings({ settingKey: 'time_limit', settingValue: null })
      } else {
         updateRoomSettings({ settingKey: 'time_limit', settingValue: selectedDate })
      }
   }, [isActivated, selectedDate])

   // yyyy-MM-ddThh:mm
   const getDefaultDateString = () => {
      const date = new Date() // today
      date.setDate(date.getDate() + 30) // set to 30 days later
      const year = date.getFullYear()
      const month = '0' + (date.getMonth() + 1)
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const defaultDateString = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes
      console.log('defaultDateString', defaultDateString)
      return defaultDateString
   }

   return (
      <section key={setting.name} className={styles.settingWrapper}>
         <header>
            <span>{setting.name}</span>
            <input
               type={setting.inputType}
               onChange={(event) => {
                  if (event.target.checked) {
                     setIsActivated(true)
                     setSelectedDate(new Date(getDefaultDateString()))
                  } else {
                     setIsActivated(false)
                     setSelectedDate(false)
                  }
               }}
            />
         </header>
         <article>{setting.description}</article>
         {setting.extraInputType && isActivated && (
            <input
               className={styles.settingDateInput}
               defaultValue={getDefaultDateString()}
               onChange={(event) => {
                  setSelectedDate(new Date(event.target.value))
               }}
               type={setting.extraInputType}
            />
         )}
      </section>
   )
}

export default SettingTimeLimit
