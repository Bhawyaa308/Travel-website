// ===== PACKAGE DATA =====
const packagePrices = {
  "Beach Bliss (Goa)": 18999,
  "Himalayan Escape (Manali)": 24499,
  "Desert Dunes (Jaisalmer)": 14299,
  "Backwater Bliss (Alleppey)": 20999
};

// ===== MAIN FUNCTION =====
function calculateTotal() {
  const startInput = document.getElementById("start").value;
  const endInput = document.getElementById("end").value;
  const pkg = document.getElementById("package").value;
  const guests = parseInt(document.getElementById("guests").value) || 1;
  const promo = document.getElementById("promo").value.trim().toUpperCase();
  const totalDisplay = document.getElementById("totalDisplay");

  // Validate mandatory fields
  if (!pkg || !startInput || !endInput) {
    totalDisplay.textContent = "Total: ₹0";
    return;
  }

  const start = new Date(startInput);
  const end = new Date(endInput);

  // Validate date order
  if (end <= start) {
    totalDisplay.textContent = "Invalid Dates!";
    return;
  }

  // ===== CALCULATIONS =====
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  let basePrice = packagePrices[pkg] || 0;
  let total = basePrice * nights;

  // --- SEASON MULTIPLIER ---
  const month = start.getMonth(); // 0 = January
  let seasonMultiplier = 1.0;
  let seasonText = "Normal Season";

  if ((month >= 3 && month <= 5) || (month === 10 || month === 11)) {
    seasonMultiplier = 1.25; // Apr–Jun, Nov–Dec → Peak
    seasonText = "Peak Season (25% higher)";
  } else if (month >= 6 && month <= 8) {
    seasonMultiplier = 0.85; // Jul–Sep → Off-season
    seasonText = "Off Season (15% lower)";
  }

  total *= seasonMultiplier;

  // --- GUEST MULTIPLIER ---
  if (guests > 2) {
    total *= 1.2; // 20% extra for >2 guests
  }

  // --- PROMO CODE DISCOUNT ---
  switch (promo) {
    case "EARLYBIRD":
      total *= 0.9; // 10% off
      break;
    case "FESTIVE":
      total *= 0.85; // 15% off
      break;
    default:
      // no discount
      break;
  }

  // --- DISPLAY FINAL PRICE ---
  totalDisplay.textContent = `Total: ₹${Math.round(total).toLocaleString()} (${seasonText})`;
}

// ===== LIVE UPDATE =====
["start", "end", "package", "guests", "promo"].forEach(id => {
  document.getElementById(id)?.addEventListener("change", calculateTotal);
});

// ===== FORM VALIDATION =====
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const pkg = document.getElementById("package").value;

    if (!pkg || !start || !end) {
      alert("Please fill all required fields before booking!");
      return;
    }

    if (new Date(end) <= new Date(start)) {
      alert("Check-out date must be after check-in date!");
      return;
    }

    alert("✅ Booking submitted successfully!");
  });
}
