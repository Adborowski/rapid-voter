export interface RoomSetting {
   name: string
   dataName: string
   description: string
   inputType: string
   extraInputType?: string // input that shows after the checkbox is checked (date only)
}

export interface SettingComponentProps {
   setting: RoomSetting
   updateRoomSettings: Function
}
