
const transform2UIDate = db_date => {

  const months = {
    0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',
    6:'Jul',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'
  }
  const ui_updated = new Date(db_date)
  return `${ui_updated.getDate()} ${months[ui_updated.getMonth()]} ${ui_updated.getFullYear()}`
}

export default transform2UIDate
