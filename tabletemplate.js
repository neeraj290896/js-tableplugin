(function($) {
  $.fn.structure = function(options) {
    var settings = $.extend({}, options);
    var texthtml = "";
    $.each(settings.table_data, function(index, value) {
      if (value.table_type == "basic") {
        texthtml +=
          '<div class="' +
          value.table_name +
          '"><div class="table">';
        if(value.headers != null && value.headers != undefined){
          texthtml += '<div class="header"><div class="row"><div class="column" data-head_id="' +
            value.headers.head_id +
            '">' +
            value.headers.head_text +
            '</div></div></div>';
        }
        if(value.body != null && value.body != undefined){
          texthtml += '<div class="body">';
          $.each(value.body.data, function(index1, value1) {
            texthtml +=
              '<div class="row"><div class="column ' +
              value.headers.head_id +
              '"';
            $.each(value1, function(key, value2) {
              if (Object.keys(value1)[Object.keys(value1).length - 1] != key)
                texthtml += " data-" + key + '="' + value2 + '"';
            });
            texthtml +=
              ">" +
              value1[Object.keys(value1)[Object.keys(value1).length - 1]] +
              "</div></div>";
          });
          texthtml += "</div>";
        }
        texthtml += "</div></div>";
      } else if (value.table_type == "advanced") {
        texthtml +=
          '<div class="' +
          value.table_name +
          '"><div class="table">';
        if(value.headers != null && value.headers != undefined){
          texthtml += '<div class="header">';
          $.each(value.headers.rows, function(index1, value1) {
            texthtml += '<div class="row">';
            $.each(value1.columns, function(index2, value2) {
              texthtml += '<div class="column';
              var txt = "";
              $.each(value2, function(key, value3) {
                if (Object.keys(value2)[Object.keys(value2).length - 1] != key) {
                  if (value3 != null && !(typeof value3 === "boolean")) {
                    texthtml += " " + value3;
                  }
                  txt += " data-" + key + '="' + value3 + '"';
                }
              });
              texthtml +=
                '"' +
                txt +
                " style=''>" +
                value2[Object.keys(value2)[Object.keys(value2).length - 1]];
              if (value2["head_isEC"] == true) {
                texthtml +=
                  ' <img class="ECicon collapse" src="https://www.iconsdb.com/icons/preview/white/plus-5-xxl.png">';
              }
              texthtml += "</div>";
            });
            texthtml += "</div>";
          });
          texthtml += '</div>';
        }
        if(value.body != null && value.body != undefined){
          texthtml += '<div class="body">';
          $.each(value.body.data, function(index1, value1) {
            if ((index1 + 1) % value.body.col_count == 1) {
              texthtml += '<div class="row">';
            }
            var txt = "";
            var i = 0;
            var j = 0;
            for (
              i = Object.keys(value1).length - 2 * value.body.div_count;
              i < Object.keys(value1).length;
              i++
            ) {
              if ((j + 1) % value.body.div_count == 1) {
                texthtml += '<div class="column';
              }
              if(value1[Object.keys(value1)[i]] != null && !(typeof value1[Object.keys(value1)[i]] === "boolean")){
                texthtml += " " + value1[Object.keys(value1)[i]];
              }
              txt +=
                " data-" +
                Object.keys(value1)[i] +
                '="' +
                value1[Object.keys(value1)[i]] +
                '"';
              if ((j + 1) % value.body.div_count == 0) {
                var k = 0;
                for (
                  k = 0;
                  k < Object.keys(value1).length - 2 * value.body.div_count;
                  k++
                ) {
                  if(value1[Object.keys(value1)[k]] != null && !(typeof value1[Object.keys(value1)[k]] === "boolean")){
                    texthtml += " " + value1[Object.keys(value1)[k]];
                  }
                  txt +=
                    " data-" +
                    Object.keys(value1)[k] +
                    '="' +
                    value1[Object.keys(value1)[k]] +
                    '"';
                }
                texthtml +=
                  '"' + txt + ">" + value1[Object.keys(value1)[i]] + "</div>";
                txt = "";
              }
              j++;
            }
            if ((index1 + 1) % value.body.col_count == 0) {
              texthtml += "</div>";
            }
          });
          texthtml += "</div>";
        }
        texthtml += "</div></div>";
      }
    });
    return this.append(texthtml);
  };

  $.fn.styles = function(options) {
    var settings = $.extend({}, options);
    $(".header .column").css({
      border: "1px solid rgb(136, 134, 134)",
      "padding-top": "2px",
      "padding-bottom": "2px",
      background: "rgb(36, 170, 32)",
      color: "#fff",
      "text-align": "center"
    });
    $(".body .column").css({
      border: "1px solid rgb(136, 134, 134)",
      "padding-top": "2px",
      "padding-bottom": "2px",
      "text-align": "center"
    });
    $(".ECicon").css({
      height: "13px",
      "padding-left": "5px",
      cursor: "pointer"
    });
    $.each(settings.table_data, function(index, value) {
      $("." + value.table_name).css({
        width: value.table_width,
        display: "inline-block"
      });
      if (value.table_type == "advanced") {
        $("." + value.table_name + " .column").css({
          display: "inline-block"
        });

        $("." + value.table_name + " .header .row .column").css({
          width: "0px"
        });
        $(
          "." +
            value.table_name +
            " .header .row:eq(" +
            (value.headers.rows.length - 1) +
            ") .column"
        ).css({
          width: "90px"
        });
        $("." + value.table_name).css({
          "overflow-x": "auto"
        });
        $(
          "." +
            value.table_name +
            " .header .row:eq(" +
            (value.headers.rows.length - 1) +
            ") .column"
        ).each(function() {
          var wid = $(this).width();
          var hid = $(this).data("head_id");
          var pid = $(this).data("head_parent");
          $("." + value.table_name + " .body .column." + hid + "." + pid).width(
            wid
          );
          if (
            $(this).data("head_isec") == false &&
            $(this).data("head_isstatic") == false
          ) {
            $(this)
              .addClass("collapse")
              .hide();
            $("." + value.table_name + " .body .column." + hid + "." + pid)
              .addClass("collapse")
              .hide();
          }
        });
        $(
          $("." + value.table_name + " .header .row")
            .get()
            .reverse()
        ).each(function() {
          var cls = "";
          $(this)
            .find(".column")
            .not(".collapse")
            .each(function() {
              var bextra = 0;
              if (cls == $(this).data("head_parent")) bextra = 2;
              else {
                bextra = 0;
                cls = $(this).data("head_parent");
              }
              if (cls != null) {
                var cur_width = $(this).width();
                var pre_width = $(this)
                  .parent()
                  .prev()
                  .find("." + cls)
                  .width();
                $(this)
                  .parent()
                  .prev()
                  .find("." + cls)
                  .width(cur_width + pre_width + bextra);
              }
            });
        });
        var twidth = 0;
        $(
          "." +
            value.table_name +
            " .header .row:eq(" +
            (value.headers.rows.length - 1) +
            ")"
        )
          .find(".column")
          .not(".collapse")
          .each(function() {
            twidth += $(this).width() + 2;
          });
        $("." + value.table_name + " .table").width(twidth);
      }
    });
    $(".ECicon")
      .off("click")
      .on("click", function() {
        var hxd = [$(this).parent().data("head_id")];
        var kvs = $(this).parent().data("head_id");
        $(this).parents('.table').find('.header .row').not(':first(.row)').not(':last(.row)').each(function(){
          hxd = [];
          $(this).find('.column').each(function(){
            if($(this).data("head_parent") == kvs){
              hxd.push($(this).data("head_id"));
            }
          });
        });
        var ptemp = this;
        if ($(this).hasClass("collapse")) {
          $(this).attr(
            "src",
            "https://www.iconsdb.com/icons/preview/white/minus-5-xxl.png"
          );
          $(this)
            .removeClass("collapse")
            .addClass("expand");
          $.each(hxd, function(i,e){
            $(ptemp)
            .parents(".table")
            .parent()
            .find(".column."+e+".collapse").show().removeClass("collapse").addClass("expand");
          });  
        } else if ($(this).hasClass("expand")) {
          $(this).attr(
            "src",
            "https://www.iconsdb.com/icons/preview/white/plus-5-xxl.png"
          );
          $(this)
            .removeClass("expand")
            .addClass("collapse");
          $.each(hxd, function(i,e){
            $(ptemp)
              .parents(".table")
              .parent()
              .find(".column."+e+".expand").hide().removeClass("expand").addClass("collapse");
          });
        }
        console.log($(this)
            .parents(".table").width());
        $(this)
            .parents(".table")
            .parent().find(".header .row").not(":last(.row)")
          .find(".column").width(0);
        $(
          $(this)
            .parents(".table")
            .parent().find(".header .row")
            .get()
            .reverse()
        ).each(function() {
          var cls = "";
          $(this)
            .find(".column")
            .not(".collapse")
            .each(function() {
              var bextra = 0;
              if (cls == $(this).data("head_parent")) bextra = 2;
              else {
                bextra = 0;
                cls = $(this).data("head_parent");
              }
              if (cls != null) {
                var cur_width = $(this).width();
                var pre_width = $(this)
                  .parent()
                  .prev()
                  .find("." + cls)
                  .width();
                $(this)
                  .parent()
                  .prev()
                  .find("." + cls)
                  .width(cur_width + pre_width + bextra);
              }
            });
        });
        var twidth = 0;
        $(this)
            .parents(".table")
            .parent().find(".header .row").last(".row")
          .find(".column")
          .not(".collapse")
          .each(function() {
            twidth += $(this).width() + 2;
          });
        $(this)
            .parents(".table").width(twidth);
      });
    return;
  };
})(jQuery);
