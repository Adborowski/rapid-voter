import styles from './room-settings.module.css'

const RoomSettings = () => {
   interface RoomSetting {
      name: string
      description: string
      inputType: string
      extraInputType?: string
   }
   const availableSettings: RoomSetting[] = [
      {
         name: 'Login required',
         description:
            'Voters will have to use a social login (Google, Apple, or Facebook) in order to access the room.',
         inputType: 'checkbox',
      },
      {
         name: 'Time limit',
         description: 'Room only be open to voting before the passing of a date you set.',
         inputType: 'checkbox',
         extraInputType: 'date',
      },
   ]
   return (
      <div className={styles.roomSettings}>
         {availableSettings.map((setting) => {
            return (
               <section className={styles.settingWrapper}>
                  <header>
                     <span>{setting.name}</span>
                     <input type={setting.inputType} />
                  </header>
                  <article>{setting.description}</article>
               </section>
            )
         })}
      </div>
   )
}

export default RoomSettings
