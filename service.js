// Replace with your Web App URL from Google Apps Script
const API_URL = 'YOUR_WEB_APP_URL_HERE';

async function search(vehicleNumber) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = ''; // clear previous results

  if (!vehicleNumber) {
    alert('Please enter a vehicle number');
    return;
  }

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // Find matching vehicle(s)
    const filtered = data.filter(v => v.vehicle.toLowerCase() === vehicleNumber.toLowerCase());

    if (filtered.length === 0) {
      resultDiv.innerHTML = '<p style="text-align:center; color:white;">No service found for this vehicle.</p>';
      return;
    }

    filtered.forEach(v => {
      const card = document.createElement('div');
      card.className = 'service-card';

      let servicesHtml = '';
      let totalAmount = 0;
      v.services.forEach(s => {
        servicesHtml += `<p>${s.name} - ₹${s.amount}</p>`;
        totalAmount += Number(s.amount);
      });

      card.innerHTML = `
        <h3>Service Receipt</h3>
        <p><strong>Customer:</strong> ${v.customer}</p>
        <p><strong>Vehicle Number:</strong> ${v.vehicle}</p>
        <hr>
        ${servicesHtml}
        <p class="total">Total: ₹${totalAmount}</p>
      `;

      resultDiv.appendChild(card);
    });

  } catch (error) {
    console.error('Error fetching service data:', error);
    resultDiv.innerHTML = '<p style="text-align:center; color:white;">Error fetching service data.</p>';
  }
}
