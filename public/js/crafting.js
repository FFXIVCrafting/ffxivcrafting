var crafting={init:function(){crafting.events();crafting_tour.init()},events:function(){$("#self_sufficient_switch").change(function(){$(this).closest("form").submit()});$("#obtain-these-items .collapse").click(function(){var c=$(this);c.toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");var b=$(this).closest("tbody");var a=b.find("tr:not(:first-child)");a.toggleClass("hidden")});$(".needed input").each(function(){var a=$(this);a.data("amount",parseInt(a.val()))});$(".needed input").change(function(){var b=$(this);var a=parseInt(b.val()),c=b.data("amount");var e=a-c;if(e==0){return}b.data("amount",a);var d=b.closest("tr");crafting.change_reagents(b.closest("tr"),e);d.find("input.obtained").trigger("change")});$("input.obtained").change(function(){var c=$(this),d=c.closest("tr"),b=d.find(".needed input"),a=b.val();if(b.length==0){b=d.find(".needed span");a=b.html()}d[(parseInt(c.val())>=parseInt(a)?"add":"remove")+"Class"]("success")});$(".obtained-ok").click(function(){var d=$(this).closest("tr"),b=d.find(".needed input"),a=b.val(),c=d.find("input.obtained");if(b.length==0){b=d.find(".needed span");a=b.html()}c.val(a).trigger("change")})},change_reagents:function(h,b){var d=h.data("requires"),m=h.data("itemId");if(typeof(d)==="undefined"||d==""){return}var n=d.split("&");if(h.hasClass("exempt")&&$("tr.reagent:not(.exempt)[data-item-id="+h.data("itemId")+"]").length>0){n[n.length]="1x"+m}for(var e=0;e<n.length;e++){var l=n[e].split("x"),c=l[0],k=l[1];var g=$("tr.reagent:not(.exempt)[data-item-id="+k+"]"),a=g.find(".needed span"),f=parseInt(a.html()),j=b*c;a.html(f+j);if(k!=m){crafting.change_reagents(g,j)}g.find("input.obtained").trigger("change")}}};var crafting_tour={tour:null,first_run:true,init:function(){var a=$("#start_tour");crafting_tour.tour=new Tour({orphan:true,onStart:function(){return a.addClass("disabled",true)},onEnd:function(){return a.removeClass("disabled",true)}});a.click(function(b){b.preventDefault();if($("#toggle-slim").bootstrapSwitch("status")){$("#toggle-slim").bootstrapSwitch("setState",false)}if(crafting_tour.first_run==true){crafting_tour.build()}if($(this).hasClass("disabled")){return}crafting_tour.tour.restart()})},build:function(){crafting_tour.tour.addSteps([{element:"#CraftingList-section",title:"Recipe List",content:"The list at the bottom is your official Recipe List.  You will be making these items.",placement:"top"},{element:"#Gathered-section tr:first-child",title:"Gathered Section",content:"Items you can gather with MIN, BTN or FSH will appear in the Gathered Section.",placement:"bottom"},{element:"#Bought-section tr:first-child",title:"Bought Section",content:"Items you cannot gather will be thrown into the Bought Section.",placement:"bottom"},{element:"#Other-section tr:first-child",title:"Other Section",content:"Items that cannot be bought or gathered show up in the Other Section.  Most likely these will involve monster drops.",placement:"bottom"},{element:"#PreRequisiteCrafting-section tr:first-child",title:"Pre-Requisite Crafting",content:"Why buy what you can craft?  The Crafted Section contains items necessary for your main recipes to finish.  The previous sections will already contain the sub items required.",placement:"bottom"},{element:"#self-sufficient-form",title:"Self Sufficient",content:"By default it assumes you want to be Self Sufficient.  Turning this option off will eliminate the Gathering and Crafting aspect and appropriately force the items into either Bought or Other.",placement:"top"},{element:"#leveling-information",title:"Leveling Information",content:"Pay attention to the Leveling Information box as it will give you a heads up as to what your next quest turn ins will require.",placement:"top"}]);crafting_tour.first_run=false}};$(crafting.init);