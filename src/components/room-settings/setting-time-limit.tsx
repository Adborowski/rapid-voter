import styles from './room-settings.module.css'
import { RoomSetting, SettingComponentProps } from '@/utils/types'

const SettingTimeLimit = ({ setting, updateRoomSettings }: SettingComponentProps) => {
   return (
      <section key={setting.name} className={styles.settingWrapper}>
         <header>
            <span>{setting.name}</span>
            <input
               type={setting.inputType}
               onChange={(event) => {
                  if (!setting.extraInputType) {
                     updateRoomSettings({
                        settingKey: setting.dataName,
                        settingValue: event.target.checked,
                     })
                  }
               }}
            />
         </header>
         <article>{setting.description}</article>
         {setting.extraInputType && (
            <input
               onChange={(event) => {
                  updateRoomSettings({
                     settingKey: setting.dataName,
                     settingValue: new Date(event.target.value),
                  })
               }}
               type={setting.extraInputType}
            />
         )}
      </section>
   )
}

export default SettingTimeLimit
