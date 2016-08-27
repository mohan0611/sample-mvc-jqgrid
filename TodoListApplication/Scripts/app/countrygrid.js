$(function () {
    jQuery("#country").jqGrid({
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
        multiselect: false,
        onSelectRow: function (ids) {
            //$('#countrynamedisp').val(ids);
            if (ids == null) {
                ids = 0;
                if (jQuery("#city").jqGrid('getGridParam', 'records') > 0) {
                    jQuery("#city").jqGrid('setGridParam', { url: "/City/GetCityLists?countryid=" + ids, page: 1 });
                    $('#countrynamedisp').val(ids);
                    jQuery("#city").jqGrid('setCaption', "City for country")
                    .trigger('reloadGrid');
                }
            } else {
                jQuery("#city").jqGrid('setGridParam', { url: "/City/GetCityLists?countryid=" + ids, page: 1 });
                $('#countrynamedisp').val(ids);
                jQuery("#city").jqGrid('setCaption', "City for country " + ids)
                .trigger('reloadGrid');
            }
        }
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
            height: 300
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
            height: 300
        },
        {
            // delete options
            zIndex: 100,
            url: "/Country/Delete",
            closeOnEscape: true,
            closeAfterDelete: true,
            recreateForm: true,
            msg: "Are you sure you want to delete this country?",
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            }
        });

    jQuery("#city").jqGrid({
        height: 100,
        url: '/City/GetCityLists?countryid=0',
        datatype: "json",
        colNames: ['City ID', 'City Name', 'Country', 'Population', 'countryid'],
        //colModel: [
        //    { name: 'CityID', index: 'CityID', width: 55 },
        //    { name: 'CityName', index: 'CityName', width: 180 }
        //    //{ name: 'CountryName', index: 'CountryName', width: 80 },
        //    //{ name: 'TotalPopulation', index: 'TotalPopulation', width: 80, align: "right" }
        //    //{ name: 'linetotal', index: 'linetotal', width: 80, align: "right", sortable: false, search: false }
        //],
        colModel: [
                    { key: true, hidden:true, name: 'CityID', index: 'CityID', editable: true },
                    { key: false, name: 'CityName', index: 'CountryName', editable: true },
                    { key: false, name: 'CountryName', index: 'CountryName', width: 80, editable: false },
                    { key: false, name: 'TotalPopulation', index: 'TotalPopulation', width: 80, align: "right", editable: true },
                    { key: false, hidden: true, name: 'CountryID', index: 'CountryID', width: 80, align: "right", editable: true }
        ],
        rowNum: 5,
        rowList: [5, 10, 20],
        pager: jQuery('#pager_city'),
        sortname: 'CityName',
        viewrecords: true,
        sortorder: "asc",
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        //multiselect: true,
        caption: "City"
    }).navGrid('#pager_city', { edit: true, add: true, del: true, search: false, refresh: true },
       {
           // edit options
           zIndex: 100,
           url: '/City/Edit',
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
           height: 300
       },
        {
            // add options
            zIndex: 100,
            url: "/City/Create",
            closeOnEscape: true,
            closeAfterAdd: true,
            beforeSubmit: function (postdata, formid) {
                //console.log($("#country").jqGrid('setSelection', "row_id"));
                postdata.CountryId = $('#countrynamedisp').val();
                return[true,'']; 
            },
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            },
            width: 600,
            height: 300
        },
        {
            // delete options
            zIndex: 100,
            url: "/City/Delete",
            closeOnEscape: true,
            closeAfterDelete: true,
            recreateForm: true,
            msg: "Are you sure you want to delete this country?",
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            }
        });
});