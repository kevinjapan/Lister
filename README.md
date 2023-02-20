# Lister React JS Component

Lister and StaticLister provide paginated list views of simple datasets.

## Configuration

Lister pulls datasets from a database source, while StaticLister pulls data from JSON files.

### configuration parameters

```
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
```

## Example Provided

In the example code, StaticLister is called by the client component LessonPlans and configured to pull data from JSON files.

```
<StaticLister
    api={props.api}
    page={props.lessons_page}
    view={props.view}
    config={lister_config}
    onOpenListItem={openListItem}
    onChangePage={changePage}
    onChangeView={changeView}
/>
```


## List Configuraton JSON file    

List_Meta JSON configures how the front-end displays the list:
```
{
    "list_meta":
        {
            "service" :"lessons",
            "cols":[
                {
                    "id":1,
                    "col":"id",
                    "list_col":"0",
                    "styles":"",
                    "default":"",
                    "on_form":"0",
                    "edit":"0",
                    "input":"",
                    "input_type":"",
                    "input_len":""
                },
                {
                    "id":2,
                    "col":"title",
                    "list_col":"1",
                    "styles":"col-12 display-5 text-white",
                    "default":"",
                    "on_form":"1",
                    "edit":"0",
                    "input":"",
                    "input_type":"",
                    "input_len":""
                }
            ]
        }
}
```


## Lessons List JSON file  

Lessons_List JSON contains the lesson headline details:
```
{
    "lessons": [
        {
            "title":"Animals",
            "slug":"Animals",
            "id":"130",
            "type":"2",
            "level":"1",
            "tagline":"animals and pets"
            "summary":"Discover your students' relationships with animals.",
            "updated":"2021-01-21"
        },
        {
            "title":"Blocks",
            "slug":"Blocks",
            "id":"15",
            "type":"1",
            "level":"2",
            "tagline":"block your opponent",
            "summary":"Two teams compete to connect blocks across a grid of letters drawn on the board.",
            "updated":"2021-01-21"
        }
    ]
}
```
