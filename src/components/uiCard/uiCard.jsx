import {NavLink} from "react-router-dom";
import transform2UIDate from "../uiDater/uiDater"
import truncate from "../uiStringer/uiStringer"


/*
currently, lister_config provides col width for List view - default
future - allow config styling for both views but for this standalone we style known cols for Card View here
*/
const styleKnownCols = col => {
   let styling = ''
   switch(col){
      case 'title':styling = "display-5 text-white mx-2"
         break
      case 'tagline':styling = "text-white mx-2"
         break
      case 'date':styling = "text-white mx-2"
         break
      default: styling = 'mx-2'
   }
   return styling
}

      
/* 
* card view only opens in separate page - no in-situ option as w/ list
* we use navlink to facilitate 'open in new tab'
*/
const cardBuilder = (props,item) => {

   const service = props.config['l_service']
   let classes = "text-start" 
   let card_width = props.config['l_card_width'] !== undefined 
      ? props.config['l_card_width'] 
      : "col-12 col-sm-6 col-md-6 col-lg-4"

   return (

      props.list_meta.cols !== undefined
         ?   <NavLink 
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
                              className={`${col.list_col_class} ${classes} col-11 ${styleKnownCols(col.col)}`}
                              >{col.input_type === "date" 
                                 ?  transform2UIDate(item[col.col]) 
                                 :  truncate(item[col.col],240)}
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
         : null 
   )
}

export default cardBuilder
