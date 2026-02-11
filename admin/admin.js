const URL = "https://script.google.com/macros/s/AKfycbzl7B4gumTYYNhH91qkUsZyKlYG91w7BynHoXZR7b1MNmRv9Hj1qRAdynu4m3-koh-Auw/exec";

function save() {

  const token = localStorage.getItem("adminToken");

  if (!token) {
    alert("Not authorized");
    window.location.href = "login.html";
    return;
  }

  const vehicleNo = vehicle.value.toUpperCase();
  const mobileNo = mobile.value;

  fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      action: "save",
      token: token,
      vehicle: vehicleNo,
      name: name.value,
      mobile: mobileNo,
      model: model.value,
      details: details.value,
      amount: amount.value
    })
  })
  .then(res => res.json())
  .then(response => {

    if (response.status !== "success") {
      alert("Session expired. Please login again.");
      localStorage.removeItem("adminToken");
      window.location.href = "login.html";
      return;
    }

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

