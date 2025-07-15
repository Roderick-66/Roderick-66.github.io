/*************************************************************************
 * Your custom JS file
 *************************************************************************/

(function () {
  "use strict";

  // The widget object
  var widgets;

  /**
   * Create the html elements for a masonry item.
   * @private
   * @param {string} caption - the caption of the item.
   * @param {string} imageSrc - the source URL of an image for the item.
   * @param {string} credit - the credit of the photo.
   * @returns {Object} - a jQuery DOM object.
   */
  function createMasonryItemHTML(caption, imageSrc, credit) {
    // This is a hack for Firefox, since Firefox does not respect the CSS "break-inside" and "page-break-inside"
    // We have to set the CSS display to "inline-flex" to prevent Firefox from breaking the figure in the middle
    // But, setting display to inline-flex will cause another problem in Chrome, where the columns will not be balanced
    // So we want Chrome to use "display: flex", and we want Firefox to use "display: inline-flex"
    var html = '<figure style="display: none;">';
    if (edaplotjs.Util.isFirefox()) {
      html = '<figure style="display: inline-flex">';
    }
    var figCaptionElement = '<figcaption>' + caption + '</figcaption>';
    if (typeof caption === "undefined" || caption == "") {
      figCaptionElement = "";
    }
    var figCreditElement = '<div>' + credit + '</div>';
    if (typeof credit === "undefined" || credit == "") {
      figCreditElement = "";
    }
    var figImageElement = '<img src="' + imageSrc + '">';
    if (typeof imageSrc === "undefined" || imageSrc == "") {
      figImageElement = "";
    }
    html += figImageElement + figCreditElement + figCaptionElement + '</figure>';
    var $html = $(html);
    $html.find("img").one("load", function () {
      // Only show the figure when the image is loaded
      $(this).parent().show();
    });
    return $html;
  }

  function createMasonry() {
    var data = [{
      "src": 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1820&amp;q=80',
      "credit": 'Credit: <a href="https://unsplash.com/@heftiba" target="_blank">Toa Heftiba</a>',
      "caption": 'Phasellus viverra nulla!'
    }, {
      "src": 'https://images.unsplash.com/photo-1590727264967-f26b2d31e3a1?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=792&amp;q=80',
      "credit": 'Credit: <a href="https://unsplash.com/@markusspiske" target="_blank">Markus Spiske</a>',
      "caption": 'Nam eget dui, etiam rhoncus, maecenas tempus'
    }, {
      "src": 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80',
      "credit": 'Credit: <a href="https://unsplash.com/@priscilladupreez" target="_blank">Priscilla Du Preez</a>',
      "caption": 'Nam quam nunc, blandit vel, luctus pulvinar!!!'
    }, {
      "src": 'https://images.unsplash.com/photo-1558023784-f8343393cb06?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=870&amp;q=80',
      "credit": 'Credit: <a href="https://unsplash.com/@frankielopez" target="_blank">Frankie Lopez</a>',
      "caption": 'Pellentesque habitant morbi!'
    }, {
      "src": 'https://images.unsplash.com/photo-1629036747901-6cad3758cd92?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=772&amp;q=80',
      "credit": 'Credit: <a href="https://unsplash.com/@zhugher" target="_blank">he zhu</a>',
      "caption": 'Phasellus blandit leo ut odio.'
    }, {
      "src": 'https://images.unsplash.com/photo-1477238134895-98438ad85c30?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2600&amp;q=80',
      "credit": 'Credit: <a href="https://unsplash.com/@cant89" target="_blank">Davide Cantelli</a>',
      "caption": 'Vestibulum ante ipsum primis'
    }, {
      "src": 'https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=870&amp;q=80',
      "credit": 'Credit: <a href="https://unsplash.com/@simonkaremann" target="_blank">Simon Karemann</a>',
      "caption": 'Aenean tellus metus, bibendum sed, posuere ac, mattis.'
    }, {
      "src": 'https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80',
      "credit": 'Credit: <a href="https://unsplash.com/@adrienolichon" target="_blank">Adrien Olichon</a>',
      "caption": 'Nunc nonummy metus vestibulum volutpat.'
    }, {
      "src": 'https://images.unsplash.com/photo-1594788094620-4579ad50c7fe?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1742&amp;q=80',
      "credit": 'Credit: <a href="https://unsplash.com/@mohammadshahhosseini" target="_blank">Mohammad Shahhosseini</a>',
      "caption": 'Sed fringilla mauris sit amet nibh.'
    }, {
      "src": 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1548&amp;q=80',
      "credit": 'Credit: <a href="https://unsplash.com/@domlafou" target="_blank">Dom Fou</a>',
      "caption": 'Vestibulum purus quam, scelerisque ut.'
    }];
    var $container = $("#masonry");
    for (var i = 0; i < data.length; i++) {
      var v = data[i];
      var $t = createMasonryItemHTML(v["caption"], v["src"], v["credit"]);
      $t.attr("id", "masonry-id-" + v["id"]);
      $container.append($t);
    }
  }

  function createShareButtonAndDialog() {
    var $share_url_copy_prompt = $("#share-url-copy-prompt");

    // Create the share dialog
    var $share_dialog = widgets.createCustomDialog({
      selector: "#share-dialog",
      full_width_button: true,
      action_text: "Copy to clipboard",
      close_dialog_on_action: false,
      show_cancel_btn: false,
      action_callback: function () {
        widgets.copyText("share-url");
        $share_url_copy_prompt.show();
      }
    });
    $share_dialog.on("dialogclose", function () {
      $share_url_copy_prompt.hide();
    });

    // Set the event of the share url textbox
    var $share_url = $("#share-url");
    $share_url.focus(function () {
      $(this).select();
    }).click(function () {
      $(this).select();
    }).mouseup(function (e) {
      e.preventDefault();
    });

    // Set the event of the share button
    $("#share-btn").on("click", function () {
      $share_dialog.dialog("open");
    });
  }

  function init() {
    // Create the widget object
    widgets = new edaplotjs.Widgets();

    // Set custom dropdown
    widgets.setCustomDropdown($("#custom-dropdown"), {
      items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      //init_index: 0, // You can use this parameter to set the initial item for displaying
      init_text: "Dropdown Menu (With JavaScript)",
      on_item_click_callback: function ($ui) {
        console.log($ui.text());
      }
    });
    widgets.setCustomDropdown($("#custom-dropdown-large"), {
      items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      //init_index: 0, // You can use this parameter to set the initial item for displaying
      init_text: "Large Dropdown Menu (With JavaScript)",
      on_item_click_callback: function ($ui) {
        console.log($ui.text());
      }
    });

    // Set custom radio
    $("input:radio[name='playback-speed']").on("change", function () {
      console.log($(this).val());
    });

    // Set custom dialog type 1
    var $dialog_1 = widgets.createCustomDialog({
      selector: "#dialog-1",
      full_width_button: true
    });
    $("#dialog-btn-1").on("click", function () {
      $dialog_1.dialog("open");
    });

    // Set custom dialog type 2
    var $dialog_2 = widgets.createCustomDialog({
      selector: "#dialog-2",
      action_callback: function () {
        console.log("confirm");
      },
      cancel_callback: function () {
        console.log("cancel");
      },
      show_close_button: false
    });
    $("#dialog-btn-2").on("click", function () {
      $dialog_2.dialog("open");
    });

    // Set custom dialog type 3
    var $dialog_3 = widgets.createCustomDialog({
      selector: "#dialog-3",
      parent: $(".content"),
      show_cancel_btn: false,
      cancel_callback: function () {
        console.log("cancel");
      },
    });
    $("#dialog-btn-3").on("click", function () {
      $dialog_3.dialog("open");
    });

    // Set custom dialog type 4
    var $dialog_4 = widgets.createCustomDialog({
      selector: "#dialog-4",
      action_text: "Action",
      reverse_button_positions: true,
      full_width_button: true,
      action_callback: function () {
        console.log("action");
      },
      cancel_text: "Back",
      cancel_callback: function () {
        console.log("back");
      }
    });
    $("#dialog-btn-4").on("click", function () {
      $dialog_4.dialog("open");
    });

    // Create the share button and dialog
    createShareButtonAndDialog();

    // Create the Unsplash photo picker
    // To make this work, you need to code a backend API to serve Unsplash photos
    // For python flask, an example is "https://github.com/yenchiah/COCTEAU-TUD/blob/main/back-end/www/controllers/photos_controller.py"
    // You need to change photoURL your API URL, such as "http://localhost:5000/photos/random?count=30"
    var photoURL = undefined; // for demo, the photo picker will load "file/photo.json"
    var $photoPickerDialog = widgets.createUnsplashPhotoPickerDialog("dialog-photo-picker", undefined, photoURL, function (d) {
      $("#vision-image").data("raw", d).prop("src", d["urls"]["regular"]);
    });
    $("#vision-image-frame").on("click", function () {
      $photoPickerDialog.dialog("open");
    });

    // Create the masonry
    createMasonry();

    // Create the gallery
    // In practice, these images urls may come from your server via http ajax requests.
    var $gallery = $("#gallery");
    for (var i = 0; i < 8; i++) {
      var item = '<a href="javascript:void(0)" class="flex-column">' +
        '<img src="img/dummay-img.png">' +
        '<div>Image Caption</div>' +
        '</a>';
      $gallery.append($(item));
    }

    // Create custom tabs
    widgets.createCustomTab({
      selector: "#custom-tab"
    });

    // Set the custom legend
    widgets.setCustomLegend($("#custom-legend"));
  }

  $(init);
})();

