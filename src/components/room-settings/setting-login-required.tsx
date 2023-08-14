import styles from './room-settings.module.css'
import { SettingComponentProps } from '@/utils/types'

const SettingLoginRequired = ({ setting, updateRoomSettings }: SettingComponentProps) => {
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
      </section>
   )
}

export default SettingLoginRequired
