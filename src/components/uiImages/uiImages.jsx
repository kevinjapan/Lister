

const imgHandler = image_path => {
   let imgSrc
   try {
      imgSrc = require('../../assets/lesson_imgs/' + image_path + '')
   } catch {
      imgSrc = require('../../assets/lesson_imgs/no_img.jpg')
   }
   return imgSrc
}


export default imgHandler
