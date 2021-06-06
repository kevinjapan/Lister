import React, {useState} from "react";
import Lister from "../Lister/Lister"
import StaticLister from "../StaticLister/StaticLister"



const LessonPlans = props => {

   const [service] = useState('lessons')
   const [service_filter] = useState('type=1')

   const changePage = page => {
      props.onChangePage(page)
   }

   const changeView = view => {
      props.onChangeView(view)
   }

   const openListItem = (item) => {
      props.history.push('/lessons/' + item.url)
   }
   
   /*
   *     Lister client configures list parameters here

   *     l_*** : denotes Lister configuration parameter
   * 
   *     key configurables:
   * 
   *     l_item_path       :     url path to item if opening in new page
   *     l_in_list         :     open item view in-situ (expand item on list)
   *     l_rows_per_page   :     rows or cards to display each page 
   */

   let lister_config = {
      l_service: service,
      l_service_filter: service_filter,
      l_item_path: `/${props.domain}`,
      l_in_list:false,
      l_can_create:true,
      l_is_col_titles:true,
      l_order_by:"title",
      l_card_width:"col-12 col-sm-6 col-md-6 col-lg-4",
      l_paginate:true,
      l_rows_per_page:6,
      l_type:1
   }

   return (      

      <div className="row bg-navy mb-5">

         <div className="d-none d-md-block jumbotron bg-navy mb-n4">
            <div className="col-12 col-sm-10 col-lg-12 mt-n5 mb-n5"> 
               <div 
                  className="display-5 logo_tag m-2"
                  >English Lessons</div>
               <div 
                     className="display-6 logo_tagline m-2"
                  >for beginner, intermediate and advanced students</div>
            </div>
         </div>
         <div className="col-12 d-md-none mb-n4 pb-4">
            <div className="display-5 logo_tag">English Lessons</div>
            <div className="display-6 logo_tagline mb-3">for beginner, intermediate and advanced students</div>
         </div>
         
         <div className="col-12 bg-white ui_tools">

            {props.api === ''
               ?  <StaticLister
                     api={props.api}
                     page={props.lessons_page}
                     view={props.view}
                     config={lister_config}
                     onOpenListItem={openListItem}
                     onChangePage={changePage}
                     onChangeView={changeView}
                  />
               :  <Lister
                     api={props.api}
                     page={props.lessons_page}
                     view={props.view}
                     config={lister_config}
                     onOpenListItem={openListItem}
                     onChangePage={changePage}
                     onChangeView={changeView}
                  />
            }
         </div>
      </div>
   )
}

export default LessonPlans
