import $ from 'jquery';
import JSZip from 'jszip';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.print';
window.JSZip = JSZip;
$.DataTable = require('datatables.net');

const ext = (obj, ext) => {
  Object.keys(ext).forEach(function (key) {
    obj[key] = ext[key];
  });
  return obj;
};

export const DataTableInitialize = function (elm, opt) {
  if ($(elm).length > 0) {
    $(elm).each(function () {
      var auto_responsive = $(this).data('auto-responsive'),
        has_export = typeof opt.buttons !== 'undefined' && opt.buttons ? true : false;
      var export_title = $(this).data('export-title') ? $(this).data('export-title') : 'Export';
      var btn = has_export ? '<"dt-export-buttons d-flex align-center"<"dt-export-title d-none d-md-inline-block">B>' : '',
        btn_cls = has_export ? ' with-export' : '';
      var dom_normal =
        '<"row justify-between g-2' +
        btn_cls +
        '"<"col-7 col-sm-4 text-left"f><"col-5 col-sm-8 text-right"<"datatable-filter"<"d-flex justify-content-end g-2"' +
        btn +
        'l>>>><"datatable-wrap my-3"t><"row align-items-center"<"col-7 col-sm-12 col-md-9"p><"col-5 col-sm-12 col-md-3 text-left text-md-right"i>>';
      var dom_separate =
        '<"row justify-between g-2' +
        btn_cls +
        '"<"col-7 col-sm-4 text-left"f><"col-5 col-sm-8 text-right"<"datatable-filter"<"d-flex justify-content-end g-2"' +
        btn +
        'l>>>><"my-3"t><"row align-items-center"<"col-7 col-sm-12 col-md-9"p><"col-5 col-sm-12 col-md-3 text-left text-md-right"i>>';
      var dom = $(this).hasClass('is-separate') ? dom_separate : dom_normal; //<"#searchPane.row"P><"#searchBuilder.row"Q>
      var def = {
          processing: true,
          responsive: true,
          autoWidth: false,
          dom: dom,
          searchPanes: {
            viewTotal: true
          },
          language: {
            processing: '<div id="cover-spin"></div>',
            search: '',
            searchPlaceholder: 'Type in to Search',
            lengthMenu: "<span class='d-none d-sm-inline-block'>Show</span><div class='form-control-select'> _MENU_ </div>",
            info: '_START_ -_END_ of _TOTAL_',
            infoEmpty: 'No records found',
            infoFiltered: '( Total _MAX_  )',
            paginate: {
              first: 'First',
              last: 'Last',
              next: 'Next',
              previous: 'Prev'
            },
            searchPanes: {
              emptyPanes: 'There are no panes to display. :/'
            }
          }
        },
        attr = opt ? ext(def, opt) : def;
      attr =
        auto_responsive === false
          ? ext(attr, {
              responsive: false
            })
          : attr;

      $(this).DataTable(attr);
      $('.dt-export-title').text(export_title);
    });
  }
};
