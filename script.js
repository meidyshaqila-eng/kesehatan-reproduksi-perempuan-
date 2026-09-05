const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const calculateBtn = document.getElementById("calculateCycle");

calculateBtn?.addEventListener("click", () => {
  const dateValue = document.getElementById("lastPeriod").value;
  const cycle = Number(document.getElementById("cycleLength").value);
  const result = document.getElementById("cycleResult");

  if (!dateValue || !cycle || cycle < 21 || cycle > 45) {
    result.innerHTML = `
      <span class="result-icon">🌸</span>
      <h3>Data belum lengkap</h3>
      <p>Masukkan tanggal menstruasi terakhir dan siklus antara 21–45 hari.</p>
    `;
    return;
  }

  const last = new Date(dateValue + "T00:00:00");
  const next = new Date(last);
  next.setDate(next.getDate() + cycle);

  const ovulation = new Date(next);
  ovulation.setDate(ovulation.getDate() - 14);

  const fertileStart = new Date(ovulation);
  fertileStart.setDate(fertileStart.getDate() - 5);

  const fertileEnd = new Date(ovulation);
  fertileEnd.setDate(fertileEnd.getDate() + 1);

  const fmt = d => d.toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric"
  });

  result.innerHTML = `
    <span class="result-icon">🌷</span>
    <h3>Perkiraan siklus</h3>
    <p><strong>Menstruasi berikutnya:</strong><br>${fmt(next)}</p>
    <p><strong>Perkiraan masa subur:</strong><br>${fmt(fertileStart)} – ${fmt(fertileEnd)}</p>
    <small>Hasil ini hanya perkiraan berdasarkan data yang dimasukkan dan tidak dapat digunakan sebagai diagnosis atau metode kontrasepsi yang pasti.</small>
  `;
});
