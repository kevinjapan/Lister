# Lister React JS Component

Lister and StaticLister provide paginated list views of simple datasets.

## Configuration

Lister pulls datasets from a database source, while StaticLister pulls data from JSON files.

### configuration parameters

    `let lister_config = {
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
    }`

## Example Provided

In the simple example given, StaticLister is called by the client component LessonPlans and configured to pull data from JSON files.


               `<StaticLister
                   api={props.api}
                   page={props.lessons_page}
                   view={props.view}
                   config={lister_config}
                   onOpenListItem={openListItem}
                   onChangePage={changePage}
                   onChangeView={changeView}
               />`
               
               
