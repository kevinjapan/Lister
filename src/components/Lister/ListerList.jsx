import React, {useState} from "react";
import ListerItem from "./ListerItem"
import transform2UIDate from "../uiDater/uiDater"
import truncate from "../uiStringer/uiStringer"


const ListerList =props => {

   const [open_items,setOpenItems] = useState([])
   const [outcome_msg] = useState('')
   const {config,list_meta} = props

   const openListItem = (item,callback) => {
      if(props.config['l_in_list'] === false) {
         if(props.onOpenListItem !== undefined){
            props.onOpenListItem(item,callback)
         }
      }
      else {
         toggleItem(item)
      }
   }

   const titlesRowBuilder = () => {

      const l_ui_styles = props.config['l_ui_styles']

      return (
         <React.Fragment>
         {props.list_meta.cols !== undefined
            ?  <div className="row ">
                  <div className="col-10 row">
                  {props.list_meta.cols.map(col => (
                     col.list_col === "1"
                        ?  <div 
                              key={col.id} 
                              className={`${col.list_col_class} inlineLink text-start font-weight-bold
                              ${!l_ui_styles ? " supress_ui_style ": " bg-warning"}`}
                              onClick={() => orderList(col.col)}
                           >{col.col}</div>
                        :  null
                  ))}
                  </div>
               </div>
            : null }
         </React.Fragment>
      )
   }

   const itemRowBuilder = item => {
      
      let classes = "text-start"
      let controls_list = []
      if(props.config['l_item_controls'] !== undefined) {
         controls_list = props.config['l_item_controls'].split(",")
      }

      return (
         
         <div className="row border rounded m-2">
            <div className="col-12 row">
               {props.list_meta.cols.map(col => (
                  col.list_col === "1" 
                     ?  <div 
                           key={`${item.id} ${col.id}`} 
                           className={`${classes}  ${col.list_col_class} inlineLink`}
                           onClick={() => openListItem(item)}
                        >{col.input_type === "date" 
                           ?  transform2UIDate(item[col.col]) 
                           : truncate(item[col.col],60)}
                        </div>
                     : null
               ))}
            </div>
            <div className="col-2">
               {props.config['l_can_admin'] === true 
                  ?  <div 
                        className="col-1 inlineLink"
                        onClick={() => props.onDeletedItem(item)}
                        >del</div>
                  : <div className="col-1"></div>}

               {controls_list.length > 0 
                  ? controls_list.map(control => (
                        <div 
                           key={control} 
                           onClick={() => props.onItemControls(control,item.id)}
                           className="inlineLink"
                           >{control}</div>
                     ))
                  : null
               }
            </div>
         </div>
      )
   }
 
   const orderList = col => {
      props.onChangedOrder(col)
   }

   const toggleItem = (item) => {
      isOpenItem(item)
         ?  closeItem(item)
         :  openItem(item)
   }

   const openItem = (item) => {
      let modified = open_items;
      modified.push(item)
      setOpenItems(modified)
      if(props.config['l_in_list'] === false) {
         props.onSelectedItemId(item.id)
      }
   }

   const closeItem = (target_item) => {
      let modified = open_items.filter(item => item.id !== target_item.id)
      setOpenItems(modified)
   }

   const isOpenItem = (target_item) => {
      if( open_items.find(item => {return (item.id === target_item.id)}) === undefined) {
         return false
      }
      else {
         return true
      }
   }

   const createNew = () => {
      props.onCreateNew()
   }

   return (

      outcome_msg !== "" 
         ? <div className="bg-light">{outcome_msg}</div>
         :  <div className="container">
               <div className="row col-12 mb-3">
                  {props.config['l_can_create'] === false
                     ? null
                     :   <div type="button" className="inlineLink col-1 ml-auto text-nowrap" 
                           onClick={()=>createNew()}>create new</div>
                  }
               </div>

               {config['l_is_col_titles'] && titlesRowBuilder()}

               {props.list.map(item => (

                  <React.Fragment key={item.id}>

                     {itemRowBuilder(item)}

                     <div key={item.id} item={item} className="row">
                        <div className="container col-12 mr-n3 bg-white">

                           <ListerItem
                              className="col-12"
                              item={item}
                              can_admin={config['l_can_admin']}
                              list_meta={list_meta}
                              is_open={open_items.find(elem => (elem.id === item.id)) !== undefined ? true : false}
                              onCloseItem={closeItem}
                              onUpdateItem={props.onUpdateItem}
                           />

                        </div>
                     </div>
               
                  </React.Fragment>
               ))}
            </div>
   )

}

export default ListerList
