const svg = document.getElementById("map");
const truckTable = document.getElementById("truck-table");
const alertTable = document.getElementById("alert-table");

const route = [
  [30, 280],
  [120, 250],
  [220, 200],
  [320, 180],
  [430, 120],
  [560, 70]
];

const trucks = [
  { id: "RC-101", x: 30, y: 280, progress: 0, offRoute: false },
  { id: "RC-204", x: 120, y: 250, progress: 1, offRoute: false },
  { id: "RC-318", x: 220, y: 200, progress: 2, offRoute: false },
  { id: "RC-406", x: 320, y: 180, progress: 3, offRoute: false }
];

const alerts = [];

function renderRoute() {
  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", route.map((r) => r.join(",")).join(" "));
  polyline.setAttribute("fill", "none");
  polyline.setAttribute("stroke", "#2056d8");
  polyline.setAttribute("stroke-width", "4");
  polyline.setAttribute("stroke-linecap", "round");
  svg.append(polyline);
}

function severityByOffset(offset) {
  if (offset > 45) return "alta";
  if (offset > 25) return "media";
  return "baja";
}

function addAlert(truckId, offset) {
  const now = new Date().toLocaleTimeString("es-ES");
  alerts.unshift({
    time: now,
    truckId,
    severity: severityByOffset(offset),
    detail: `Desviación detectada (${Math.round(offset)}m fuera del corredor).`
  });
  if (alerts.length > 8) alerts.pop();
}

function updateTrucks() {
  trucks.forEach((truck) => {
    const next = route[(truck.progress + 1) % route.length];
    const current = route[truck.progress % route.length];

    truck.x += (next[0] - current[0]) * 0.08;
    truck.y += (next[1] - current[1]) * 0.08;

    const reached = Math.abs(truck.x - next[0]) < 8 && Math.abs(truck.y - next[1]) < 8;
    if (reached) truck.progress = (truck.progress + 1) % route.length;

    // Simulación de desvío aleatorio
    if (Math.random() > 0.93) {
      const offset = 15 + Math.random() * 45;
      truck.y += offset;
      truck.offRoute = true;
      addAlert(truck.id, offset);
    } else {
      truck.offRoute = false;
    }
  });
}

function drawMap() {
  svg.querySelectorAll("circle, text.label").forEach((n) => n.remove());

  trucks.forEach((truck) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", truck.x.toString());
    circle.setAttribute("cy", truck.y.toString());
    circle.setAttribute("r", "7");
    circle.setAttribute("fill", truck.offRoute ? "#c22727" : "#0c8b4f");

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.classList.add("label");
    label.setAttribute("x", (truck.x + 10).toString());
    label.setAttribute("y", (truck.y - 10).toString());
    label.setAttribute("font-size", "11");
    label.textContent = truck.id;

    svg.append(circle, label);
  });
}

function renderTables() {
  truckTable.innerHTML = trucks
    .map(
      (truck) => `
      <tr>
        <td>${truck.id}</td>
        <td><span class="status ${truck.offRoute ? "off-route" : "on-route"}">${
          truck.offRoute ? "Desviado" : "En ruta"
        }</span></td>
        <td>Ruta Centro</td>
      </tr>`
    )
    .join("");

  alertTable.innerHTML =
    alerts.length === 0
      ? `<tr><td colspan="4">Sin alertas activas por ahora.</td></tr>`
      : alerts
          .map(
            (alert) => `
          <tr>
            <td>${alert.time}</td>
            <td>${alert.truckId}</td>
            <td class="sev ${alert.severity}">${alert.severity.toUpperCase()}</td>
            <td>${alert.detail}</td>
          </tr>`
          )
          .join("");

  document.getElementById("kpi-active").textContent = String(trucks.length);
  document.getElementById("kpi-alerts").textContent = String(alerts.length);
  document.getElementById("kpi-routes").textContent = "3";
  document.getElementById("kpi-incidents").textContent = "1";
}

function tick() {
  updateTrucks();
  drawMap();
  renderTables();
}

renderRoute();
tick();
setInterval(tick, 2000);