$(document).ready(function() {
  // Home button scrolls to top
  $(document).on('click', 'a[href="#top"]', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // Cart buttons open cart modal
  $('#floating-cart-btn, #nav-cart-btn').on('click', function(e) {
    e.preventDefault();
    document.getElementById('cart-modal').style.display = 'flex';
  });
  $('#cart-modal').on('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });
  // View Details buttons open product modal
  $(document).on('click', '.view-details-btn', function(e) {
    e.preventDefault();
    document.getElementById('product-details-modal').style.display = 'flex';
  });
  $('#product-details-modal').on('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });
  // Add to Cart in product modal opens cart modal
  $('#product-details-modal .custom-button-flat').on('click', function(e) {
    e.preventDefault();
    document.getElementById('product-details-modal').style.display = 'none';
    document.getElementById('cart-modal').style.display = 'flex';
  });
  // Screenshot modal logic
  $(document).on('click', '.screenshot-thumb', function() {
    var src = $(this).attr('src');
    $('#screenshot-modal-img').attr('src', src);
    $('#screenshot-modal').css('display', 'flex');
  });
  $('#screenshot-modal-close, #screenshot-modal').on('click', function(e) {
    if (e.target === this || e.target.id === 'screenshot-modal-close') {
      $('#screenshot-modal').css('display', 'none');
      $('#screenshot-modal-img').attr('src', '');
    }
  });

  // --- Kampus Mart Search Functionality ---
  function filterProducts(searchTerm) {
    var term = searchTerm.trim().toLowerCase();
    var $cards = $("section:contains('Browse All Products') .product-card");
    var anyVisible = false;
    $cards.each(function() {
      var $card = $(this);
      var name = $card.find('h3').text().toLowerCase();
      var desc = $card.find('.product-desc').text().toLowerCase();
      var owner = $card.find('.product-owner').text().toLowerCase();
      if (!term || name.includes(term) || desc.includes(term) || owner.includes(term)) {
        $card.show();
        anyVisible = true;
      } else {
        $card.hide();
      }
    });
    // Show/hide no results message
    if (!$('#no-search-results').length) {
      $("section:contains('Browse All Products')").append('<div id="no-search-results" style="display:none; text-align:center; color:#b71c1c; font-weight:600; margin-top:18px;">No products found.</div>');
    }
    if (!anyVisible) {
      $('#no-search-results').show();
    } else {
      $('#no-search-results').hide();
    }
  }

  $('#hero-search-form, #browse-search-form').on('submit', function(e) {
    e.preventDefault();
    var val = $(this).find('input[type="text"]').val();
    filterProducts(val);
  });
  // Optional: live filtering as user types in either box
  $('#hero-search-input, #browse-search-input').on('input', function() {
    var val = $(this).val();
    filterProducts(val);
  });

  // Popup feature for main content
  var contentSelector = '.content > .content-table, section > div, .info-container';
  var $mainContent = $(contentSelector).first();
  if ($mainContent.length) {
    var $popupBtn = $('<button class="popup-content-btn" style="position:absolute;top:10px;right:10px;z-index:10;padding:8px 18px;background:#1976d2;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600;">Show as Popup</button>');
    $mainContent.css('position', 'relative').prepend($popupBtn);
    $popupBtn.on('click', function() {
      showContentPopup($mainContent.html());
    });
  }

  // Add modal HTML to body if not present
  if ($('#content-popup-modal').length === 0) {
    $('body').append('<div id="content-popup-modal" style="display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.55);z-index:9999;align-items:center;justify-content:center;"><div id="content-popup-modal-inner" style="background:#fff;border-radius:14px;max-width:90vw;max-height:90vh;overflow:auto;box-shadow:0 4px 32px rgba(0,0,0,0.18);padding:32px 28px;position:relative;"><button id="close-content-popup" style="position:absolute;top:12px;right:18px;background:none;border:none;font-size:2rem;color:#888;cursor:pointer;">&times;</button><div id="content-popup-body"></div></div></div>');
  }

  // Close modal handler
  $(document).on('click', '#close-content-popup', function() {
    $('#content-popup-modal').hide();
  });

  // Show popup function
  window.showContentPopup = function(contentHtml) {
    $('#content-popup-body').html(contentHtml);
    $('#content-popup-modal').css('display', 'flex');
  };
});