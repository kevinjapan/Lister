import React, {useState,useEffect,useCallback} from "react";
import ListerList from "./ListerList"
import ListerCards from "./ListerCards"
import reqInit from "../requestInit/RequestInit"
import notify from "../uiNotifier/uiNotifier"
import {authenticator} from '../authenticator/authenticator'


const ListerListContainer = props => {

   const [service] = useState(props.config['l_service'])
   const [list,setList] = useState([])
   const [reset] = useState(0)
   const [outcome_msg,setOutcomeMsg] = useState('')


   /* useCallback ensures getList is stable and doesn't envoke unnecessary re-rendering */
   const getList = useCallback(() => {

         let {api,page,dir} = props
         const l_service = props.config['l_service']
         const l_service_filter = props.config['l_service_filter']
         const rows_per_page = props.config['l_rows_per_page']
         const order_by = props.config['l_order_by']
   
         if(page === undefined) { page = 1}
   
         let myRequest = new Request(
            `${api}/lister/getList.php?service=${l_service}&filter=${l_service_filter}&page=${page}&num_rows=${rows_per_page}&order_by=${order_by}&dir=${dir}`,
            reqInit()
         )
   
         fetch(myRequest)
            .then(response => {
               return response.json()
            })
            .then(jsonDataSet => {
               if(jsonDataSet.server_response.outcome === "success") {
                  setOutcomeMsg("")
                  setList(jsonDataSet.server_response.list)
               }
               else {
                  setOutcomeMsg(notify('no_dataset_returned'))
                  setList([])
               }
               })
               .catch(error => {
                  setOutcomeMsg(notify('no_server_connect'))
                  setList([])
            })
      },
      [props],
   )
   
   useEffect(() => {
      getList()
   },[getList])

   const updateItem = item => {

      const {api} = props
      const {token} = authenticator
      let update_item = `{"service":"${service}","item":${JSON.stringify(item)}}`  
      let request_package = `{"client_request":{"token":"${token}","update_item":${update_item}}}`

      let myRequest = new Request(
         `${api}/lister/updateListerItem.php`,
         reqInit(request_package)
      )
      fetch(myRequest)
      .then(response => {
         return response.json();
      })
      .then(jsonDataSet => {
         if(jsonDataSet.server_response.outcome === "success") {
            setOutcomeMsg("")
            getList()
         }
         else if(jsonDataSet.server_response.outcome === "no_session") {
            setOutcomeMsg(notify('no_session'))
         }
         else  {
            setOutcomeMsg(notify('no_dataset_returned'))
            setList([])
         }
      })
      .catch(error => {
         setOutcomeMsg(notify('no_server_connect'))
         setList([])
      })
   }

   const delItem = item => {

      if(window.confirm("Are you sure you want to delete this item? This can't be reversed.")) {

         const {api} = props
         const {token} = authenticator
         let del_item = `{"service":"${service}","item_id":${item.id}}` 
         let request_package = `{"client_request":{"token":"${token}","del_item":${del_item}}}`
         let myRequest = new Request(
            `${api}/lister/delListerItem.php`,
            reqInit(request_package)
         )

         fetch(myRequest)
         .then(response => {
            return response.json();
         })
         .then(jsonDataSet => {
            if(jsonDataSet.server_response.outcome === "success") {
               setOutcomeMsg('')               
               getList()
               props.onDeletedItem()
            }
            else if(jsonDataSet.server_response.outcome === "no_session") {
               setOutcomeMsg(notify('no_session'))
            }
            else {
               setOutcomeMsg(notify('no_dataset_returned'))
            }
         })
         .catch(error => {
            setOutcomeMsg(notify('no_server_connect'))
         })
      }
   }

   const toggleSelector = () => (
      <div className="col-4 col-md-3 col-lg-1 row ms-auto">
         <div 
            className={`col-6  ms-auto inlineLink ${props.view === "list" ? "selected_control" : ""}`}
            onClick={() => props.onChangeView('list')}>list</div>
         <div 
            className={`col-6  ms-auto inlineLink ${props.view === "card" ? "selected_control" : ""}`}
            onClick={() => props.onChangeView('card')}>card</div>
      </div>
   )

   const {api,config,page} = props

   return (
      
        outcome_msg !== '' 
         ?  <div className="col-12">
               {outcome_msg}
            </div>
         :  <div className="col-12">

               <div className="row col-12">{toggleSelector()}</div>
            
               <div className="col-12">

                  {props.view === 'list'
                     ?  <ListerList
                           api={api}
                           config={config}
                           list_meta={props.list_meta}
                           list={list}
                           page={page}
                           reset={reset}
                           onSelectedItemId={props.onSelectedItemId}
                           onOpenListItem={props.onOpenListItem}
                           onItemControls={props.onItemControls}
                           onChangedOrder={props.onChangedOrder}  
                           onCreateNew={props.onCreateNew}  
                           onDeletedItem={delItem}
                           onUpdateItem={updateItem}
                        />
                     :  <ListerCards
                           api={api}
                           config={config}
                           list_meta={props.list_meta}
                           list={list}
                           page={page}
                           reset={reset}
                           onSelectedItemId={props.onSelectedItemId}
                           onOpenListItem={props.onOpenListItem}
                           onChangedOrder={props.onChangedOrder}  
                           onCreateNew={props.onCreateNew} 
                           onDeletedItem={delItem}
                        />
                  }
               </div>
            </div>
   )
}

export default ListerListContainer
