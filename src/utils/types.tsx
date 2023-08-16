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

export interface SettingUpdate {
   settingKey: string
   settingValue: boolean | Date
}

export interface AvailableRoomSettings {
   login_required: boolean
   time_limit: string
}
