function smoothScrollTo(o,t){if(""===o)return!1;$(o).length>0&&(void 0!==t&&(t.preventDefault(),history.pushState(null,null,$(t.target).attr("href"))),$("html, body").animate({scrollTop:$(o).offset().top-20},350))}$(document).ready(function(){$(".js-smooth-scroll").on("click",function(o){smoothScrollTo(this.hash,o)})}),$(window).on("load",function(){smoothScrollTo(window.location.hash)});