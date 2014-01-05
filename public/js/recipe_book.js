var recipe_book={init:function(){recipe_book.events(),recipe_book.decipher_hash()},hash_per_page:null,decipher_hash:function(){var a=document.location.hash;return""==a?!1:(a=a.slice(1).split("|"),$("#name-search input").val(a[0]),$("#min-level").val(a[2]),$("#max-level").val(a[3]),$("#order-by").val(a[5]),recipe_book.hash_per_page=a[4],$("#class-search button").data("class")==a[1]?recipe_book.search():$("#class-search [data-class="+a[1]+"]").trigger("click"),recipe_book.hash_per_page=null,!0)},events:function(){$("#name-search input").keyup(function(a){return 13!=a.which?!0:(1==recipe_book.check_input_length()&&recipe_book.search(),void 0)}),$("#name-search button").click(function(){1==recipe_book.check_input_length()&&recipe_book.search()}),$("#order-by").change(function(){return recipe_book.search()}),$("#min-level, #max-level").change(function(){var a=$(this),b=parseInt(a.attr("min")),c=parseInt(a.attr("max")),d=parseInt(a.val());if(a.is("#max-level")){var e=parseInt($("#min-level").val());e>d&&(a.val(e),d=e)}else{var f=parseInt($("#max-level").val());d>f&&(a.val(f),d=f)}b>d&&(d=b),d>c&&(d=c),a.val(d),recipe_book.search()}),$("#class-search li a").click(function(a){a.preventDefault();var b=$(this),c=$("#class-search button"),d=b.data("class"),e=$("img",b),f=c.data("class");old_img=$("img",c),d!=f&&(e.clone().insertAfter(old_img),old_img.remove(),c.data("class",d),recipe_book.search())}),$(document).on("change","#per_page",function(){recipe_book.search()}),$("#save-setup").click(function(a){a.preventDefault(),global.set_cookie("previous_recipe_load",document.location.hash),global.noty({type:"success",text:"Setup Saved"})}),$("#load-setup").click(function(a){a.preventDefault(),global.noty({type:"info",text:"Loading Setup"}),document.location.hash=decodeURIComponent(global.get_cookie("previous_recipe_load")),recipe_book.decipher_hash(),recipe_book.search()})},check_input_length:function(){var a=$("#name-search input").val();return $("#name-search").removeClass("has-error"),a.length<3&&a.length>0?($("#name-search").addClass("has-error"),global.noty({type:"error",text:"Minimum 3 letter search limit"}),!1):!0},search:function(a){var b=$("#name-search input").val(),c=$("#min-level").val(),d=$("#max-level").val(),e=$("#class-search button").data("class"),f=$("#per_page").val(),g=$("#order-by").val();null!=recipe_book.hash_per_page&&(f=recipe_book.hash_per_page),"undefined"==typeof a&&(a=""),document.location.hash=[b,e,c,d,f,g].join("|"),$.ajax({url:"/recipes/search"+a,type:"post",dataType:"json",data:{name:b,min:c,max:d,"class":e,per_page:f,sorting:g},beforeSend:function(){recipe_book.disable(),global.noty({type:"information",text:"Searching Recipe Book"})},success:function(a){$("#recipe-book tbody").html(a.tbody),$("#recipe-book tfoot").html(a.tfoot),recipe_book.table_events()},complete:function(){recipe_book.enable()}})},table_events:function(){$("#recipe-book tfoot .pagination a").click(function(a){a.preventDefault(),recipe_book.search(a.target.search)}),"undefined"!=typeof initXIVDBTooltips&&initXIVDBTooltips()},disable:function(){$("#name-search input, #name-search button, #order-by, #min-level, #max-level, #class-search button").addClass("disabled"),$("#name-search input, #order-by, #min-level, #max-level").prop("disabled",!0)},enable:function(){$("#name-search input, #name-search button, #order-by, #min-level, #max-level, #class-search button").removeClass("disabled"),$("#name-search input, #order-by, #min-level, #max-level").prop("disabled",!1)}};$(recipe_book.init);