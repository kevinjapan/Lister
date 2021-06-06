import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import transform2UIDate from "../uiDater/uiDater"
import truncate from "../uiStringer/uiStringer"


const ListerCards = props => {

   const [service] = useState(props.config['l_service'])
   const [outcome_msg] = useState('')

   const createNew = () => {
      props.onCreateNew()
   }

   /*
   * currently, lister_config provides col width for List view as default
   * future - we want to allow config styling for both views
   * but for this standalone we style known cols for Card View here
   */
   const styleKnownCols = col => {
      let styling = ''
      switch(col){
         case 'title':styling = "display-5 text-white"
            break
         case 'tagline':styling = "text-white"
            break
         case 'date':styling = "text-white"
            break
         default: styling = ''
      }
      return styling
   }
                        
   const cardBuilder = (item) => {
      
      let classes = "text-center" 
      let card_width = props.config['l_card_width'] !== undefined 
         ? props.config['l_card_width'] 
         : "col-12 col-sm-6 col-md-6 col-lg-4"

      return (

         <NavLink 
            to={`/${service}/${item.url}`}
            className={`${card_width} p-1 text-decoration-none text-dark`} key={item.id}
            activeClassName="bg-white text-dark"
         >
            <div className="mb-3">
               <div className="col-11 m-auto m-1 mt-3 pb-2 border rounded inlineLink bg-primary">
                  {props.list_meta.cols.map(col => (
                  col.list_col === "1" 
                     ?  <div 
                           key={`${col.id}`} 
                           className={`${col.list_col_class} ${classes} col-12 ${styleKnownCols(col.col)}`}
                           >{col.input_type === "date" 
                              ?  transform2UIDate(item[col.col]) 
                              : truncate(item[col.col],240)}
                        </div>
                     : null
                  ))}
               </div>
            </div>
            {props.config['l_can_admin'] === true 
               ?  <div 
                     className="col-1 inlineLink"
                     onClick={() => props.onDeletedItem(item)}
                     >del</div>
               : <div className="col-1"></div>}
         </NavLink>
      )
   }

   return (
      outcome_msg !== "" 
      ?  <div className="bg-light">
            {outcome_msg}
         </div>
      :  <div className="col-12 bg-white">
            <div className="row col-12 mb-3">
               {props.config['l_can_create'] === false
                  ? null
                  :   <div type="button" className="inlineLink col-1 ml-auto text-nowrap" 
                        onClick={()=>createNew()}>create new</div>
               }
            </div>

            <div className="row">
               <div className="col-12">
                  <div className="row">
                     {props.list.map(item => (
                        cardBuilder(item)
                     ))}</div>
                  </div>
               </div>
         </div>

   )
}

export default ListerCards
