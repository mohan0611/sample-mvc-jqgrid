$(function () {
    $("#country").jqGrid({
        url: "/Country/GetCountryLists",
        datatype: 'json',
        mtype: 'Get',
        colNames: ['CountryId', 'Country Name', 'Language'],
        colModel: [
            { key: true, hidden: true, name: 'CountryId', index: 'CountryId', editable: true },
            { key: false, name: 'CountryName', index: 'CountryName', editable: true },
            { key: false, name: 'Primarylanguage', index: 'Primarylanguage', editable: true },
            ],
        pager: jQuery('#pager'),
        rowNum: 10,
        rowList: [10, 20, 30, 40], 
        height: '100%',
        viewrecords: true,
        caption: 'Country',
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
            url: '/Country/Edit',
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
            url: "/Country/Create",
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
            url: "/Country/Delete",
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