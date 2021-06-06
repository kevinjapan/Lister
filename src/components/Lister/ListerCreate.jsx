import React, {useState,useEffect} from "react";



const ListerCreate = props => {

   const [list_meta,setListMeta] = useState(props.list_meta)
   const [new_item,setNewItem] = useState({})

   useEffect(() => {
      if (props.list_meta.cols !== undefined) {
         let is_configured_as = ""
         let json_str = '{'
         props.list_meta.cols.forEach(col => {
            is_configured_as = props.config[col.col]
            is_configured_as !== undefined
               ?  json_str += `"${col.col}":"${is_configured_as}",`
               :  json_str += `"${col.col}":"${col.default}",`
         })
         json_str = json_str.substring(0,json_str.length-1)
         json_str += '}'
         setNewItem(JSON.parse(json_str))
      }
      setListMeta(props.list_meta)
   },[props])


   const inputer = meta_col => {
   
      if(meta_col.editable === "1") {

         switch(meta_col.input) {
            
            case "textarea":
               return (
                  <textarea  
                     className={`create_textarea m-1 ${meta_col.input_type}`}
                     name={meta_col.col} 
                     value={new_item[meta_col.col]} 
                     onChange={handleInputChange}/>
               )
            case "json":
               return (
                  <textarea  
                     className={`m-1 ${meta_col.input_type}`}
                     name={meta_col.col} 
                     value={new_item[meta_col.col]} 
                     onChange={handleInputChange}/>
   
               )
            case "input":
               return (
                  <input  
                     className={`m-1 ${meta_col.input_type}`}
                     name={meta_col.col} 
                     value={new_item[meta_col.col]}
                     onChange={handleInputChange}/>
               )
            case "date":
               return (
                  <div className="my-5">datestamp will be inserted here</div>
               )
            default:
               return (
                  <div className="my-5">{new_item[meta_col.col]}</div>
               )
         }
      }
   }
   
   const controls = () => {
      return (
         <div className="row mb-5">
            <div className="col-3 ml-auto">
               <button type="button" className="btn btn-primary btn-sm m-1" 
                  onClick={()=>props.onCloseItem(new_item)}>close</button>
               <button className="btn btn-primary btn-sm m-1" 
                  onClick={()=>props.onCreateItem(new_item)}>create</button>
            </div>
         </div>
      )
   }
  
   const handleInputChange = e => {
      const temp_item = new_item
      const {name, value} = e.target
      temp_item[name] = value
      setNewItem(temp_item)
   }

   if((props.is_open === true ) && (list_meta.cols !== undefined)) {

      return (

         <div className="container mt-4 ">

            <div className="row col-8 m-auto border rounded m-3 bg-white">

               <div className="mt-2 h-3">Create new 

                  {controls()}

                  <div className="row m-1 my-3">
                     {list_meta.cols.map(col => (
                        col.editable === "1"
                           ?  <div 
                                 key={col.id} 
                                 className="col-12 row mb-2">
                                 <div className="col-2 pt-2">{col.col}</div>
                                 <div className="col-10">
                                    {inputer(col)}
                                 </div>
                              </div>
                           :  null
                     ))}
                  </div>
                  {controls()}
               </div>
            </div>
         </div>
      )
   }
   else {
      return null
   }

}

export default ListerCreate
