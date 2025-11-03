import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useProfile } from "../context/ProfileContext";

const ResumePreview = () => {
  const navigate = useNavigate();
  const {
    informationList,
    educationList,
    workList,
    abilities,
    portfolioList,
  } = useProfile();
  const resumeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState("classic"); // "classic" | "modern"

  const createTextPdfFallback = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const margin = 40;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const maxWidth = pageWidth - margin * 2;
    let cursorY = 60;

    const addBlock = (title, lines) => {
      if (!lines || lines.length === 0) return;
      pdf.setFontSize(14);
      pdf.setFont(undefined, "bold");
      if (cursorY > pdf.internal.pageSize.getHeight() - 60) {
        pdf.addPage();
        cursorY = 60;
      }
      pdf.text(title, margin, cursorY);
      cursorY += 18;
      pdf.setFontSize(11);
      pdf.setFont(undefined, "normal");
      lines.forEach((ln) => {
        const wrapped = pdf.splitTextToSize(ln, maxWidth);
        wrapped.forEach((wline) => {
          if (cursorY > pdf.internal.pageSize.getHeight() - 40) {
            pdf.addPage();
            cursorY = 60;
          }
          pdf.text(wline, margin, cursorY);
          cursorY += 14;
        });
        cursorY += 6;
      });
      cursorY += 6;
    };

    // Header / contact
    const contact = [];
    const headerName =
      informationList && informationList[0]?.fullName
        ? informationList[0].fullName
        : "Your Name";
    if (informationList && informationList[0]) {
      const info = informationList[0];
      if (info.email) contact.push(`Email: ${info.email}`);
      if (info.phone) contact.push(`Phone: ${info.phone}`);
      if (info.address) contact.push(`Address: ${info.address}`);
    }
    pdf.setFontSize(18);
    pdf.setFont(undefined, "bold");
    pdf.text(headerName, margin, cursorY);
    cursorY += 24;
    pdf.setFontSize(11);
    pdf.setFont(undefined, "normal");
    if (contact.length) {
      contact.forEach((c) => {
        pdf.text(c, margin, cursorY);
        cursorY += 14;
      });
      cursorY += 6;
    }

    // Education
    addBlock(
      "Education",
      (educationList || []).map((edu) => {
        const heading = `${edu.degree || ""}${
          edu.specialization ? ` - ${edu.specialization}` : ""
        } — ${edu.school || ""}`;
        const period = `${edu.startDate || ""} - ${
          edu.endDate || "Present"
        }`;
        return `${heading}\n${period}\n${edu.description || ""}`.trim();
      })
    );

    // Work
    addBlock(
      "Work Experience",
      (workList || []).map((w) => {
        const heading = `${w.jobTitle || ""} — ${w.company || ""}`;
        const period = `${w.startDate || ""} - ${
          w.current ? "Present" : w.endDate || ""
        }`;
        return `${heading}\n${period}\n${w.responsibilities || ""}`.trim();
      })
    );

    // Skills
    addBlock(
      "Skills",
      (abilities || []).length
        ? [
            (abilities || [])
              .map((s) => (s.level ? `${s.name} (${s.level})` : s.name))
              .join(", "),
          ]
        : []
    );

    // Projects
    addBlock(
      "Projects",
      (portfolioList || []).map((p) => {
        const title = p.projectName || p.projectType || "Project";
        return `${title}\n${p.summary || ""}\n${p.keyLinks || ""}`.trim();
      })
    );

    pdf.save("resume.pdf");
  };

  const downloadPdf = async () => {
    if (!resumeRef.current) return;
    setLoading(true);
    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("resume.pdf");
    } catch (e) {
      console.error("html2canvas failed:", e);
      createTextPdfFallback();
    } finally {
      setLoading(false);
    }
  };

  const info = informationList?.[0] || {};
  const summary =
    info.summary ||
    info.profileSummary ||
    "Result-oriented professional with proven experience. Add a short summary to highlight strengths and goals.";

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6 pt-24">
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-black"
        >
          ← Back
        </button>

        <div className="flex gap-3 items-center">
          <div className="flex rounded bg-white shadow-sm overflow-hidden">
            <button
              onClick={() => setTemplate("classic")}
              className={`px-3 py-2 ${
                template === "classic"
                  ? "bg-blue-900 text-white"
                  : "text-gray-700"
              }`}
            >
              Classic
            </button>
            <button
              onClick={() => setTemplate("modern")}
              className={`px-3 py-2 ${
                template === "modern"
                  ? "bg-blue-900 text-white"
                  : "text-gray-700"
              }`}
            >
              Modern
            </button>
          </div>

          <button
            onClick={downloadPdf}
            disabled={loading}
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950"
          >
            {loading ? "Preparing..." : "Download PDF"}
          </button>
        </div>
      </div>

      <div ref={resumeRef} className="max-w-3xl mx-auto">
        {template === "classic" ? (
          <article className="bg-white p-8 shadow-sm text-gray-800">
            {/* Header */}
            <header className="mb-6 border-b pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold leading-tight">
                    {info.fullName || "Your Name"}
                  </h1>
                  {info.title && (
                    <div className="text-lg text-gray-700 mt-1">{info.title}</div>
                  )}
                </div>

                <div className="text-sm text-gray-600 text-right min-w-[160px]">
                  {info.email && <div>{info.email}</div>}
                  {info.phone && <div className="mt-1">{info.phone}</div>}
                  {info.address && <div className="mt-1">{info.address}</div>}
                  {info.linkedin && (
                    <div className="mt-1">
                      LinkedIn:{" "}
                      <a
                        href={info.linkedin}
                        className="text-blue-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {new URL(info.linkedin).hostname.replace("www.", "")}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              <p className="mt-4 text-gray-700 leading-relaxed">{summary}</p>
            </header>

            {/* Education */}
            {educationList && educationList.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Education</h2>
                <ul className="space-y-3">
                  {educationList.map((edu, i) => (
                    <li key={i} className="flex justify-between">
                      <div className="pr-4">
                        <div className="font-semibold">
                          {edu.degree}{" "}
                          {edu.specialization ? `- ${edu.specialization}` : ""}
                        </div>
                        <div className="text-sm text-gray-600">
                          {edu.school}
                        </div>
                        {edu.description && (
                          <div className="text-sm mt-1">{edu.description}</div>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 whitespace-nowrap">
                        {edu.startDate} — {edu.endDate || "Present"}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Work Experience */}
            {workList && workList.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Work Experience</h2>
                <ul className="space-y-4">
                  {workList.map((w, i) => (
                    <li key={i} className="flex justify-between">
                      <div className="pr-6">
                        <div className="font-semibold">
                          {w.jobTitle}{" "}
                          <span className="text-gray-600">— {w.company}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {w.location}
                        </div>
                        {w.responsibilities && (
                          <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                            {String(w.responsibilities)
                              .split(/\r?\n/)
                              .map((line) => line.trim())
                              .filter(Boolean)
                              .map((line, idx) => (
                                <li key={idx}>{line}</li>
                              ))}
                          </ul>
                        )}
                      </div>

                      <div className="text-sm text-gray-600 whitespace-nowrap">
                        {w.startDate} —{" "}
                        {w.current ? "Present" : w.endDate || ""}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Skills */}
            {abilities && abilities.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {abilities.map((s, i) => (
                    <span
                      key={i}
                      className="text-sm px-3 py-1 bg-gray-100 rounded border text-gray-800"
                    >
                      {s.name}
                      {s.level ? ` — ${s.level}` : ""}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {portfolioList && portfolioList.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Projects</h2>
                <ul className="space-y-3">
                  {portfolioList.map((p, i) => (
                    <li key={i}>
                      <div className="font-semibold">
                        {p.projectName || p.projectType}
                      </div>
                      {p.summary && (
                        <div className="text-sm text-gray-700 mt-1">
                          {p.summary}
                        </div>
                      )}
                      {p.keyLinks && (
                        <div className="text-sm text-blue-700 mt-1">
                          <a
                            href={p.keyLinks}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {p.keyLinks}
                          </a>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Footer / small note */}
            <footer className="mt-8 text-xs text-gray-500">
              Tip: keep summary short (2–3 lines), list 6–8 key skills, and use
              bullet points for achievements.
            </footer>
          </article>
        ) : (
          <div className="bg-white shadow-sm">
            <div className="md:flex">
              <aside className="md:w-1/3 bg-blue-900 text-white p-6">
                <div className="mb-4">
                  <h1 className="text-2xl font-bold">
                    {info.fullName || "Your Name"}
                  </h1>
                  <div className="text-sm opacity-90 mt-2">
                    {info.title && <div>{info.title}</div>}
                    {info.email && <div className="mt-1">{info.email}</div>}
                    {info.phone && <div className="mt-1">{info.phone}</div>}
                    {info.address && <div className="mt-1">{info.address}</div>}
                  </div>
                </div>

                {abilities && abilities.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {abilities.map((s, i) => (
                        <span
                          key={i}
                          className="text-sm bg-white bg-opacity-10 px-2 py-1 rounded"
                        >
                          {s.name}
                          {s.level ? ` (${s.level})` : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {portfolioList && portfolioList.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Projects</h3>
                    <ul className="text-sm space-y-2">
                      {portfolioList.map((p, i) => (
                        <li key={i}>
                          <div className="font-medium">
                            {p.projectName || p.projectType}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>

              <main className="md:w-2/3 p-6">
                {educationList && educationList.length > 0 && (
                  <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Education</h2>
                    <ul className="space-y-3">
                      {educationList.map((edu, i) => (
                        <li key={i}>
                          <div className="font-semibold">
                            {edu.degree}{" "}
                            {edu.specialization ? `- ${edu.specialization}` : ""}
                          </div>
                          <div className="text-sm text-gray-600">
                            {edu.school} • {edu.startDate} -{" "}
                            {edu.endDate || "Present"}
                          </div>
                          {edu.description && (
                            <div className="text-sm mt-1">{edu.description}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {workList && workList.length > 0 && (
                  <section className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Work Experience</h2>
                    <ul className="space-y-3">
                      {workList.map((w, i) => (
                        <li key={i}>
                          <div className="font-semibold">
                            {w.jobTitle} — {w.company}
                          </div>
                          <div className="text-sm text-gray-600">
                            {w.startDate} - {w.current ? "Present" : w.endDate}
                          </div>
                          {w.responsibilities && (
                            <div className="text-sm mt-1 whitespace-pre-line">
                              {w.responsibilities}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {!informationList?.length &&
                  !educationList?.length &&
                  !workList?.length &&
                  !abilities?.length &&
                  !portfolioList?.length && (
                    <div className="text-center text-gray-600 py-10">
                      No profile data to preview. Add sections from My Profile first.
                    </div>
                  )}
              </main>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;