let providers = [];

window.onload = () => {
  Papa.parse("providers.csv", {
    download: true,
    skipEmptyLines: true,
    header: true,
    complete: function(results) {
      console.log("Loaded providers:", results.data);
      providers = results.data;
    },
    error: function(err) {
      console.error("Papa Parse error:", err);
    }
  });

  document.getElementById("searchBtn").addEventListener("click", searchExcel);
};

function searchExcel() {
    const lastName = document.getElementById("searchName").value.toLowerCase();
    const specialty = document.getElementById("searchSpecialty").value.toLowerCase();
    const ZIP = document.getElementById("searchZIP").value.toLowerCase();

    const filtered = providers.filter(row => {
        return (!lastName || String(row["Last Name"] || "").toLowerCase().includes(lastName)) &&
               (!specialty || String(row["Specialty"] || "").toLowerCase().includes(specialty)) &&
               (!ZIP || String(row["ZIP"] || "").toLowerCase().includes(ZIP));
    });

    displayResults(filtered);
}

function displayResults(data) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No providers found.</p>";
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
