import React, {useState,useEffect} from "react";
import reqInit from "../requestInit/RequestInit"
import notify from "../uiNotifier/uiNotifier"
import Lesson from './Lesson'


const LessonContainer = props => {

   const [lesson,setLesson] = useState({})
   const [outcome_msg,setOutcomeMsg] = useState('')

   useEffect(() => {
      
      if(props.api === '') {

         let myRequest = new Request(`/lessons/${props.match.params.url}.json`)

         fetch(myRequest)
            .then(response => {
               return response.json();
            })
            .then(jsonDataSet => {
               if(jsonDataSet.lesson) {
                  setLesson(jsonDataSet.lesson)
               }
               else {
                  setOutcomeMsg(notify('no_dataset_returned'))
               }
            })
            .catch(error => {
               const lesson_msg = "Alternatively, the lesson you are looking for may no longer be available."
               setOutcomeMsg(`${notify('no_server_connect')} ${lesson_msg}`)
            })
      }
      else {

         const {api} = props
         let myRequest = new Request(`${api}/lessons/getLesson.php?url=${props.match.params.url}`,reqInit())

         fetch(myRequest)
            .then(response => {
               return response.json();
            })
            .then(jsonDataSet => {
               if(jsonDataSet.server_response.outcome === "success") {
                  setOutcomeMsg('')
                  setLesson(jsonDataSet.server_response.lesson)
               }
               else {
                  setOutcomeMsg(notify('no_dataset_returned'))
               }
            })
            .catch(error => {
               const lesson_msg = "Alternatively, the lesson you are looking for may no longer be available."
               setOutcomeMsg(`${notify('no_server_connect')} ${lesson_msg}`)
            })
      }
   },[props])

   return (
      outcome_msg === ''
         ?  <Lesson
               api={props.api}
               lesson={lesson}
            />
         :  <div className="ui_tools">
               <div className="m-5">{outcome_msg}</div>
            </div>
   )
}

export default LessonContainer
