import React, {useState,useEffect} from "react";
import ListerListContainer from "./ListerListContainer"
import ListerCreate from "./ListerCreate"
import Paginator from "../Paginator/Paginator";
import reqInit from "../requestInit/RequestInit"
import notify from "../uiNotifier/uiNotifier"
import {authenticator} from '../authenticator/authenticator'



const Lister = props => {

   const [list_meta,setListMeta] = useState({})
   const [page,setPage] = useState(props.page !== undefined ? props.page : 1)
   const [rows_per_page] = useState(props.config['l_rows_per_page'])
   const [dir,setDir] = useState('asc')
   const [reset,setReset] = useState(0)
   const [is_create_new,setIsCreateNew] = useState(false)
   const [outcome_msg,setOutcomeMsg] = useState('loading..')
   const {api,config} = props

   useEffect(() => {

      const {api} = props
      const service = props.config['l_service']

      let myRequest = new Request(
         `${api}/lister/getListMeta.php?service=${service}`,
         reqInit()
      )

      fetch(myRequest)
         .then(response => {
            return response.json();
         })
         .then(jsonDataSet => {
            if(jsonDataSet.server_response.outcome === "success") {
               setOutcomeMsg("")
               setListMeta(jsonDataSet.server_response.list_meta)
            }
            else if(jsonDataSet.server_response.outcome === "no_session") {
               setOutcomeMsg(notify('no_session'))
            }
            else {
               setOutcomeMsg({outcome_msg: notify('no_dataset_returned')})
               setListMeta({})
            }
         })
         .catch(error => {
            setOutcomeMsg(notify('no_server_connect'))
            setListMeta({})
         })
   },[props])

   const openPage = page_num => {
      props.onChangePage(page_num)
      setPage(page_num)
      setReset(reset + 1)
   }
   
   const closeCreateItem = () => {
      setIsCreateNew(false)
   }

   const resetPages = col => {
      setPage(1)
      dir === "asc" ? setDir("desc") : setDir("asc")
      // reset paginator
      setReset(reset + 1)
   }

   const refresh = () => {
      setReset(reset + 1)
   }
   
   const toggleCreateNew = () => {
      is_create_new ? setIsCreateNew(false) : setIsCreateNew(true)
   }
   
   const createItem = new_item => {

      const {api} = props
      const service = props.config['l_service']

      let create_item = `{"service":"${service}","item":`;
      create_item += JSON.stringify(new_item);
      create_item += '}'
      let request_package = `{"client_request":{"token":"${authenticator.token}","create_item":${create_item}}}`
      let myRequest = new Request(
         `${api}/lister/createListerItem.php?service=${service}`,
         reqInit(request_package)
      )

      fetch(myRequest)
         .then(response => {
            return response.json();
         })
         .then(jsonDataSet => {
            refresh()
            setIsCreateNew(false)
            if(jsonDataSet.server_response.outcome === "success") {

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
            setListMeta({})
         })
   }

   return (

      outcome_msg !== ""
         ? <div className="bg-light m-3 p-2">{outcome_msg}</div>
         :  <div className="row">
               {props.config['l_paginate'] === false
                  ? null 
                  :  <Paginator
                        api={api}
                        page={page}
                        service={config['l_service']}
                        service_filter={config['l_service_filter']}
                        rows_per_page={rows_per_page}
                        onSelectPage={openPage}
                        reset={reset}
                     />
               }
               <ListerCreate 
                  api={api}
                  config={config}
                  is_open={is_create_new}
                  list_meta={list_meta}
                  onCreateItem={createItem}
                  onCloseItem={closeCreateItem}
               />
               <ListerListContainer
                  api={api}
                  config={config}
                  list_meta={list_meta}
                  page={page} 
                  view={props.view}
                  reset={reset}
                  onChangeView={props.onChangeView}
                  onSelectedItemId={props.onSelectedItemId}
                  onOpenListItem={props.onOpenListItem}
                  onItemControls={props.onItemControls}
                  onChangedOrder={resetPages}  
                  onCreateNew={toggleCreateNew}  
                  onDeletedItem={refresh}
               />
               {props.config['l_paginate'] === false
                  ? null 
                  :  <Paginator
                        api={api}
                        page={page}
                        service={config['l_service']}
                        service_filter={config['l_service_filter']}
                        rows_per_page={rows_per_page}
                        onSelectPage={openPage}
                        reset={reset}
                     />
               }
            </div>
   )
}

export default Lister
