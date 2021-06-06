import React, {useState,useEffect} from "react";
import cardBuilder from '../uiCard/uiCard'


const StaticListerCards = props => {

   const [list,setList] = useState([])

   useEffect(() => {
      
      if(props.list !== undefined) {
         const {page,list} = props
         const rows_per_page = props.config['l_rows_per_page']
         const startat = ((page - 1) * rows_per_page)  
         const endat = (page * rows_per_page) - 1
         let current_page_list = list.filter((item,index) => index >= startat && index <= endat)
         setList(current_page_list)
      }
   },[props])

   return (
      <div className="col-12 bg-white">
         <div className="row">
            <div className="col-12">
               <div className="row">
                  {list.map(item => (
                     cardBuilder(props,item)
                  ))}</div>
               </div>
         </div>
      </div>
   )
}

export default StaticListerCards
