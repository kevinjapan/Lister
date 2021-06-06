import React, {useState} from "react";
import transform2UIDate from "../uiDater/uiDater"
import ReactHtmlParser from 'react-html-parser';


const StaticListerItem = props => {

   const [item,setItem] = useState(props.item)
   const [list_meta] = useState(props.list_meta)

   const inputer = (meta_col,item) => {

      if(meta_col.editable === "1") {

         switch(meta_col.input) {
            case "textarea":
            return (
               <textarea  
                  className="m-1 col-12"
                  name={meta_col.col} 
                  value={item[meta_col.col]} 
                  onChange={handleInputChange}/>
            )
            case "input":
            return (
               <input  
                  className="m-1 col-12"
                  name={meta_col.col} 
                  value={item[meta_col.col]} 
                  onChange={handleInputChange}/>
            )
            default:
            return (
               <div>{item[meta_col.col]}</div>
            )
         }
      }
      else {
         switch(meta_col.input) {
            case "image":
               return (
                  <div>IMG:{item[meta_col.col]}:
                  </div>
               )
            default:
               return (
                  meta_col.input_type === "date" ?  
                     transform2UIDate(item[meta_col.col]) : 
                     insert(item,meta_col)
               )
         }
      }
   }

   const insert = (item,meta_col) => {
      let s = item[meta_col.col]
      s = s.replace(/\\"/g, '"')  // JSON encoding from server will escape as '\"'
      return <div>{ReactHtmlParser(s)} </div>
   }

   const handleInputChange = e => {
      const temp_item = item
      const {name, value} = e.target
      temp_item[name] = value
      setItem(temp_item)
   }

   if(props.is_open === true ) {

      return (
         <div className="container">
            <div className="row border rounded m-2 p-2">

               <div className="col-12">
                  <div className="row mb-5">
                     <div className="col-3 ml-auto">
                     
                     {props.can_admin === true ?
                        <div>
                           <button type="button" className="btn btn-primary btn-sm m-1" 
                        onClick={()=>props.onCloseItem(item)}>close</button>
                           <button className="btn btn-primary btn-sm m-1" 
                           onClick={()=>props.onUpdateItem(item)}>update</button>
                        </div>
                        : <div></div>
                     }
                           
                     </div>
                  </div>
               <div className="row mb-1">
                  {list_meta.cols.map(meta_col => (
                     <React.Fragment key={item.id + meta_col.id}>
                     {meta_col.on_form === "1" ? 
                           <div 
                              key={item.id + meta_col.id} 
                              className="col-12 row"
                           >
                              <div className="col-12 col-lg-2 p-1 text-info">{meta_col.col}:</div>
                              <div className="col-12 col-lg-10 p-1">
                              {inputer(meta_col,item)}
                              </div>
                        </div> : null
                     }
                     </React.Fragment>
                  ))}
                  </div>
                  <div className="row mb-5">
                     <div className="col-3 ml-auto">
                     
                     {props.can_admin === true ?
                        <div>
                           <button type="button" className="btn btn-primary btn-sm m-1" 
                        onClick={()=>props.onCloseItem(item)}>close</button>
                           <button className="btn btn-primary btn-sm m-1" 
                           onClick={()=>props.onUpdateItem(item)}>update</button>
                        </div>
                        : <div></div>
                     }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
   else {
      return <div></div>
   }
}

export default StaticListerItem
