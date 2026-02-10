const URL = "PASTE_YOUR_WEB_APP_URL_HERE"; // Google Apps Script Web App URL

function save() {
  const vehicleNo = vehicle.value.toUpperCase();
  const mobileNo = mobile.value;

  fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      vehicle: vehicleNo,
      name: name.value,
      mobile: mobileNo,
      model: model.value,
      details: details.value,
      amount: amount.value
    })
  })
  .then(res => res.json())
  .then(() => {

    const message = `Hello 👋

Your Royal Enfield service is completed 🏍️

Check your service details here:
https://yourwebsite.com/service.html?vehicle=${vehicleNo}

Thank you 🙏`;

    const whatsappURL = `https://wa.me/91${mobileNo}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");

    alert("Service saved & WhatsApp link opened!");
  });
}
