let providers = [];

window.onload = () => {
  Papa.parse("providers.csv", {
    download: true,
    header: true,
    complete: function(results) {
      providers = results.data;
    }
  });
};

function searchProviders() {
  const zip = document.getElementById("zipInput").value.trim();
  if (!zip) {
    alert("Please enter a ZIP code.");
    return;
  }

  // Filter providers by ZIP
  let filtered = providers.filter(p => p.ZIP === zip);

  // Sort alphabetically by last name
  filtered.sort((a, b) => a["Last Name"].localeCompare(b["Last Name"]));

  displayResults(filtered);
}

function displayResults(data) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No providers found for that ZIP code.</p>";
    return;
  }

  data.forEach(provider => {
    const div = document.createElement("div");
    div.className = "provider";
    div.innerHTML = `
      <strong>${provider["First Name"]} ${provider["Last Name"]}</strong><br>
      ${provider.Specialty}<br>
      ${provider.Address}, ${provider.City}, ${provider.State} ${provider.ZIP}<br>
      Phone: ${provider.Phone}
    `;
    container.appendChild(div);
  });
}