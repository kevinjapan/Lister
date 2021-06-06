import React, {useState,useEffect} from "react";
import StaticListerList from "./StaticListerList"
import StaticListerCards from "./StaticListerCards"
import StaticPaginator from "../StaticPaginator/StaticPaginator"
import notify from "../uiNotifier/uiNotifier"


const StaticListerListContainer = props => {

   const [list,setList] = useState([])
   const [outcome_msg,setOutcomeMsg] = useState('')
   const [type] = useState(props.config['l_type'])
   const [sort_by,setSortBy] = useState('')
   const [sort_dir,setSortDir] = useState('asc')

   
   useEffect(() => {
   
      let myRequest = new Request(`/lessons/Lessons-List.json`)
   
      fetch(myRequest)
         .then(response => {
            return response.json();
         })
         .then(jsonDataSet => {
            if(jsonDataSet.lessons) {
               setList(jsonDataSet.lessons.filter(block => parseInt(block.type) === type))
            }
            else {
               setOutcomeMsg({outcome_msg: notify('no_dataset_returned')})
               setList([])
            }
         })
         .catch(error => {
               setOutcomeMsg({outcome_msg: notify('no_server_connect')})
               setList([]);
         })
   },[type])


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

   const setNewSortBy = col => {
      setSortDir('desc') // flipped by toggleDir
      setSortBy(col)
   }

   const toggleDir = () => {
      let test = sort_dir === 'asc' ? 'desc' : 'asc'
      setSortDir(test)
   }

   const orderList = col => {

      if(col !== sort_by) {setNewSortBy(col)}
      toggleDir()

      list.sort(function(a, b) {
         const val_a = a[col].toLowerCase()
         const val_b = b[col].toLowerCase()
         if (val_a < val_b) {
            return sort_dir === 'asc' ? -1 : 1
         }
         if (val_a > val_b) {
            return sort_dir === 'asc' ? 1 : -1
         }
         return 0
       })

      props.onChangedOrder()
   }

   const {api,config,page} = props
   const service_filter = props.config['l_service_filter']
   const rows_per_page = props.config['l_rows_per_page']

   return (
      <React.Fragment>

         {props.config['l_paginate'] === true
            ?  <StaticPaginator
                  api={props.api}
                  page={page}
                  service={props.service}
                  service_filter={service_filter}
                  total_rows={list.length}
                  rows_per_page={rows_per_page}
                  onSelectPage={props.onSelectPage}
               />
            : null }

         {outcome_msg === ''
            ?  <div className="mb-5">
               
                  <div className="row col-12">{toggleSelector()}</div>
                  
                  {props.view === 'list'
                     ?  <StaticListerList
                           api={api}
                           config={config}
                           list_meta={props.list_meta}
                           list={list}
                           page={page}
                           reset={props.reset}
                           onSelectedItemId={props.onSelectedItemId}
                           onOpenListItem={props.onOpenListItem}
                           onItemControls={props.onItemControls}
                           onChangedOrder={orderList}  
                           onCreateNew={props.onCreateNew}  
                           onDeletedItem={props.onDeletedItem}
                           onUpdateItem={props.onUpdateItem}
                        />
                     :  <StaticListerCards
                           api={api}
                           config={config}
                           list_meta={props.list_meta}
                           list={list}
                           page={page}
                           reset={props.reset}
                           onSelectedItemId={props.onSelectedItemId}
                           onOpenListItem={props.onOpenListItem}
                           onChangedOrder={props.onChangedOrder}  
                           onCreateNew={props.onCreateNew}  
                           onDeletedItem={props.refresh}
                        />
                  }
               </div>
            :  <div>{outcome_msg}</div>
         }        

         {props.config['l_paginate'] === true
            ?  <StaticPaginator
                  api={props.api}
                  page={page}
                  service={props.service}
                  service_filter={service_filter}
                  total_rows={list.length}
                  rows_per_page={rows_per_page}
                  onSelectPage={props.onSelectPage}
               />
            : null }

      </React.Fragment>
   )
}

export default StaticListerListContainer
