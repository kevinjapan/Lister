import React, {useState,useEffect} from "react";
import StaticListerListContainer from "./StaticListerListContainer"
import notify from "../uiNotifier/uiNotifier"


const StaticLister = props => {

   const [list_meta,setListMeta] = useState({})
   const [page,setPage] = useState(props.page !== undefined ? props.page : 1)
   const [dir,setDir] = useState('asc')
   const [reset,setReset] = useState(0)
   const [is_create_new,setIsCreateNew] = useState(false)
   const [outcome_msg,setOutcomeMsg] = useState('')


   /*
   * currently, we fetch list-meta and list json files on each return from viewing a lesson
   * since they are separate pages and their components are re-mounted
   * future - lift this/common parent/no separate page to prevent repeat fetches
   */

   useEffect(() => {

      let myRequest = new Request(`/lessons/Lessons-List-Meta.json`)

      fetch(myRequest)
         .then(response => {
            return response.json();
         })
         .then(jsonDataSet => {
            if(jsonDataSet.list_meta) {
               setListMeta(jsonDataSet.list_meta)
            }
            else {
               setOutcomeMsg(notify('no_dataset_returned'))
               setListMeta({})
            }
         })
         .catch(error => {
               setOutcomeMsg(notify('no_server_connect'))
               setListMeta({})
         })
   },[])

   const handleSelectedItem = item_id => {
      if(props.onSelectedItem) {
      props.onSelectedItem(item_id)
      }
   }

   const openPage = page_num => {
      props.onChangePage(page_num)
      setPage(page_num)
      setReset(reset + 1)
   }

   const resetPages = () => {
      setPage("1")
      dir === "asc" ? setDir("desc") : setDir("asc")  // to do : used?
   }

   const refresh = () => {
      // reset paginator
      setReset(reset + 1)
   }

   const toggleCreateNew = () => {
      is_create_new ? setIsCreateNew(false) : setIsCreateNew(true)
   }

   return (
      outcome_msg !== "" 
      ?  <div className="bg-light">
            {outcome_msg}
         </div>
      :  <div className="row">
            <StaticListerListContainer
               api={props.api}
               list_meta={list_meta}
               config={props.config}
               page={page} 
               view={props.view}
               reset={reset}
               onChangeView={props.onChangeView}
               onChangedOrder={resetPages}  
               onCreateNew={toggleCreateNew}  
               onDeletedItem={refresh}
               onSelectedItem={handleSelectedItem}
               onOpenListItem={props.onOpenListItem}
               onSelectPage={openPage}
            />
         </div>
   )

}

export default StaticLister
