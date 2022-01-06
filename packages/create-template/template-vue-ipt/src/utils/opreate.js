import storageFn from './storageFn'

let main_app_name = window._WIN_CARNATION_ ? '_CARNATION_' : '_JINDAL_'


const sysOperate = {
  get (key, storage) {
    let info = storageFn[storage || 'session'].get(key)
    if (info) {
      let infoObj = JSON.parse(info)
      return infoObj
    }
    return null
  },

  set (key, infoString, storage) {
    storageFn[storage || 'session'].set(key, infoString)
  }

}


export function getUserInfo () {
  return sysOperate.get('userInfo')
}

export function getCurrentPatient () {
  return sysOperate.get(`${main_app_name}CURRENTPATIENTINFO`)
}

export function getPatientList () {
  return sysOperate.get(`${main_app_name}CURRENTPATIENTLISTINFO`)
}

export function getOrgInfo () {
  return sysOperate.get(`${main_app_name}ORGINFO`)
}

export default sysOperate
