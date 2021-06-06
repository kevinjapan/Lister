import React, {useState,useEffect} from "react";
import reqInit from "../requestInit/RequestInit"

/*
Paginator gets meta data (page numbers etc) from server to facilitate larger datasets
*/

const Paginator = props => {
   
   const [page,setPage] = useState(props.page)
   const [total_pages,setTotalPages] = useState(1)
   const [total_rows,setTotalRows] = useState(0)
   const [page_links,setPageLinks] = useState([{id: 1, page: 1}])
   const all_btns = "btn float-right "

   useEffect(() => {

      const {api,service,service_filter} = props
      setPage(props.page)

      let total_num_rows = 0;
      let filter_str = ''
      service_filter !== '' ? filter_str = `&filter=${service_filter}` : filter_str = ''

      let myRequest = new Request(
         `${api}/lister/getPaginatorMeta.php?service=${service}${filter_str}`,
         reqInit()
      )

      fetch(myRequest)
         .then(response => {
            return response.json();
         })
         .then(jsonDataSet => {
         
            total_num_rows = jsonDataSet.server_response.paginator_meta.service_meta.total_no_rows
            let num_pages = Math.ceil(total_num_rows /props.rows_per_page)
            let temp_page_links = [];
            let page_num = 1;
            let s = "";
            for (let i = 0; i < num_pages; i++) {
               s = JSON.parse('{"id":' + page_num + ',"page":' + page_num + "}");
               temp_page_links[i] = s;
               page_num++;
            }
            setPageLinks(temp_page_links)
            setTotalPages(temp_page_links.length)
            setTotalRows(total_num_rows)
         })
         .catch(error => {
            // setOutcomeMsg(notify('no_server_connect'))
         })

   },[props])

   const handleChange = (event) => {
      goPage(event.target.value);
   }

   const goPage = (page) => {
      page = parseInt(page)
      if(isNaN(page)) page = 1
      if((page > 0) && (page <= total_pages)){
         setPage(page)
         props.onSelectPage(page);
      }
   }

   const prevSelectors = page => (
      page > 1
         ?  <React.Fragment>
               <div className={all_btns} 
                  onClick={() => goPage(1)}
                  >&lt;&lt;</div>
               <div className={all_btns} 
                  onClick={() => goPage(parseInt(page) - 1)}
                  >&lt;</div>
            </React.Fragment> 
         :  <React.Fragment>
               <div className={all_btns + "disabled text-muted"}
                  >&lt;&lt;</div>
               <div className={all_btns + "disabled text-muted"}
                  >&lt;</div>
            </React.Fragment> 
   )
   
   const centerSelectors = page => (
      <select className="btn inlineLink float-right" 
         onChange={handleChange} value={page}> {
            page_links.map(link => (
            <option key={link.id} value={link.page}>{link.page}</option>
            ))}
      </select>
   )

   const nextSelectors = (page,total_pages) => (
      page < total_pages
         ?  <React.Fragment>
               <div className={all_btns} 
                  onClick={() => goPage(parseInt(page) + 1)}
                  >&gt;</div>
               <div className={all_btns} 
                  onClick={() => goPage(total_pages)}
                  >&gt;&gt;</div>
            </React.Fragment>
         : <React.Fragment>
               <div className={all_btns + "disabled text-muted"} 
                  >&gt;</div>
               <div className={all_btns + "disabled text-muted"}
                  >&gt;&gt;</div>
            </React.Fragment> 
   )


   return (
      <React.Fragment>
         {total_rows > 0

            ? <React.Fragment>
                  <div className="col-12 col-sm-5 mb-2 text-center text-sm-left text-muted"
                     >page {page} of {total_pages}
                  </div>
                  <div className="col-12 col-sm-2 text-muted">
                     {`${total_rows} item${total_rows > 1 ? 's' : ''} found`}
                  </div>
                  <div className="col-12 col-sm-5 text-center text-sm-left">
                     {prevSelectors(page)}
                     {centerSelectors(page)}
                     {nextSelectors(page,total_pages)}
                  </div>
               </React.Fragment>
         : null}
      </React.Fragment>
   )
}

export default Paginator
