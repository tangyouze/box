// API functions
const fetchIpifyOrg = () =>
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => ({ name: "IpifyOrg", ...data }))
    .catch((error) => ({ name: "IpifyOrg", error }));

const fetchIpifyOrg64 = () =>
  fetch("https://api64.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => ({ name: "IpifyOrg64", ...data }))
    .catch((error) => ({ name: "IpifyOrg64", error }));

// https://api.ip.sb/geoip
// response {
// "organization": "Ucloud Information Technology Hk Limited",
// "longitude": 114.1759,
// "city": "Hong Kong",
// "timezone": "Asia/Hong_Kong",
// "isp": "Ucloud Information Technology Hk Limited",
// "offset": 28800,
// "region": "Central and Western District",
// "asn": 135377,
// "asn_organization": "UCLOUD INFORMATION TECHNOLOGY HK LIMITED",
// "country": "Hong Kong",
// "ip": "45.249.246.129",
// "latitude": 22.2842,
// "continent_code": "AS",
// "country_code": "HK",
// "region_code": "HCW"
// }
const fetchIpSbGeoip = () =>
  fetch("https://api.ip.sb/geoip")
    .then((response) => response.json())
    .then((data) => {
      return data.ip
        ? { name: "IpSbGeoip", ip: data.ip }
        : { name: "IpSbGeoip", error: "No IP found in response" };
    })
    .catch((error) => ({ name: "IpSbGeoip", error }));

// New function from https://2023.ip138.com/
// It returns HTML, and you should extract xxx.xxx.xxx.xxx from its response html
const fetchIp138 = () =>
  fetch("https://2023.ip138.com/")
    .then((response) => response.text())
    .then((html) => {
      const match = html.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
      return match
        ? { name: "Ip138", ip: match[0] }
        : { name: "Ip138", error: "No IP found in response" };
    })
    .catch((error) => ({ name: "Ip138", error }));

// chat.openai.com/cdn-cgi/trace

const fetchChatGPT = () =>
  fetch("https://chat.openai.com/cdn-cgi/trace")
    .then((response) => response.text())
    .then((html) => {
      const match = html.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
      return match
        ? { name: "ChatGPT", ip: match[0] }
        : { name: "ChatGPT", error: "No IP found in response" };
    })
    .catch((error) => ({ name: "ChatGPT", error }));


const ipListElement = document.getElementById("ip-list");
const loadingElement = document.getElementById("loading");

// Page load event
window.onload = function () {
  // Show loading indicator
  loadingElement.style.display = "block";

  // Use Promise.all to wait for all API responses
  Promise.all([
    fetchIpifyOrg(),
    fetchIpifyOrg64(),
    fetchIp138(),
    fetchIpSbGeoip(),
    fetchChatGPT(),
  ]).then((results) => {
    // Hide loading indicator
    loadingElement.style.display = "none";

    // Create a table
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const headerRow = document.createElement("tr");

    // Define headers
    ["Source", "IP Address", "Error"].forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Define headers
    ["Source", "IP Address", "Error", "Check Address"].forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Populate table with results
    results.forEach((result) => {
      const row = document.createElement("tr");
      const sourceCell = document.createElement("td");
      const ipCell = document.createElement("td");
      const errorCell = document.createElement("td");
      const checkAddressCell = document.createElement("td");
      const checkAddressLink = document.createElement("a");

      sourceCell.textContent = result.name;
      ipCell.textContent = result.ip || "";
      errorCell.textContent = result.error || "";
      checkAddressLink.href = `https://ipinfo.io/${result.ip || ""}`;
      checkAddressLink.textContent = "Location";
      checkAddressCell.appendChild(checkAddressLink);

      row.appendChild(sourceCell);
      row.appendChild(ipCell);
      row.appendChild(errorCell);
      row.appendChild(checkAddressCell);
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    ipListElement.appendChild(table);
  });
};
