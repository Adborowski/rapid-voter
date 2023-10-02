// @ts-ignore
import QRCode from 'react-qr-code'
import styles from './room-sharing.module.css'

const RoomSharing = (props: any) => {
   return (
      <div className={styles.roomSharing}>
         <QRCode value={location.href} />
      </div>
   )
}

export default RoomSharing
