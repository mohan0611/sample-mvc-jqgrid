$(function () {
    $("#grid").jqGrid({
        url: "/TodoList/GetTodoLists",
        datatype: 'json',
        mtype: 'Get',
        colNames: ['Id', 'Task Name', 'Task Description', 'Target Date', 'Severity', 'Task Status'],
        colModel: [
            { key: true, hidden: true, name: 'Id', index: 'Id', editable: true },
            { key: false, name: 'TaskName', index: 'TaskName', editable: true },
            { key: false, name: 'TaskDescription', index: 'TaskDescription', editable: true },
            {
                key: false, name: 'TargetDate', index: 'TargetDate', editable: true, formatter: 'date', formatoptions: { newformat: 'd/m/Y' },
                editoptions:{size:20, 
                  dataInit:function(el){ 
                        $(el).datepicker({dateFormat:'dd-M-yy'}); 
                  }, 
                  defaultValue: function(){ 
                    var currentTime = new Date(); 
                    var month = parseInt(currentTime.getMonth() + 1); 
                    month = month <= 9 ? "0"+month : month; 
                    var day = currentTime.getDate(); 
                    day = day <= 9 ? "0"+day : day; 
                    var year = currentTime.getFullYear(); 
                      //return year+"-"+month + "-"+day; 
                    //return day + "-" + month + "-" + year;
                  } 
                } 
            },
            { key: false, name: 'Severity', index: 'Severity', editable: true, edittype: 'select', editoptions: { value: { 'L': 'Low', 'M': 'Medium', 'H': 'High' } } },
            { key: false, name: 'TaskStatus', index: 'TaskStatus', editable: true, edittype: 'select', editoptions: { value: { 'A': 'Active', 'I': 'InActive' } } }],
        pager: jQuery('#pager'),
        rowNum: 10,
        rowList: [10, 20, 30, 40], 
        height: '100%',
        viewrecords: true,
        caption: 'Todo List',
        emptyrecords: 'No records to display',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        autowidth: true,
        multiselect: false
    }).navGrid('#pager', { edit: true, add: true, del: true, search: false, refresh: true },
        {
            // edit options
            zIndex: 100,
            url: '/TodoList/Edit',
            closeOnEscape: true,
            closeAfterEdit: true,
            recreateForm: true,
            beforeSubmit: function (postdata, formid) {
                if ($('#TaskName').val() == "") {
                    $('#TaskName').addClass("ui-state-highlight");
                    return [false, 'ERROR MESSAGE']; //error
                }
                return [true, ''];
            },
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            },
            width: 600,
            height:300
        },
        {
            // add options
            zIndex: 100,
            url: "/TodoList/Create",
            closeOnEscape: true,
            closeAfterAdd: true,
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            },
            width: 600,
            height:300
        },
        {
            // delete options
            zIndex: 100,
            url: "/TodoList/Delete",
            closeOnEscape: true,
            closeAfterDelete: true,
            recreateForm: true,
            msg: "Are you sure you want to delete this task?",
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            }
        });
});