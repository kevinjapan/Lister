import React from "react";
import ReactHtmlParser from 'react-html-parser';


export default function displayTitle (title) {
   return (
      <React.Fragment>
         <div className={`display-4 px-2`}>{title}</div>
      </React.Fragment>
   )
}

export const isMobile = () => window.screen.width < 576 ? true : false

/*
* we manage text blocks - long words in large size may extend viewport width
* reduce font-size w/ media queries in css to prevent this
*/
export const displayTextBlock = (text) => {
   return ReactHtmlParser(text)
}

/*
* switch to '_sm' version of image_path if mobile
*/
export const displayArticleImg = (image_path,theme) => {

   if(image_path === undefined) return

   if(isMobile()) {
      let sm_image_path = image_path.replace('.', '_sm.');
      return <img src={`${sm_image_path}`} className={`article_img ${theme}`} alt="" />
   }
   return <img src={`${image_path}`} className={`article_img ${theme}`} alt="" />
}

/*
* longest word from array list
*/
export const longestWord = words => {
   let max_len = 0
   for(let i = 0 ; i < words.length ;  i++) {
      if(words[i].length > max_len) max_len = words[i].length
   }
   return max_len
}
