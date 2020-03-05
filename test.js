mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
};

$(function () {

    var now = new Date();

    $('#demo-calendar-date-picker').mobiscroll().calendar({
        display: 'inline',
        onInit: function (event, inst) {
            inst.setVal(now, true);
        }
    });

    $('#demo-calendar-header').mobiscroll().calendar({
        display: 'bubble',
        headerText: '{value}',
        onInit: function (event, inst) {
            inst.setVal(now, true);
        }
    });

    $('#demo-calendar-non-form').mobiscroll().calendar({
        display: 'bubble',
        onInit: function (event, inst) {
            inst.setVal(now, true);
        }
    });

    var instance = $('#demo-calendar-date-external').mobiscroll().calendar({
        display: 'bubble',
        showOnTap: false,
        showOnFocus: false,
        onInit: function (event, inst) {
            inst.setVal(new Date(), true);
        }
    }).mobiscroll('getInst');;

    $('#show-demo-calendar-date-external').click(function () {
        instance.show();
        return false;
    });

});