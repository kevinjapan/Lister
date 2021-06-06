import React from "react";
import ReactHtmlParser from 'react-html-parser';
import transform2UIDate from "../uiDater/uiDater"
import displayTitle from '../uiArticles/uiArticles'
//import imgHandler from '../uiImages/uiImages'


const Lesson = props => {


   const buildBlock = block => {
      let s = ''
      const {tag,class_name} = block
      switch(block.tag) {
         case "img":
            s = `<img src={imgHandler(block.text)} alt="" class={class_name} />`
            break
         case "":
            s = `<div className="col-12">${block.text}</div>`
            break
         default:
            s = `<${tag} class="${class_name}">${block.text}</${tag}>`
      }
      return ReactHtmlParser(s)
   }


   const back2List = () => {
      window.history.go(-1)
   }

   if(props.lesson.title !== undefined) {

      const {title,tagline,keywords,duration,content,updated,author} = props.lesson
      let index_count = 0

      return (

         <div className="col-10 mx-auto my-5 border rounded bg-white">
            <div className="row">

               <div className="col-12 text-right m-1 inlineLink" onClick={back2List}>
                  back to list
               </div>

               <div className="row col-12 m-1 mt-4 mb-4">
                     <div className="col-12 mb-1">{displayTitle(title)}</div>
                     <div className="col-12 display-6 text-start ">{tagline}</div>
               </div>
 
               <div 
                  className="row col-10 col-md-8 col-lg-6 m-3 ml-4 border rounded bg-light p-2" id="worksheet_top">
                     <div className="row col-12 mb-2">
                        <div className="col-12 col-sm-4 text-muted">keywords</div>
                        <div className="col-12 col-sm-8">{keywords}</div>
                     </div>
                     {duration !== ""
                        ?   <div className="row col-12 mb-2">
                              <div className="col-12 col-sm-4 text-muted">duration</div>
                              <div className="col-12 col-sm-8 ">{duration}</div>
                           </div>
                        : null}
                     <div className="row col-12 mb-2">
                        <div className="col-12 col-sm-4 text-muted">contributor</div>
                        <div className="col-12 col-sm-8 ">{author}</div>
                     </div>
                     <div className="row col-12 mb-2">
                        <div className="col-12 col-sm-4 text-muted">updated</div>
                        <div className="col-12 col-sm-8 ">{transform2UIDate(updated)}</div>
                     </div>
               </div>
            </div>

            <div className="row mt-4 p-3 text_block">
               {content !== undefined 
                  ? content.map(block => {
                        return <div key={index_count++} className="col-12">{buildBlock(block)}</div>
                     })
                  : null}
            </div>
         
            <div className="col-12 text-right mb-2 inlineLink" onClick={back2List}>
               back to list
            </div>
         </div>
         )
   }
   else {
      return null
   }

}

export default Lesson
