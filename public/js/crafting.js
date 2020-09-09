var crafting={init:function(){$("#toggle-crystals").click(crafting.toggle_crystals),$("#toggle-crystals").trigger("click"),$("#toggle-sort").on("click",crafting.toggle_sort),$("#toggle-pr-sort").on("click",crafting.toggle_pr_sort),$("#obtain-these-items .collapsible").click((function(){$(this).find("i").toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up"),$(this).closest("tbody").find("tr:not(:first-child)").toggleClass("hidden")})),$(".needed input").change((function(){var e=$(this);crafting.recalculateAll(),e.closest("tr").find(".total").html(e.val())})),$("input.obtained").change((function(){return crafting.recalculateAll()})),$(".obtained-ok").click((function(){var e=$(this).closest("tr"),t=$("td.total",e).html();$("input.obtained",e).val(t).trigger("change")})),$("#clear-localstorage").click(crafting.clear_localstorage),crafting.set_localstorage_id(),crafting.restore_localstorage(),crafting.init_reagents(),crafting.recalculateAll(),$("#map_all, #map_remaining").click((function(e){e.preventDefault()})),$("#csv_download").click((function(e){e.preventDefault();var t=[["Item","iLevel","Yields","Needed","Purchase"]];$("tr.reagent").each((function(){var e=[],a=$(this);e.push($.trim(a.find("a.name").text())),e.push(a.data("ilvl")||a.find(".ilvl").text().replace(/\s|\n/gi,"")||"-"),e.push(a.data("yields")),e.push(a.find(".total").text()),e.push(a.find(".vendors").length?a.find(".vendors").text().replace(/\s|\n/gi,"")+" gil":""),t.push(e)}));var a=$(".csv-filename").text().trim()+" "+$(".csv-filename + h2").text().trim();global.exportToCsv(a+".csv",t)}))},toggle_pr_sort:function(){var e=$(this),t=e.data("mode")||"Natural",a="Level"==t?"Class":"Class"==t?"Needed":"Level",n=$("tbody#PreRequisiteCrafting-section");e.data("mode",a).html(a+" Sort"),"Level"==a?n.find("tr.reagent").sort((function(e,t){return $(e).data("ilvl")>$(t).data("ilvl")?1:-1})).appendTo(n):"Class"==a?n.find("tr.reagent").sort((function(e,t){return $(e).data("ilvl")<$(t).data("ilvl")?1:-1})).sort((function(e,t){return $(e).data("recipe-class")>$(t).data("recipe-class")?1:-1})).appendTo(n):"Needed"==a&&n.find("tr.reagent").sort((function(e,t){return parseInt($(e).find(".needed").text())<parseInt($(t).find(".needed").text())?1:-1})).appendTo(n)},toggle_sort:function(){var e=$(this),t="Category"==(e.data("mode")||"Category")?"Location":"Category",a=$("tbody#Gathered-section");if(e.data("mode",t).html(t+" Sort"),"Category"==t)a.find("tr.reagent").sort((function(e,t){return $(e).data("item-category")+$(e).data("item-name")>$(t).data("item-category")+$(t).data("item-name")?1:-1})).appendTo(a);else if("Location"==t){var n={shroud:{},thanalan:{},lanoscea:{},misc:{none:[]}};a.find("tr.reagent").each((function(){var e=$(this),t=e.data("item-location");t.match("Shroud - ")?(n.shroud[t]=n.shroud[t]||[],n.shroud[t].push(e)):t.match("Thanalan - ")?(n.thanalan[t]=n.thanalan[t]||[],n.thanalan[t].push(e)):t.match("La Noscea - ")?(n.lanoscea[t]=n.lanoscea[t]||[],n.lanoscea[t].push(e)):""==t?n.misc.none.push(e):(n.misc[t]=n.misc[t]||[],n.misc[t].push(e))})),$.each(["shroud","thanalan","lanoscea","misc"],(function(e,t){var i=n[t],r=[];for(k in i)i.hasOwnProperty(k)&&r.push(k);r.sort(),$.each(r,(function(e,t){$.each(i[t],(function(e,t){$.each(t,(function(e,t){$(t).appendTo(a)}))}))}))}))}a.find("tr.reagent.success").each((function(){$(this).appendTo(a)}))},toggle_crystals:function(){var e=$(this),t=e.closest("th").attr("colspan"),a=e.closest("tr");if(e.hasClass("off"))a.next("tr.crystals").remove(),$("[data-item-category=Crystal]").each((function(){$(this).show()})),e.removeClass("off"),localStorage.removeItem("config:toggle-crystals");else{var n=$("<th>",{colspan:t,class:"text-center"}),i=$("<tr>",{class:"crystals hidden"}).append(n);a.after(i),$("[data-item-category=Crystal]").each((function(){var e=$(this),t=e.data("itemId"),a=e.find(".name").first().html(),i=e.find("img").first().clone(!0,!0),r=parseInt(e.find(".total").html()),s=0==r?"success":"primary";e.hide(),i.removeClass("margin-right");var l=$("<span>",{id:"crystal-"+t,class:"crystal-container",html:'<span class="label label-'+s+'">'+r+"</span>",rel:"tooltip",title:a});l.tooltip(global.tooltip_options),l.append(i),n.append(l)})),i.removeClass("hidden"),e.addClass("off"),localStorage.setItem("config:toggle-crystals","off")}},localstorage_id:null,set_localstorage_id:function(){crafting.localstorage_id="page:"+encodeURIComponent(window.location.pathname),null!=crafting.localstorage_id.match("from-list")&&(crafting.localstorage_id=$("#CraftingList-section").find(".reagent").map((function(){return $(this).data("itemId")+"_"+$(this).find(".needed input").val()})).get().sort().join("|"))},clear_localstorage:function(e){e.preventDefault(),localStorage.removeItem(crafting.localstorage_id),location.reload()},restore_localstorage:function(){var e=JSON.parse(localStorage.getItem(crafting.localstorage_id));null!==e&&($(".reagent").not(".exempt").each((function(){var t=$(this),a=t.data("itemId"),n=t.find("input.obtained");void 0!==e.progress.hasOwnProperty("item"+a)&&e.progress["item"+a]>0&&n.val(e.progress["item"+a])})),$(".reagent.exempt").each((function(){var t=$(this),a=t.data("itemId"),n=t.find(".needed input"),i=t.find("input.obtained");void 0!==e.contents.hasOwnProperty("needed"+a)&&e.contents["needed"+a]>0&&n.val(e.contents["needed"+a]),void 0!==e.contents.hasOwnProperty("item"+a)&&e.contents["item"+a]>0&&i.val(e.contents["item"+a])})))},store_localstorage:function(){var e={progress:{},contents:{}};$(".reagent").not(".exempt").each((function(){var t=$(this),a=t.data("itemId"),n=t.find("input.obtained"),i=parseInt(n.val());i>0&&(e.progress["item"+a]=i)})),$(".reagent.exempt").each((function(){var t=$(this),a=t.data("itemId"),n=t.find(".needed input"),i=t.find("input.obtained"),r=parseInt(n.val()),s=parseInt(i.val());r>0&&(e.contents["needed"+a]=r),s>0&&(e.contents["item"+a]=s)})),localStorage.setItem(crafting.localstorage_id,JSON.stringify(e))},reagents:[],init_reagents:function(){$(".reagent").each((function(){var e=$(this),t={name:e.find('a[href^="http"]').text().trim(),exempt:e.hasClass("exempt"),item_id:e.data("itemId"),yields:e.data("yields"),reagents:[],needed:0,obtained:0,total:0,remainder:0,elements:{row:e,needed:$("td.needed span",e).length>0?$("td.needed span",e):$("td.needed input",e),obtained:$("input.obtained",e),total:$("td.total",e)}};if(requires=e.data("requires").split("&"),t.exempt&&$("tr.reagent:not(.exempt)[data-item-id="+t.item_id+"]").length>0&&(requires[requires.length]="1x"+t.item_id),1==requires.length&&""==requires[0])t.reagents=null;else for(var a=0;a<requires.length;a++){var n=requires[a].split("x");t.item_id!=n[1]&&(t.reagents[t.reagents.length]={item_id:n[1],quantity:parseInt(n[0])})}crafting.reagents[crafting.reagents.length]=t})),$.each($("#PreRequisiteCrafting-section .reagent").get().reverse(),(function(){for(var e=$(this),t=e.data("requires").split("&"),a=0;a<t.length;a++){var n=t[a].split("x"),i=$("#PreRequisiteCrafting-section .reagent[data-item-id="+n[1]+"]");i.length>0&&i.insertBefore(e)}}))},recalculateAll:function(){for(var e=0;e<crafting.reagents.length;e++){if((a=crafting.reagents[e]).obtained=parseInt(a.elements.obtained.val()),a.total=0,a.remainder=0,1==a.exempt){a.needed=parseInt(a.elements.needed.val()),a.elements.obtained.attr("max",a.needed),a.elements.row[(a.needed-a.obtained==0?"add":"remove")+"Class"]("success");var t=Math.ceil(Math.max(a.needed-a.obtained,0)/a.yields);crafting.oven(a,t)}else a.needed=0}for(e=0;e<crafting.reagents.length;e++){if(1!=(a=crafting.reagents[e]).exempt&&null!=a.reagents){t=Math.ceil(Math.min(0-a.obtained,0)/a.yields);crafting.oven(a,t)}}for(e=0;e<crafting.reagents.length;e++){var a;if(1!=(a=crafting.reagents[e]).exempt){if(a.needed=a.needed-a.obtained,a.needed<0){a.obtained+=a.needed;var n=Math.ceil(a.obtained/a.yields)*a.yields;a.elements.obtained.val(n<0?0:n),a.needed=0}var i=Math.ceil(a.needed/a.yields)*a.yields,r=Math.ceil(a.total/a.yields)*a.yields;a.elements.needed.html(i),a.elements.obtained.attr("max",r),a.elements.total.html(a.total<0?0:Math.ceil(a.total/a.yields)*a.yields),a.elements.row.toggleClass("success",0==a.needed)}}crafting.store_localstorage(),$("tr.crystals").length>0&&$("[data-item-category=Crystal]").each((function(){var e=$(this),t=e.data("itemId"),a=parseInt(e.find(".total").html()),n=$("#crystal-"+t).find(".label");n.html(a),n.toggleClass("label-primary",0!=a),n.toggleClass("label-success",0==a)})),$("tr.reagent.success").each((function(){var e=$(this),t=e.closest("tbody");e.appendTo(t)}))},oven:function(e,t){if(null!=e.reagents)e:for(var a=0;a<e.reagents.length;a++)for(var n=e.reagents[a],i=0;i<crafting.reagents.length;i++){var r=crafting.reagents[i];if(r.item_id==n.item_id){var s=t*n.quantity;if(r.needed+=s,r.total+=s,r.remainder>0){var l=Math.max(0,Math.min(s,r.remainder));s-=l,r.remainder-=l}var o=Math[s<0?"floor":"ceil"](s/r.yields);r.remainder+=o*r.yields-s,crafting.oven(r,o);continue e}}}};$(crafting.init);