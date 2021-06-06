import React, {useState} from "react";
import {Switch,Route} from "react-router-dom"
import LessonPlans from '../LessonPlans/LessonPlans'
import LessonContainer from '../LessonPlans/LessonContainer'


const Home = props => {

   const [lessons_page,setLessonsPage] = useState(1)
   const [lister_view,setListerView] = useState('card')
   const {api} = props

   return (

      <div className="homeContainer container-fluid">

            <Switch>
               <Route exact path="/lessons" render={props => (
                  <LessonPlans {...props} 
                     api={api} 
                     domain="lessons"
                     lessons_page={lessons_page}
                     view={lister_view}
                     onChangePage={setLessonsPage}
                     onChangeView={setListerView}
                  />
               )}/>
               <Route exact path="/lessons/:url" render={props => (
                  <LessonContainer {...props} 
                     api={api}/>
               )}/>
               <Route exact path="/" render={props => (
                  <LessonPlans {...props} 
                     api={api} 
                     domain="lessons"
                     lessons_page={lessons_page}
                     view={lister_view}
                     onChangePage={setLessonsPage}
                     onChangeView={setListerView}
                  />
               )}/>
            </Switch>

      </div>
   )
}

export default Home
