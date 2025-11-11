
const { jsPDF } = window.jspdf;
const article = document.getElementById('article');
const addSection = document.getElementById('addSection');
const deleteSection = document.getElementById('deleteSection');
const toast = document.getElementById('toast');
const exportBtn = document.getElementById('exportBtn');
const saveBtn = document.getElementById('saveBtn');

/* Add Section */
addSection.onclick = () => {
  const h2 = document.createElement("h2");
  h2.className = "editable";
  h2.innerText = "New Reflection";
  const p = document.createElement("p");
  p.className = "editable";
  p.innerText = "Write your reflection...";
  article.appendChild(h2);
  article.appendChild(p);
  showToast("Section added");
};

/* Delete Section */
deleteSection.onclick = () => {
  const els = article.querySelectorAll('.editable');
  if (els.length > 2) {
    els[els.length - 1].remove();
    showToast("Last section deleted");
  }
};

/* Save */
saveBtn.onclick = () => {
  localStorage.setItem('typewriterContent', article.innerHTML);
  showToast("Saved!");
};

/* Export Beautiful Text-based PDF */
exportBtn.onclick = () => {
  const pdf = new jsPDF("p", "pt", "a4");
  const marginX = 60;
  let y = 80;

  // PDF Theme
  pdf.setFillColor(242, 232, 211); // Paper tone
  pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, "F");

  // Header section
  pdf.setFont("times", "bold");
  pdf.setTextColor(182, 128, 66);
  pdf.setFontSize(26);
  pdf.text("Typewriter — Web Edition", marginX, y);
  y += 20;

  pdf.setDrawColor(182, 128, 66);
  pdf.line(marginX, y, pdf.internal.pageSize.width - marginX, y);
  y += 40;

  // Title
  const title = document.getElementById("title").innerText.trim();
  pdf.setFontSize(20);
  pdf.setTextColor(182, 128, 66);
  pdf.text(title, marginX, y);
  y += 25;

  // Body
  pdf.setFont("times", "normal");
  pdf.setFontSize(13);
  pdf.setTextColor(29, 40, 50);
  const sections = article.querySelectorAll("p, h2");

  sections.forEach(el => {
    if (el.tagName === "H2") {
      pdf.setFont("times", "bolditalic");
      pdf.setTextColor(182, 128, 66);
      y += 25;
      pdf.text(el.innerText, marginX, y);
      y += 10;
    } else {
      pdf.setFont("times", "normal");
      pdf.setTextColor(29, 40, 50);
      const text = el.innerText.replace(/\n+/g, " ").trim();
      const split = pdf.splitTextToSize(text, pdf.internal.pageSize.width - marginX * 2);
      pdf.text(split, marginX, y + 20);
      y += split.length * 16 + 20;
    }
  });

  pdf.save("Typewriter_Letter.pdf");
  showToast("Exported beautifully!");
};

/* Toast */
function showToast(msg) {
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

