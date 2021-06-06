import React, {useState,useEffect} from "react";
import StaticListerItem from "./StaticListerItem"
import transform2UIDate from "../uiDater/uiDater"


const StaticListerList = props => {

   const [list,setList] = useState(props.list)
   const [open_items,setOpenItems] = useState([])

   useEffect(() => {
      const {page,list} = props
      const rows_per_page = props.config['l_rows_per_page']
      const startat = ((page - 1) * rows_per_page)  
      const endat = (page * rows_per_page) - 1
      let current_page_list = list.filter((item,index) => index >= startat && index <= endat)
      setList(current_page_list)
   },[props])


   const titlesRowBuilder = () => {

      let classes = "text-start" 
      return (
         <div className="row m-2">
            {props.list_meta.cols.map(col => (
               col.list_col === "1" 
                  ?
                     <div 
                        key={col.id} 
                        className={`${classes} ${col.list_col_class} inlineLink`}
                        onClick={() => orderList(col.col)}
                     >{col.col}</div>
                  :  null
            ))}
         </div>
      )
   }


   /* 
   * if the client doesn't supply as onOpenListItem handler as a prop, we simply
   * open the ListerItem in-situ. Otherwise, we let client handle the open event 
   * (typically client will redirect to open item in another 'page' eg see Lessons
   * 
   *  eg    client provides handler as prop:
   * 
   *        <Lister
   *           onOpenListItem={openListItem}
   *        />
   * 
   *        where client also provides handler to open selected item page:  
   *  
   *        const openListItem = (item) => {
   *           props.history.push('/lessons/' + item.url)
   *        }
   */

   /* 
   * future : itemRowBuilder as shared resource for both Lister and StaticLister (as w/ uiCard)
   */
   
   const itemRowBuilder = (item,onOpenListItem) => {

      if(onOpenListItem === undefined) onOpenListItem = () => toggleItem(item) /* in-situ or not */
         
      let classes = "text-start" 
      return (
         <div className="row border rounded m-2">
            {props.list_meta.cols.map(col => (
               col.list_col === "1" 
                  ?  <div 
                        key={col.id} 
                        className={`${classes} ${col.list_col_class} inlineLink`}
                        onClick={() => onOpenListItem(item)}
                     >{col.input_type === "date" ?  transform2UIDate(item[col.col]) : `${item[col.col]}`}
                     </div> 
                  :  null
               ))
            }

            {props.can_admin === true 
               ?  <div 
                     className="col-1 inlineLink"
                     onClick={() => props.onDeletedItem(item)}
                     >del</div>
               : <div className="col-1"></div>
            }
         </div>
      )
   }

   const orderList = col => {
      props.onChangedOrder(col)
   }

   const toggleItem = (item) => {
      isOpenItem(item) ? 
         closeItem(item) : 
         openItem(item)
   }

   const openItem = (item) => {
      let modified = open_items
      modified.push(item)
      setOpenItems(modified)
      
      if(props.onSelectedItem) {
         props.onSelectedItem(item.id)
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

   if ((list !== undefined) && (props.list_meta.cols !== undefined)){

      return (

         <div className="container">
  
            {props.config['l_is_col_titles'] && titlesRowBuilder()}

            {list.map(item => (

               <div key={`${item.id}`}>

                  {itemRowBuilder(item,props.onOpenListItem)}

                  <div key={item.id} item={item} className="row mt-5 mt-sm-0 m-1 mb-3 bg-white">
                     <div className="container">
                        <StaticListerItem
                           className="col-12"
                           item={item}
                           can_admin={props.can_admin}
                           list_meta={props.list_meta}
                           is_open={open_items.find(elem => (elem.id === item.id)) !== undefined ? true : false}
                           onCloseItem={closeItem}
                           onUpdateItem={props.onUpdateItem}
                        />
                     </div>
                  </div>
               </div>
            ))}
         </div>
      )
   } else {
      return <div>loading..</div>;
   }
}

export default StaticListerList
