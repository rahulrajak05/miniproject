import React, { useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { useProfile } from "../context/ProfileContext";

/*
Feature: ATS Check
- Adds an "ATS Check" panel with an optional Job Description/Keywords input.
- Analyzes the resume (classic layout) and reports:
  - Overall ATS score (0–100)
  - Section-wise issues and actionable suggestions
  - Missing keywords vs. JD (if JD/keywords provided)
- Classic layout only. Order:
  Experience → Education → Projects → Skills → Relevant Coursework → Coding Profiles
  → Awards & Recognitions → Publications & Patents → Offerings → Interests & Activities → Preferences
*/

const ResumePreview = () => {
  const navigate = useNavigate();
  const {
    informationList,
    educationList,
    workList,
    learningList,
    abilities,
    recognitions,
    intellectualList,
    portfolioList,
    Offerings,
    Preferences,
    InterestActivities,
  } = useProfile();

  const info = informationList?.[0] || {};
  const resumeRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // ATS state
  const [atsOpen, setAtsOpen] = useState(false);
  const [atsJD, setAtsJD] = useState(""); // optional JD/keywords
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsReport, setAtsReport] = useState(null);

  // Helpers
  const ensureProtocol = (url) => {
    if (!url) return "";
    const s = String(url).trim();
    if (/^https?:\/\//i.test(s)) return s;
    return `https://${s}`;
  };
  const displayUrl = (url) =>
    String(url || "").replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");
  const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || "").trim());
  const isPhone = (s) => /[+\d][\d\s\-().]{6,}/.test(String(s || "").trim());
  const hasNumber = (s) => /\d/.test(String(s || ""));
  const norm = (s) => String(s || "").toLowerCase();

  const linkedinUrl = info.linkedin || info.linkedIn || info.linkedinUrl;
  const githubUrl = info.github || info.gitHub || info.githubUrl || info.githubProfile;
  const portfolioUrl = info.portfolio || info.website || info.portfolioUrl || info.site;

  const linkItems = [
    linkedinUrl && { href: ensureProtocol(linkedinUrl), label: displayUrl(linkedinUrl), key: "in" },
    githubUrl && { href: ensureProtocol(githubUrl), label: displayUrl(githubUrl), key: "gh" },
    portfolioUrl && { href: ensureProtocol(portfolioUrl), label: displayUrl(portfolioUrl), key: "pf" },
  ].filter(Boolean);

  const summary = info.summary || info.profileSummary || "";

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const fmt = (d) => {
    if (!d) return "";
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return String(d);
    return `${monthNames[dt.getMonth()]} ${dt.getFullYear()}`;
  };
  const range = (start, end, current=false) => {
    if (!start && !end && !current) return "";
    const left = fmt(start);
    const right = current ? "Present" : fmt(end);
    if (left && right) return `${left} – ${right}`;
    if (left) return left;
    if (right) return right;
    return current ? "Present" : "";
  };

  const bulletLines = (text) =>
    String(text || "")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

  // Fallback text-only PDF generator (used when DOM-to-PDF fails)
  const createTextPdfFallback = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const margin = 40;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const maxWidth = pageWidth - margin * 2;
    let cursorY = 60;

    const addBlock = (title, lines) => {
      if (!lines || !lines.length) return;
      pdf.setFont("Times", "bold");
      pdf.setFontSize(14);
      if (cursorY > pdf.internal.pageSize.getHeight() - 60) {
        pdf.addPage();
        cursorY = 60;
      }
      pdf.text(title, margin, cursorY);
      cursorY += 18;
      pdf.setFont("Times", "normal");
      pdf.setFontSize(11);
      lines.forEach((ln) => {
        const wrapped = pdf.splitTextToSize(ln, maxWidth);
        wrapped.forEach((w) => {
          if (cursorY > pdf.internal.pageSize.getHeight() - 40) {
            pdf.addPage();
            cursorY = 60;
          }
          pdf.text(w, margin, cursorY);
          cursorY += 14;
        });
        cursorY += 6;
      });
      cursorY += 6;
    };

    // Header
    const headerName = info.fullName || "Your Name";
    const contact = [];
    if (info.phone) contact.push(info.phone);
    if (info.email) contact.push(info.email);
    if (linkedinUrl) contact.push(displayUrl(linkedinUrl));
    if (githubUrl) contact.push(displayUrl(githubUrl));
    if (portfolioUrl) contact.push(displayUrl(portfolioUrl));

    pdf.setFont("Times", "bold");
    pdf.setFontSize(22);
    pdf.text(headerName.toUpperCase(), pageWidth / 2, cursorY, { align: "center" });
    cursorY += 22;
    pdf.setFont("Times", "normal");
    pdf.setFontSize(11);
    if (contact.length) {
      pdf.text(contact.join(" | "), pageWidth / 2, cursorY, { align: "center" });
      cursorY += 22;
    }

    // Summary
    if (summary) {
      addBlock("SUMMARY", [summary]);
    }

    // EXPERIENCE
    addBlock(
      "EXPERIENCE",
      (workList || []).map((w) => {
        const left = `${w.company || ""}${w.jobTitle ? ` (${w.jobTitle})` : ""}`.trim();
        const right = `${range(w.startDate, w.endDate, w.current)}${w.location ? `  •  ${w.location}` : ""}`.trim();
        const bullets = bulletLines(w.responsibilities)
          .map((b) => `– ${b}`)
          .join("\n");
        return `${left}\n${right}\n${bullets}`.trim();
      })
    );

    // EDUCATION
    addBlock(
      "EDUCATION",
      (educationList || []).map((e) => {
        const left = `${e.school || ""}`;
        const degree = [e.degree, e.specialization].filter(Boolean).join(" — ");
        const right = `${range(e.startDate, e.endDate)}${e.location ? `  •  ${e.location}` : ""}`.trim();
        return `${left}\n${degree}\n${right}${e.description ? `\n${e.description}` : ""}`.trim();
      })
    );

    // PROJECTS
    addBlock(
      "PROJECTS",
      (portfolioList || []).map((p) => {
        const title = p.projectName || p.projectType || "Project";
        const tech = p.tech || p.stack || "";
        const lines = [];
        lines.push(title);
        if (tech) lines.push(tech);
        if (p.summary) lines.push(`– ${p.summary}`);
        if (p.points) bulletLines(p.points).forEach((b) => lines.push(`– ${b}`));
        if (p.keyLinks) lines.push(displayUrl(p.keyLinks));
        return lines.join("\n");
      })
    );

    // SKILLS
    const skillsLine = (abilities || [])
      .map((s) => (s?.level ? `${s.name} (${s.level})` : s?.name || ""))
      .filter(Boolean)
      .join(", ");
    if (skillsLine) addBlock("SKILLS", [skillsLine]);

    // AWARDS & RECOGNITIONS
    addBlock(
      "AWARDS & RECOGNITIONS",
      (recognitions || []).map((r) => {
        const head = `${r.awardName || r.type || "Recognition"}${r.issueAuthority ? ` — ${r.issueAuthority}` : ""}`;
        const lines = [head];
        if (r.issueDate) lines.push(String(r.issueDate));
        if (r.description) lines.push(r.description);
        if (r.referenceLink) lines.push(displayUrl(r.referenceLink));
        return lines.join("\n");
      })
    );

    // PUBLICATIONS & PATENTS
    addBlock(
      "PUBLICATIONS & PATENTS",
      (intellectualList || []).map((ip) => {
        const title = `${ip.title || "Untitled"}${ip.recognitionType ? ` (${ip.recognitionType})` : ""}`;
        const status = ip.status ? `Status: ${ip.status}${ip.applicationNumber ? ` • ${ip.applicationNumber}` : ""}` : "";
        const names =
          Array.isArray(ip.inventors) && ip.inventors.length
            ? `${ip.recognitionType === "Patent" ? "Inventors" : "Authors"}: ${ip.inventors
                .map((inv) => inv?.name)
                .filter(Boolean)
                .join(", ")}`
            : "";
        const url = ip.url ? displayUrl(ip.url) : "";
        return [title, status, ip.description || "", names, url].filter(Boolean).join("\n");
      })
    );

    // OFFERINGS
    addBlock(
      "OFFERINGS",
      (Offerings || []).map((o) => [o.name || "Offering", o.description || ""].filter(Boolean).join("\n"))
    );

    // INTERESTS & ACTIVITIES
    addBlock(
      "INTERESTS & ACTIVITIES",
      (InterestActivities || []).map((h) => [h.activityType || "Activity", h.description || ""].filter(Boolean).join("\n"))
    );

    // RELEVANT COURSEWORK
    const coursework =
      info.relevantCoursework ||
      (Array.isArray(learningList) && learningList.length
        ? learningList.map((c) => c.courseName).filter(Boolean).join(" | ")
        : "");
    if (coursework) addBlock("RELEVANT COURSEWORK", [coursework]);

    // PREFERENCES
    const prefLines = [];
    if (Preferences && typeof Preferences === "object") {
      if (Array.isArray(Preferences.locations) && Preferences.locations.length)
        prefLines.push(`Locations: ${Preferences.locations.join(", ")}`);
      if (Preferences.workMode) prefLines.push(`Work Mode: ${Preferences.workMode}`);
      if (Preferences.employmentType) prefLines.push(`Employment: ${Preferences.employmentType}`);
      if (Array.isArray(Preferences.industries) && Preferences.industries.length)
        prefLines.push(`Industries: ${Preferences.industries.join(", ")}`);
      if (Array.isArray(Preferences.jobRoles) && Preferences.jobRoles.length)
        prefLines.push(`Roles: ${Preferences.jobRoles.join(", ")}`);
      if (Preferences.timezone) prefLines.push(`Timezone: ${Preferences.timezone}`);
      if (Preferences.startTime || Preferences.endTime)
        prefLines.push(
          `Work Hours: ${Preferences.startTime || ""}${
            Preferences.startTime && Preferences.endTime ? " - " : ""
          }${Preferences.endTime || ""}`
        );
      if (Preferences.currency || Preferences.income || Preferences.frequency)
        prefLines.push(
          `Compensation: ${[Preferences.currency, Preferences.income, Preferences.frequency]
            .filter(Boolean)
            .join(" ")}`
        );
      if (Preferences.noticePeriod) prefLines.push(`Notice: ${Preferences.noticePeriod}`);
      if (Preferences.travel) prefLines.push(`Travel: ${Preferences.travel}`);
      if (Preferences.relocate) prefLines.push(`Relocate: ${Preferences.relocate}`);
      if (Preferences.companySize) prefLines.push(`Company Size: ${Preferences.companySize}`);
    }
    if (prefLines.length) addBlock("PREFERENCES", prefLines);

    // CODING PROFILES
    const coding = []
      .concat(info.leetcode ? [`LeetCode: ${displayUrl(info.leetcode)}`] : [])
      .concat(info.hackerrank ? [`HackerRank: ${displayUrl(info.hackerrank)}`] : []);
    if (coding.length) addBlock("CODING PROFILES", [coding.join("   |   ")]);

    pdf.save("resume.pdf");
  };

  // Reliable multi-page PDF export using html2pdf.js
  const downloadPdf = async () => {
    if (!resumeRef.current) return;
    setLoading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = resumeRef.current;
      const opt = {
        margin: [12, 18, 18, 18],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: -window.scrollY },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (e) {
      console.error("html2pdf failed, falling back to text pdf:", e);
      createTextPdfFallback();
    } finally {
      setLoading(false);
    }
  };

  // Section title component (small-caps look)
  const Title = ({ children }) => (
    <h2
      className="mt-6 mb-2 text-gray-900 tracking-wider"
      style={{ fontVariant: "small-caps", letterSpacing: "0.08em" }}
    >
      <span className="font-semibold border-b border-gray-300 pb-1">{children}</span>
    </h2>
  );

  const Bullet = ({ children }) => <div>– {children}</div>;

  // ===== ATS ANALYZER =====
  const allTextMemo = useMemo(() => {
    const collect = [];
    collect.push(info.fullName, info.title, info.email, info.phone, info.address);
    collect.push(summary);

    (workList || []).forEach((w) => {
      collect.push(w.company, w.jobTitle, w.location, w.responsibilities);
    });

    (educationList || []).forEach((e) => {
      collect.push(e.school, e.degree, e.specialization, e.location, e.description);
    });

    (portfolioList || []).forEach((p) => {
      collect.push(p.projectName, p.projectType, p.summary, p.points, p.tech, p.stack, p.keyLinks);
    });

    (abilities || []).forEach((s) => {
      if (typeof s === "string") collect.push(s);
      else collect.push(s?.name, s?.level);
    });

    (recognitions || []).forEach((r) => {
      collect.push(r.awardName, r.type, r.issueAuthority, r.description, r.referenceLink);
    });

    (intellectualList || []).forEach((ip) => {
      collect.push(ip.title, ip.recognitionType, ip.description, ip.status, ip.applicationNumber, ip.url);
      if (Array.isArray(ip.inventors)) ip.inventors.forEach((inv) => collect.push(inv?.name));
    });

    (Offerings || []).forEach((o) => {
      collect.push(o.name, o.description);
    });

    (InterestActivities || []).forEach((h) => {
      collect.push(h.activityType, h.description);
    });

    if (Preferences) {
      collect.push(
        ...(Preferences.locations || []),
        Preferences.workMode,
        Preferences.employmentType,
        ...(Preferences.industries || []),
        ...(Preferences.jobRoles || []),
        Preferences.timezone,
        Preferences.currency,
        Preferences.income,
        Preferences.frequency
      );
    }

    collect.push(linkedinUrl, githubUrl, portfolioUrl, info.leetcode, info.hackerrank);
    return norm(collect.filter(Boolean).join(" "));
  }, [
    info,
    summary,
    workList,
    educationList,
    portfolioList,
    abilities,
    recognitions,
    intellectualList,
    Offerings,
    InterestActivities,
    Preferences,
    linkedinUrl,
    githubUrl,
    portfolioUrl,
  ]);

  const runAtsCheck = () => {
    setAtsLoading(true);
    // Simulate processing delay for UX
    setTimeout(() => {
      const sections = {};

      // SECTION: Header/Contact
      const headerIssues = [];
      if (!info.fullName) headerIssues.push("Name is missing.");
      if (!info.email || !isEmail(info.email)) headerIssues.push("Valid email is missing or malformed.");
      if (!info.phone || !isPhone(info.phone)) headerIssues.push("Phone number looks incomplete.");
      if (!linkedinUrl && !githubUrl && !portfolioUrl)
        headerIssues.push("Add at least one professional link (LinkedIn, GitHub, Portfolio).");
      if (headerIssues.length) sections.Header = headerIssues;

      // SECTION: Summary
      const summaryIssues = [];
      const wordCount = String(summary).trim().split(/\s+/).filter(Boolean).length;
      if (wordCount === 0) summaryIssues.push("Professional summary is missing.");
      if (wordCount > 80) summaryIssues.push("Summary is long. Aim for 40–80 words.");
      if (summaryIssues.length) sections.Summary = summaryIssues;

      // SECTION: Experience
      const expIssues = [];
      const actionVerbs = [
        "built","developed","designed","implemented","optimized","created","led","managed","delivered",
        "improved","reduced","increased","launched","migrated","integrated","automated","refactored",
        "enhanced","collaborated","owned","architected"
      ];

      (workList || []).forEach((w, idx) => {
        const roleIssues = [];
        if (!w.company) roleIssues.push("Company name missing.");
        if (!w.jobTitle) roleIssues.push("Job title missing.");
        if (!w.startDate && !w.endDate && !w.current) roleIssues.push("Dates missing.");
        // Bullets checks
        const lines = bulletLines(w.responsibilities);
        if (!lines.length) roleIssues.push("Add 3–5 bullet points with achievements and impact.");
        lines.forEach((ln, i) => {
          const firstWord = ln.trim().split(/\s+/)[0]?.toLowerCase() || "";
          const startsWithVerb = actionVerbs.includes(firstWord.replace(/[^\w]/g, ""));
          if (!startsWithVerb)
            roleIssues.push(`Bullet ${i + 1} should start with an action verb (e.g., Built, Implemented, Optimized).`);
          if (!hasNumber(ln))
            roleIssues.push(`Bullet ${i + 1} lacks metrics (%, numbers, time saved, revenue, users, etc.).`);
        });
        if (roleIssues.length) expIssues.push({ role: w.jobTitle || `Experience ${idx + 1}`, issues: roleIssues });
      });
      if (expIssues.length) sections.Experience = expIssues;

      // SECTION: Education
      const eduIssues = [];
      (educationList || []).forEach((e, idx) => {
        const eIssues = [];
        if (!e.school) eIssues.push("Institution name missing.");
        if (!e.degree) eIssues.push("Degree missing.");
        if (!e.startDate && !e.endDate) eIssues.push("Dates missing.");
        if (eIssues.length) eduIssues.push({ edu: e.degree || `Education ${idx + 1}`, issues: eIssues });
      });
      if (eduIssues.length) sections.Education = eduIssues;

      // SECTION: Projects
      const projIssues = [];
      (portfolioList || []).forEach((p, idx) => {
        const pIssues = [];
        if (!p.projectName && !p.projectType) pIssues.push("Project title missing.");
        const hasDetails = p.summary || p.points;
        if (!hasDetails) pIssues.push("Add 2–4 bullets highlighting problems solved, role, and results.");
        if (p.summary && !hasNumber(p.summary) && !/api|auth|db|design|ui|ux|deploy|ci\/cd/i.test(p.summary))
          pIssues.push("Project summary could add impact (metrics, users, performance) or concrete responsibilities.");
        if (p.keyLinks && !/^https?:\/\//i.test(p.keyLinks)) pIssues.push("Project link must be a valid URL (start with http/https).");
        if (pIssues.length) projIssues.push({ project: p.projectName || `Project ${idx + 1}`, issues: pIssues });
      });
      if (projIssues.length) sections.Projects = projIssues;

      // SECTION: Skills
      const skillsIssues = [];
      const skills = (abilities || []).map((s) => (typeof s === "string" ? s : s?.name)).filter(Boolean);
      if (!skills.length) skillsIssues.push("Add a skills section with relevant technical skills.");
      // Deduplicate and check for generic-only skills
      const uniqueSkills = Array.from(new Set(skills.map((s) => s.trim().toLowerCase())));

      if (uniqueSkills.length && uniqueSkills.every((s) => ["teamwork","communication","leadership"].includes(s)))
        skillsIssues.push("Add technical skills (e.g., React, Node, SQL, AWS) alongside soft skills.");
      if (skillsIssues.length) sections.Skills = skillsIssues;

      // SECTION: Awards & Recognitions
      if (Array.isArray(recognitions) && recognitions.length) {
        const recIssues = [];
        recognitions.forEach((r, idx) => {
          const rIssues = [];
          if (!r.awardName && !r.type) rIssues.push("Award name missing.");
          if (r.referenceLink && !/^https?:\/\//i.test(r.referenceLink))
            rIssues.push("Invalid reference link (must start with http/https).");
          if (rIssues.length) recIssues.push({ award: r.awardName || `Recognition ${idx + 1}`, issues: rIssues });
        });
        if (recIssues.length) sections["Awards & Recognitions"] = recIssues;
      }

      // SECTION: Publications & Patents
      if (Array.isArray(intellectualList) && intellectualList.length) {
        const ipIssues = [];
        intellectualList.forEach((ip, idx) => {
          const iIssues = [];
          if (!ip.title) iIssues.push("Title missing.");
          if (ip.url && !/^https?:\/\//i.test(ip.url)) iIssues.push("Invalid publication/patent URL.");
          if (iIssues.length) ipIssues.push({ item: ip.title || `Item ${idx + 1}`, issues: iIssues });
        });
        if (ipIssues.length) sections["Publications & Patents"] = ipIssues;
      }

      // SECTION: Offerings
      if (Array.isArray(Offerings) && Offerings.length) {
        const offIssues = [];
        Offerings.forEach((o, idx) => {
          const oIssues = [];
          if (!o.name) oIssues.push("Offering name missing.");
          if (!o.description) oIssues.push("Add 1–2 lines describing the offering/value.");
          if (oIssues.length) offIssues.push({ offering: o.name || `Offering ${idx + 1}`, issues: oIssues });
        });
        if (offIssues.length) sections.Offerings = offIssues;
      }

      // SECTION: Interests & Activities
      if (Array.isArray(InterestActivities) && InterestActivities.length) {
        const iaIssues = [];
        InterestActivities.forEach((h, idx) => {
          if (!h.activityType) iaIssues.push(`Activity ${idx + 1}: Add a clear activity name.`);
        });
        if (iaIssues.length) sections["Interests & Activities"] = iaIssues;
      }

      // SECTION: Preferences
      if (Preferences && typeof Preferences === "object") {
        const prefIssues = [];
        if (Array.isArray(Preferences.locations) && Preferences.locations.length > 5)
          prefIssues.push("Too many preferred locations—narrow to 3–5.");
        if (prefIssues.length) sections.Preferences = prefIssues;
      }

      // Missing Keywords vs JD
      const missingKeywords = [];
      if (atsJD.trim()) {
        const jdWords = Array.from(
          new Set(
            atsJD
              .toLowerCase()
              .replace(/[^a-z0-9+\-/#. ]/g, " ")
              .split(/\s+/)
              .filter((w) => w.length > 2 && !["and","the","for","with","you","are","our","this","that","from","your"].includes(w))
          )
        );
        jdWords.forEach((kw) => {
          if (!allTextMemo.includes(kw)) missingKeywords.push(kw);
        });
      }

      // Score heuristic (start 100, subtract)
      let score = 100;
      const subtract = (n) => (score = Math.max(0, score - n));

      // Header penalties
      if (sections.Header?.length) subtract(10);
      if (!linkedinUrl && !githubUrl) subtract(5);

      // Summary
      if (sections.Summary?.length) subtract(6);

      // Experience
      const expPenalties =
        (sections.Experience || [])
          .flatMap((e) => e.issues || [])
          .length || 0;
      subtract(Math.min(14, expPenalties * 2));

      // Projects
      const projPenalties =
        (sections.Projects || [])
          .flatMap((e) => e.issues || [])
          .length || 0;
      subtract(Math.min(10, projPenalties * 2));

      // Skills
      if (sections.Skills?.length) subtract(6);

      // Awards/Publications minor
      if (sections["Awards & Recognitions"]?.length) subtract(2);
      if (sections["Publications & Patents"]?.length) subtract(2);

      // Preferences minor
      if (sections.Preferences?.length) subtract(1);

      // Missing keywords (cap 20 points)
      if (missingKeywords.length) subtract(Math.min(20, Math.ceil(missingKeywords.length / 5) * 3));

      const report = {
        score,
        summary: {
          message:
            score >= 85
              ? "ATS friendly. Minor refinements suggested."
              : score >= 70
              ? "Good baseline. Address the highlighted issues to improve ATS match."
              : "Significant improvements needed. Fix the issues per section below.",
        },
        missingKeywords,
        sections,
        recommendations: [
          "Align bullets with strong action verbs and add measurable impact (%, time saved, throughput, users).",
          "Mirror terminology from the target JD carefully (skills, tools, frameworks).",
          "Keep the summary concise (40–80 words) and targeted to the role.",
          "Ensure links (LinkedIn, GitHub, portfolio) are valid and visible.",
          "For non-current roles, prefer past tense; for current roles, present tense is acceptable.",
        ],
      };

      setAtsReport(report);
      setAtsLoading(false);
    }, 600);
  };

  // Sequence strictly as per sample:
  // Experience → Education → Projects → Skills → Relevant Coursework → Coding Profiles → Awards & Recognitions → Publications & Patents → Offerings → Interests & Activities → Preferences
  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6 pt-24">
      {/* Top bar: back + actions */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-wrap gap-3 justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-black">
          ← Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => setAtsOpen((v) => !v)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            aria-expanded={atsOpen}
            aria-controls="ats-panel"
            title="Run ATS Check"
          >
            {atsOpen ? "Close ATS" : "ATS Check"}
          </button>
          <button
            onClick={downloadPdf}
            disabled={loading}
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950 disabled:opacity-60"
          >
            {loading ? "Preparing..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* ATS Panel */}
      {atsOpen && (
        <div
          id="ats-panel"
          className="max-w-6xl mx-auto mb-6 bg-white border rounded-2xl shadow p-6"
          role="region"
          aria-label="ATS Analysis"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Job Description / Keywords (optional)
              </label>
              <textarea
                value={atsJD}
                onChange={(e) => setAtsJD(e.target.value)}
                rows={4}
                placeholder="Paste JD or comma-separated keywords to check for missing terms"
                className="w-full border rounded-lg p-3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Example keywords: React, Node.js, REST API, SQL, AWS, Microservices, Kubernetes
              </p>
            </div>
            <div className="shrink-0">
              <button
                onClick={runAtsCheck}
                disabled={atsLoading}
                className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
              >
                {atsLoading ? "Analyzing..." : "Run ATS Check"}
              </button>
            </div>
          </div>

          {atsReport && (
            <div className="mt-6">
              {/* Score */}
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold">ATS Score:</div>
                <div className="flex-1">
                  <div className="h-3 w-full bg-gray-200 rounded">
                    <div
                      className={`h-3 rounded ${
                        atsReport.score >= 85
                          ? "bg-green-500"
                          : atsReport.score >= 70
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${atsReport.score}%` }}
                    />
                  </div>
                </div>
                <div className="w-14 text-right font-semibold">{atsReport.score}/100</div>
              </div>
              <p className="mt-2 text-sm text-gray-700">{atsReport.summary.message}</p>

              {/* Missing keywords */}
              {atsReport.missingKeywords?.length > 0 && (
                <div className="mt-5">
                  <h3 className="font-semibold text-gray-800">Missing Keywords (from JD)</h3>
                  <p className="text-sm text-gray-600">
                    Consider adding or mirroring these terms where relevant:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {atsReport.missingKeywords.map((k, i) => (
                      <span key={i} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Section-wise issues */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(atsReport.sections || {}).map(([section, problems], i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{section}</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      {Array.isArray(problems)
                        ? problems.map((p, idx) =>
                            typeof p === "string" ? (
                              <li key={idx}>{p}</li>
                            ) : (
                              <li key={idx}>
                                <span className="font-medium">{p.role || p.project || p.edu || p.award || p.item || p.offering || `Item ${idx + 1}`}:</span>{" "}
                                <ul className="list-disc pl-5">
                                  {(p.issues || []).map((x, j) => (
                                    <li key={j}>{x}</li>
                                  ))}
                                </ul>
                              </li>
                            )
                          )
                        : null}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              {atsReport.recommendations?.length ? (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800">General Recommendations</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mt-2">
                    {atsReport.recommendations.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}

      {/* Classic template only */}
      <div
        ref={resumeRef}
        className="max-w-3xl mx-auto bg-white p-10 shadow-sm text-gray-900"
        style={{ pageBreakInside: "avoid" }}
      >
        {/* Header */}
        <header className="text-center" style={{ fontFamily: `'Georgia','Times New Roman',serif` }}>
          <h1 className="text-4xl font-bold tracking-wide">
            {(info.fullName || "Your Name").toUpperCase()}
          </h1>

          <div className="mt-2 text-sm text-gray-700 flex flex-wrap gap-x-2 gap-y-1 justify-center">
            {info.phone && <span>{info.phone}</span>}
            {info.phone && (info.email || linkItems.length) && <span>|</span>}
            {info.email && <span>{info.email}</span>}
            {(info.phone || info.email) && linkItems.length > 0 && <span>|</span>}
            {linkItems.map((l, idx) => (
              <span key={idx} className="flex items-center gap-1">
                {l.key === "in" && (
                  <span className="inline-block w-4 h-4 rounded-[3px] bg-blue-700 text-white text-[10px] leading-4 text-center font-bold">
                    in
                  </span>
                )}
                {l.key === "gh" && (
                  <span className="inline-block w-4 h-4 text-black" aria-hidden>
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                      <path d="M8 0C3.58 0 0 3.58 0 8a8.01 8.01 0 005.47 7.59c.4.07.55-.17.55-.38v-1.33c-2.23.49-2.7-1.07-2.7-1.07-.36-.91-.88-1.16-.88-1.16-.72-.5.05-.49.05-.49.79.06 1.2.82 1.2.82.71 1.22 1.87.87 2.33.67.07-.52.28-.87.51-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82a7.62 7.62 0 012.01-.27c.68 0 1.36.09 2 .27 1.54-1.03 2.21-.82 2.21-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.28.82 2.15 0 3.07-1.88 3.75-3.67 3.95.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </span>
                )}
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-blue-700">
                  {l.label}
                </a>
                {idx < linkItems.length - 1 && <span className="mx-1">|</span>}
              </span>
            ))}
          </div>
        </header>

        {/* Optional Summary (now rendered below header if provided) */}
        {summary && (
          <section className="mt-4">
            <div
              className="text-[15px] text-gray-800 leading-relaxed"
              style={{ pageBreakInside: "avoid" }}
            >
              {summary}
            </div>
          </section>
        )}

        {/* EXPERIENCE */}
        {Array.isArray(workList) && workList.length > 0 && (
          <section className="mt-6" style={{ pageBreakInside: "avoid" }}>
            <Title>Experience</Title>
            <div className="space-y-4">
              {workList.map((w, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <div className="font-semibold">
                      {w.company}
                      {w.jobTitle ? <span className="italic font-normal"> ({w.jobTitle})</span> : null}
                    </div>
                    <div className="text-sm italic text-gray-700">
                      {range(w.startDate, w.endDate, w.current)}
                    </div>
                  </div>
                  {w.location && (
                    <div className="text-sm text-gray-700 text-right -mt-1"> {w.location}</div>
                  )}
                  {w.responsibilities && bulletLines(w.responsibilities).length > 0 && (
                    <div className="mt-2 text-[15px] leading-relaxed space-y-1">
                      {bulletLines(w.responsibilities).map((b, idx) => (
                        <Bullet key={idx}>{b}</Bullet>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {Array.isArray(educationList) && educationList.length > 0 && (
          <section className="mt-6" style={{ pageBreakInside: "avoid" }}>
            <Title>Education</Title>
            <div className="space-y-3">
              {educationList.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <div className="font-semibold">{e.school}</div>
                    <div className="text-sm italic text-gray-700">
                      {range(e.startDate, e.endDate)}
                    </div>
                  </div>
                  <div className="italic text-[15px] text-gray-800">
                    {[e.degree, e.specialization].filter(Boolean).join(" of ")}
                  </div>
                  {e.location && <div className="text-sm text-gray-700">{e.location}</div>}
                  {e.description && <div className="text-[15px] mt-1">– {e.description}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {Array.isArray(portfolioList) && portfolioList.length > 0 && (
          <section className="mt-6" style={{ pageBreakInside: "avoid" }}>
            <Title>Projects</Title>
            <div className="space-y-4">
              {portfolioList.map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <div className="font-semibold">{p.projectName || p.projectType}</div>
                    {p.keyLinks && (
                      <a
                        href={ensureProtocol(p.keyLinks)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 text-sm"
                        title="Open link"
                      >
                        ↗
                      </a>
                    )}
                  </div>
                  {(p.tech || p.stack) && (
                    <div className="italic text-[15px] text-gray-800">
                      {p.tech || p.stack}
                    </div>
                  )}
                  <div className="mt-1 text-[15px] leading-relaxed space-y-1">
                    {p.summary && <Bullet>{p.summary}</Bullet>}
                    {p.points &&
                      bulletLines(p.points).map((b, idx) => <Bullet key={idx}>{b}</Bullet>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {Array.isArray(abilities) && abilities.length > 0 && (
          <section className="mt-6" style={{ pageBreakInside: "avoid" }}>
            <Title>Skills</Title>
            <div className="space-y-1 text-[15px]">
              <div>
                •{" "}
                {(abilities || [])
                  .map((s) => (typeof s === "string" ? s : s?.level ? `${s.name} (${s.level})` : s?.name || ""))
                  .filter(Boolean)
                  .join(", ")}
              </div>
            </div>
          </section>
        )}

        {/* RELEVANT COURSEWORK */}
        {(info.relevantCoursework ||
          (Array.isArray(learningList) && learningList.length > 0)) && (
          <section className="mt-6" style={{ pageBreakInside: "avoid" }}>
            <Title>Relevant Coursework</Title>
            <div className="text-[15px]">
              {info.relevantCoursework
                ? info.relevantCoursework
                : learningList
                    .map((c) => c?.courseName)
                    .filter(Boolean)
                    .join("  |  ")}
            </div>
          </section>
        )}

        {/* CODING PROFILES */}
        {(info.leetcode || info.hackerrank) && (
          <section className="mt-6" style={{ pageBreakInside: "avoid" }}>
            <Title>Coding Profiles</Title>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
              {info.leetcode && (
                <a
                  href={ensureProtocol(info.leetcode)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span className="inline-block w-4 h-4" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.53 7.47a.75.75 0 010 1.06l-7 7a.75.75 0 11-1.06-1.06l7-7a.75.75 0 011.06 0z" />
                      <path d="M12 5a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0A9 9 0 013 12z" />
                    </svg>
                  </span>
                  <span>LeetCode: {displayUrl(info.leetcode)}</span>
                </a>
              )}
              {info.hackerrank && (
                <a
                  href={ensureProtocol(info.hackerrank)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span className="inline-block w-4 h-4 rounded-sm bg-black text-white text-[10px] leading-4 text-center">
                    HR
                  </span>
                  <span>HackerRank: {displayUrl(info.hackerrank)}</span>
                </a>
              )}
            </div>
          </section>
        )}

        {/* AWARDS & RECOGNITIONS */}
        {Array.isArray(recognitions) && recognitions.length > 0 && (
          <section className="mt-6" style={{ pageBreakInside: "avoid" }}>
            <Title>Awards & Recognitions</Title>
            <div className="space-y-3">
              {recognitions.map((r, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <div className="font-semibold">
                      {r.awardName || r.type}
                      {r.issueAuthority ? (
                        <span className="text-gray-700"> — {r.issueAuthority}</span>
                      ) : null}
                    </div>
                    {r.issueDate && (
                      <div className="text-sm italic text-gray-700">{r.issueDate}</div>
                    )}
                  </div>
                  {r.description && (
                    <div className="mt-1 text-[15px]">
                      <Bullet>{r.description}</Bullet>
                    </div>
                  )}
                  {r.referenceLink && (
                    <div className="text-xs text-blue-700 mt-1 break-all">
                      <a href={ensureProtocol(r.referenceLink)} target="_blank" rel="noopener noreferrer">
                        {displayUrl(r.referenceLink)}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PUBLICATIONS & PATENTS */}
        {Array.isArray(intellectualList) && intellectualList.length > 0 && (
          <section className="mt-6" style={{ pageBreakInside: "avoid" }}>
            <Title>Publications & Patents</Title>
            <div className="space-y-3">
              {intellectualList.map((ip, i) => (
                <div key={i}>
                  <div className="font-semibold">
                    {ip.title}{" "}
                    {ip.recognitionType ? (
                      <span className="text-gray-700">({ip.recognitionType})</span>
                    ) : null}
                  </div>
                  {ip.status && (
                    <div className="text-xs text-gray-700 mt-1">
                      Status: {ip.status} {ip.applicationNumber ? `• ${ip.applicationNumber}` : ""}
                    </div>
                  )}
                  {ip.description && (
                    <div className="mt-1 text-[15px]">
                      <Bullet>{ip.description}</Bullet>
                    </div>
                  )}
                  {ip.url && (
                    <div className="text-xs text-blue-700 mt-1 break-all">
                      <a href={ensureProtocol(ip.url)} target="_blank" rel="noopener noreferrer">
                        {displayUrl(ip.url)}
                      </a>
                    </div>
                  )}
                  {Array.isArray(ip.inventors) && ip.inventors.length > 0 && (
                    <div className="text-xs text-gray-700 mt-1">
                      {ip.recognitionType === "Patent" ? "Inventors" : "Authors"}:{" "}
                      {ip.inventors.map((inv) => inv?.name).filter(Boolean).join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* OFFERINGS */}
        {Array.isArray(Offerings) && Offerings.length > 0 && (
          <section className="mt-6" style={{ pageBreakInside: "avoid" }}>
            <Title>Offerings</Title>
            <div className="space-y-2">
              {Offerings.map((o, i) => (
                <div key={i}>
                  <div className="font-semibold">{o.name}</div>
                  {o.description && (
                    <div className="text-[15px]">
                      <Bullet>{o.description}</Bullet>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* INTERESTS & ACTIVITIES */}
        {Array.isArray(InterestActivities) && InterestActivities.length > 0 && (
          <section className="mt-6" style={{ pageBreakInside: "avoid" }}>
            <Title>Interests & Activities</Title>
            <ul className="flex flex-wrap gap-2">
              {InterestActivities.map((h, i) => (
                <li key={i} className="text-sm px-3 py-1 bg-gray-100 rounded border text-gray-800">
                  {h.activityType}
                </li>
              ))}
            </ul>
            {InterestActivities.some((h) => h.description) && (
              <div className="mt-2 text-[15px] space-y-1">
                {InterestActivities.map((h, i) =>
                  h.description ? <Bullet key={i}>{h.description}</Bullet> : null
                )}
              </div>
            )}
          </section>
        )}

        {/* PREFERENCES */}
        {Preferences && Object.keys(Preferences).length > 0 && (
          <section className="mt-6" style={{ pageBreakInside: "avoid" }}>
            <Title>Preferences</Title>
            <div className="text-[15px] space-y-1">
              {Array.isArray(Preferences.locations) && Preferences.locations.length > 0 && (
                <div>Locations: {Preferences.locations.join(", ")}</div>
              )}
              {Preferences.workMode && <div>Work Mode: {Preferences.workMode}</div>}
              {Preferences.employmentType && <div>Employment: {Preferences.employmentType}</div>}
              {Array.isArray(Preferences.industries) && Preferences.industries.length > 0 && (
                <div>Industries: {Preferences.industries.join(", ")}</div>
              )}
              {Array.isArray(Preferences.jobRoles) && Preferences.jobRoles.length > 0 && (
                <div>Roles: {Preferences.jobRoles.join(", ")}</div>
              )}
              {Preferences.timezone && <div>Timezone: {Preferences.timezone}</div>}
              {(Preferences.startTime || Preferences.endTime) && (
                <div>
                  Work Hours: {Preferences.startTime || ""}
                  {Preferences.startTime && Preferences.endTime ? " - " : ""}
                  {Preferences.endTime || ""}
                </div>
              )}
              {(Preferences.currency || Preferences.income || Preferences.frequency) && (
                <div>
                  Compensation:{" "}
                  {[Preferences.currency, Preferences.income, Preferences.frequency]
                    .filter(Boolean)
                    .join(" ")}
                </div>
              )}
              {Preferences.noticePeriod && <div>Notice: {Preferences.noticePeriod}</div>}
              {Preferences.travel && <div>Travel: {Preferences.travel}</div>}
              {Preferences.relocate && <div>Relocate: {Preferences.relocate}</div>}
              {Preferences.companySize && <div>Company Size: {Preferences.companySize}</div>}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;