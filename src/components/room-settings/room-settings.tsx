import { useState } from 'react'
import styles from './room-settings.module.css'
import SettingLoginRequired from './setting-login-required'
import { RoomSetting } from '@/utils/types'
import SettingTimeLimit from './setting-time-limit'

interface RoomSettingsComponentProps {
   updateRoomSettings: Function
}

const RoomSettings = ({ updateRoomSettings }: RoomSettingsComponentProps) => {
   const [isOpen, setIsOpen] = useState(false)

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
            'Room will become closed on the set date. The closing date will be visible to the users.',
         inputType: 'checkbox',
         extraInputType: 'datetime-local',
      },
   ]
   return (
      <div className={styles.roomSettings}>
         <button
            onClick={() => {
               setIsOpen(!isOpen)
            }}
            className={styles.btnShowRoomSettings}
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
