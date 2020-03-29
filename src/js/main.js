function copyToClipboard() {
  var copyText = document.getElementById("couponCode");
  // copyText.select();
  // copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  // alert("Copied the text: " + copyText.value);
  alert("Copied the text: " + "MARCH2020");
}

var app = new Vue({
  el: '#infoModal',
  data: {
    "stores": [
      {
        "name": "Target",
        "logo": "./dist/assets/target-logo.svg",
        "alt": "Target logo",
        "coupon": "MARCH2020"
      }
    ]
  }
}); // Vue