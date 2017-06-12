if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
$(function() {
  window.onload = function() {
    if (localStorage.getItem("hasCodeRunBefore") === null) {
      // Your code here.

      localStorage.setItem("hasCodeRunBefore", true);
    }
  }
  $('.categories ul li a:not(.header)').on('click', function(e) {
    $(".categories>ul").animate({ "left": "-250px" }, 0);
    $(".categories>ul").removeClass("slide0");
    $(".categoriesback").addClass("hide");
    $(".loadingbar").show().animate({ 'width': '70%' }, 700);
    e.preventDefault();
    var page = $(this).data('category');
    // location.href += (location.search.length ? '&' : '?') + 'category=' + page;
    // window.history.pushState({}, 'Title', '?category=' + page);
    window.location.hash = '?category=' + page;
    // checknull();
  });
  $.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
      return null;
    } else {
      return results[1] || 0;
    }
  }

  $(window).on('hashchange', function() {
    checknull();
    if ($.urlParam('category') == null) {
      location.reload();
      $("#categories, .my-slider, .categoriesDesk").removeAttr("style");
    } else if ($.urlParam('category') !== null) {
      $("#categories, .my-slider").css("position", "fixed");
      $(".categoriesDesk").css("margin-top", "57px");
    }
  });
  if ($.urlParam('category') !== null) {
    $("#categories, .my-slider").css("position", "fixed");
    $(".categoriesDesk").css("margin-top", "57px");
  }
  // var currentPage = window.location.href;
  // setInterval(function() {
  //   if (currentPage != window.location.href) {
  //     currentPage = window.location.href;
  //     updateurl();
  //   }
  // }, 100);
  // for(i=0; i<=$("[data-category]"))

  function updateurl() {

    var urlcatogery = $.urlParam('category');
    console.log(urlcatogery);
    $(".categories ul li a").removeClass("categoryactive");
    $(".categories ul li a[data-category=" + urlcatogery + "]").addClass("categoryactive");
    // $(".categories ul li").show();
    // $(".categories ul li a:not(.categoryactive)").parent().hide();
    $(".categories>ul li").removeClass("makeliabsolute").removeAttr("style");
    $(".categoriesback").mouseenter(function() {
      $(".categories>ul").removeAttr("style").addClass("slide0");
    });
    $(".categories>ul").mouseleave(function() {
      $(".categories>ul").removeClass("slide0");
    });
    $(".categoryactive").parent().addClass("makeliabsolute").animate({ "top": "0px" }, 700, function() {
      $(".categoriesback").removeClass("hide");
    });
    $(".categories>ul").addClass("categoriesclicked");
    // console.log($.urlParam('category'));
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        myObj = JSON.parse(this.responseText);
        $(".container0>div").addClass("hide");
        $(".catogryData").empty().removeClass("hide");
        for (i = 0; i < myObj.length; i++) {
          $(".catogryData").append("<div class='box proGrid'></div>");
          $(".catogryData .box:nth-child(" + (i + 1) + ")").append("<div class='rank'>#" + (i + 1) + "</div>").append("<div class='imgdis'><img class='productimg' src='imgs/" + urlcatogery + "/" + myObj[i].image + "'/><div class='discription'></div></div>").append("<div class='name'>" + myObj[i].name + "</div>").append("<span class='fa fa-inr' aria-hidden='true'> </span><div class='price'>" + myObj[i].price + "</div>");
          if (i == myObj.length - 1) {
            $('.catogryData').wallyti();
          }
        }
        $(".loader").addClass("hide");
        $(".loadingbar").finish().animate({ 'width': '100%' }, 100, function() {
          $(".loadingbar").hide().animate({ 'width': '0%' }, 0);
        });
      } else {
        $(".loader").removeClass("hide");

      }
    };
    xmlhttp.open("GET", "data/" + urlcatogery + ".json", true);
    xmlhttp.send();
    $(".slider_div").addClass("slidermin");
    $(".carousel-control .fa").addClass("hide");
  }

  function checknull() {
    if ($.urlParam('category') !== null) {
      updateurl();
    }
  }
  checknull();

  // $.urlParam = function(name) {
  //   var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  //   return results[1] || 0;
  // }


  var windowheight = window.innerHeight;
  var windowwidth = window.innerWidth;
  $(".rippler").rippler({
    effectClass: 'rippler-effect',
    effectSize: 16, // Default size (width & height)
    addElement: 'div', // e.g. 'svg'(feature)
    duration: 250
  });
  $(".categories ul li a").click(function() {
    return false;
  });
  $("#nav ul li a").click(function() {

    $("#nav ul li a").removeClass("active");
    $(this).addClass("active");
  });
  $(".left").click(function() {
    $("#buyCarousel").carousel("prev");
  });
  $(".right").click(function() {
    $("#buyCarousel").carousel("next");
  });
  $('.productC').slick();
  if (windowwidth <= 490) {
    $(".container0").removeClass("container0desk");
  }
  var container0deskwidth = windowwidth - 295;
  $('.container0desk').css("width", container0deskwidth + 'px');

  $(window).resize(function() {
    var resizewindowheight = window.innerHeight;
    var resizewindowwidth = window.innerWidth;
    if (resizewindowwidth > 490) {
      $(".container0").addClass("container0desk");

    }
    if (resizewindowwidth <= 490) {
      $(".container0").removeClass("container0desk");
      $(".container0").css("width", "100%");
    }
    $('.container0desk').css("width", resizewindowwidth - 295 + 'px');
  });

  // var categoriesbackcolor = ['#34495e', '#e67e22', '#2ecc71', '#f1c40f', '#7f8c8d', '#c0392b', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#ecf0f1', '#1abc9c'];
  // console.log(categoriesbackcolor.length);
  // for (i = 1; i <= 12; i++) {

  //   $(".categories ul li." + i + " a span").css("background", categoriesbackcolor[i - 1]);
  //   console.log($(".categories ul li." + i + " a span"));
  // }
  $(window).scroll(function() {
    if ($(this).scrollTop() > 299 && $.urlParam('category') == null) {
      $('.categories').addClass('scrollfix');
      $('.my-slider').addClass('scrollfixslider');
      $('.container0').addClass('container0scrollfix');
    } else {
      $('.categories').removeClass("scrollfix");
      $('.my-slider').removeClass('scrollfixslider');
      $('.container0').removeClass('container0scrollfix');
    }
  });
});