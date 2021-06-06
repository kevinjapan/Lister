/*
* custom side-wide notifications
*/
const notify = notify_of => {

   const notifications = {
      'no_server_connect': 
         'Sorry, there was a problem connecting to the server. Please try again later.',
      'no_dataset_returned': 
         'Sorry, there was a problem getting the dataset. Please try again later.',
      'no_session':
         'Sorry, you either don\'t have authorization to perform this action or are not logged in.',
      'successful_action':
         'The action was succesful.',
      'no_record':
         'The record you requested does not exist.'
  }
  return notifications[notify_of]
}

export default notify
