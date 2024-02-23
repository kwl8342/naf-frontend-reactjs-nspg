const $ = require('jquery');
$.DataTable = require('datatables.net');

export const DataTableDestroy = function (elm) {
  if ($(elm).length > 0) {
    $(elm).each(function () {
      $(this).DataTable().destroy();
    });
  }
};
