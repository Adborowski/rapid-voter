import { useState } from 'react'
import styles from './room-settings.module.css'
import SettingLoginRequired from './setting-login-required'
import { RoomSetting } from '@/utils/types'
import SettingTimeLimit from './setting-time-limit'

const RoomSettings = () => {
   const [isOpen, setIsOpen] = useState(false)
   const [roomSettings, setRoomSettings] = useState({
      login_required: false,
      time_limit: false,
   })

   interface SettingUpdate {
      settingKey: string
      settingValue: boolean | Date
   }

   const updateRoomSettings = (settingUpdate: SettingUpdate) => {
      setRoomSettings((prevState) => {
         console.log({ ...prevState, [settingUpdate.settingKey]: settingUpdate.settingValue })
         return { ...prevState, [settingUpdate.settingKey]: settingUpdate.settingValue }
      })
   }

   const availableSettings: RoomSetting[] = [
      {
         name: 'Login required',
         dataName: 'login_required',
         description:
            'Voters will have to use a social login (Google, Apple, or Facebook) in order to access the room.',
         inputType: 'checkbox',
      },
      {
         name: 'Time limit',
         dataName: 'time_limit',
         description:
            'Room will only be open to voting before the passing of a date you set. After the date passes, voting will not be possible',
         inputType: 'checkbox',
         extraInputType: 'date',
      },
   ]
   return (
      <div className={styles.roomSettings}>
         <button
            onClick={() => {
               setIsOpen(!isOpen)
            }}
            className={styles.btnRoomSettings}
         >
            {isOpen ? 'Hide room settings' : 'Show room settings'}
         </button>
         <div className={`${styles.availableSettings} ${isOpen ? styles.open : styles.closed}`}>
            <SettingLoginRequired
               setting={availableSettings[0]}
               updateRoomSettings={updateRoomSettings}
            />

            <SettingTimeLimit
               setting={availableSettings[1]}
               updateRoomSettings={updateRoomSettings}
            />
         </div>
      </div>
   )
}

export default RoomSettings
