import React, { useState, useEffect, useRef } from "react";
import {
  Download,
  FileText,
  User,
  Mail,
  Building,
  Briefcase,
  Phone,
  Globe,
  MapPin,
  UserCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import pro from "../assets/profile.png";
import resume from "../assets/resume.png";
import letter from "../assets/letter.png";
import interview from "../assets/interview.png";
import job from "../assets/job.png";
import quiz from "../assets/quiz.png";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

// Utility: quick safe setter (only if current is empty and value exists)
const setIfEmpty = (setter, currentValue, nextValue) => {
  if (!currentValue && nextValue) setter(nextValue);
};

// Utility: split one-line address into street and city/state/zip heuristically
const splitAddress = (full = "") => {
  const s = String(full).trim();
  if (!s) return { street: "", cityzip: "" };
  // Try split by last comma
  const parts = s.split(",").map((p) => p.trim());
  if (parts.length >= 2) {
    const cityzip = parts.slice(-1)[0];
    const street = parts.slice(0, -1).join(", ");
    return { street, cityzip };
  }
  // Try zip-like ending
  const m = s.match(/(.+?)\s+([A-Za-z].*\d{3,6})$/);
  if (m) return { street: m[1].trim(), cityzip: m[2].trim() };
  return { street: s, cityzip: "" };
};

// Utility: parse JD for recipient details
const parseToFromJD = (jd = "") => {
  const text = String(jd);
  // Hiring Manager or contact
  const hm = text.match(
    /(Hiring\s*Manager|Recruiter|Talent\s*Acquisition|HR)\s*[:\-]\s*([A-Za-z .,'\-]+)/i
  );
  const recipientName = hm ? hm[2].trim() : "";

  // Address line (generic)
  const addr = text.match(/(?:Address|Office)\s*[:\-]\s*([^\n\r]+)/i);
  const recipientAddress = addr ? addr[1].trim() : "";

  // Location line
  const loc =
    text.match(/Location\s*[:\-]\s*([^\n\r]+)/i) ||
    text.match(/City\s*[:\-]\s*([^\n\r]+)/i);
  const recipientCityZip = loc ? loc[1].trim() : "";

  return { recipientName, recipientAddress, recipientCityZip };
};

const RiseOnCoverLetter = () => {
  const navigate = useNavigate();

  // Sender (From) details
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderWebsite, setSenderWebsite] = useState("");
  const [senderAddress, setSenderAddress] = useState(""); // Street/Area
  const [senderCityZip, setSenderCityZip] = useState(""); // City, State ZIP

  // Job and company
  const [profile, setProfile] = useState(""); // your core profile (e.g., MERN Developer)
  const [targetRole, setTargetRole] = useState(""); // role you're applying for
  const [company, setCompany] = useState("");

  // Recipient (To) block
  const [recipientName, setRecipientName] = useState("");
  const [recipientTitle, setRecipientTitle] = useState("Hiring Manager");
  const [recipientAddress, setRecipientAddress] = useState(""); // street, area
  const [recipientCityZip, setRecipientCityZip] = useState(""); // City, State ZIP

  // Letter content
  const [jobDescription, setJobDescription] = useState("");
  const [touched, setTouched] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAt, setGeneratedAt] = useState("");
  const [todayStr, setTodayStr] = useState("");
  const [paragraphs, setParagraphs] = useState([]); // structured body paragraphs

  // DOM ref for styled PDF export (html2pdf)
  const coverRef = useRef(null);

  // Autofill FROM (sender) from stored info + userEmail
  useEffect(() => {
    // Auto fill email from localStorage
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) setIfEmpty(setSenderEmail, senderEmail, userEmail);

    // Auto fill "From" block from informationList if present
    try {
      const infoRaw = localStorage.getItem("informationList");
      if (infoRaw) {
        const arr = JSON.parse(infoRaw);
        const info = Array.isArray(arr) ? arr[0] : null;
        if (info) {
          setIfEmpty(setSenderName, senderName, info.fullName);
          setIfEmpty(setSenderEmail, senderEmail, info.email);
          setIfEmpty(setSenderPhone, senderPhone, info.phone);
          if (info.address) {
            const parts = splitAddress(info.address);
            setIfEmpty(setSenderAddress, senderAddress, parts.street || info.address);
            setIfEmpty(setSenderCityZip, senderCityZip, parts.cityzip);
          }
          if (info.portfolio) setIfEmpty(setSenderWebsite, senderWebsite, info.portfolio);
          else if (info.linkedin) setIfEmpty(setSenderWebsite, senderWebsite, info.linkedin);
        }
      }
    } catch (e) {
      // ignore parse errors
    }

    // Auto date
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTodayStr(formattedDate);
    setGeneratedAt(`${formattedDate}, ${formattedTime}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autofill TO (recipient) from last used + JD parsing + company presence
  useEffect(() => {
    // 1) From last saved
    try {
      const lastToRaw = localStorage.getItem("coverletter_to_last");
      if (lastToRaw) {
        const last = JSON.parse(lastToRaw);
        setIfEmpty(setRecipientName, recipientName, last.recipientName);
        setIfEmpty(setRecipientTitle, recipientTitle, last.recipientTitle || "Hiring Manager");
        setIfEmpty(setRecipientAddress, recipientAddress, last.recipientAddress);
        setIfEmpty(setRecipientCityZip, recipientCityZip, last.recipientCityZip);
      }
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Parse JD when it changes
  useEffect(() => {
    if (!jobDescription) return;
    const parsed = parseToFromJD(jobDescription);
    if (parsed.recipientName) setIfEmpty(setRecipientName, recipientName, parsed.recipientName);
    if (parsed.recipientAddress)
      setIfEmpty(setRecipientAddress, recipientAddress, parsed.recipientAddress);
    if (parsed.recipientCityZip)
      setIfEmpty(setRecipientCityZip, recipientCityZip, parsed.recipientCityZip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobDescription]);

  // 3) If company is set but title blank, default to Hiring Manager
  useEffect(() => {
    if (company && !recipientTitle) setRecipientTitle("Hiring Manager");
  }, [company, recipientTitle]);

  // Auto JD seed
  useEffect(() => {
    if (senderName && senderEmail && profile && targetRole && company && !jobDescription) {
      const autoGenerated = `We are seeking a skilled ${targetRole} at ${company}. The ideal candidate should have expertise in ${profile}, strong analytical skills, and a commitment to continuous improvement.`;
      setJobDescription(autoGenerated);
    }
  }, [senderName, senderEmail, profile, targetRole, company, jobDescription]);

  const handleSubmit = async () => {
    setTouched({
      senderName: true,
      senderEmail: true,
      profile: true,
      targetRole: true,
      company: true,
    });

    if (senderName && senderEmail && profile && targetRole && company) {
      setIsGenerating(true);
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Build body paragraphs to match the provided sample tone
      const p1 = `I am writing to express my interest in the ${targetRole} position at ${company}. With a strong background in ${profile}, I am eager to bring my skills and passion to your team.`;
      const p2 =
        jobDescription?.trim()
          ? jobDescription.trim()
          : `Throughout my career, I have developed experience in delivering high-quality results, collaborating with cross-functional teams, and applying best practices to build reliable, maintainable solutions. I am confident that my capabilities align with your expectations for this role.`;
      const p3 = `Enclosed is my resume, which provides a detailed overview of my qualifications and experience. I believe my skills align with the requirements of the ${targetRole} role at ${company} and would enable me to contribute meaningfully.`;
      const p4 = `I would welcome the opportunity to discuss how my qualifications align with the needs of ${company}. Thank you for your time and consideration. I look forward to hearing from you.`;

      setParagraphs([p1, p2, p3, p4]);
      setIsGenerating(false);

      // Persist TO for next time
      try {
        localStorage.setItem(
          "coverletter_to_last",
          JSON.stringify({
            recipientName,
            recipientTitle,
            recipientAddress,
            recipientCityZip,
            company,
          })
        );
      } catch {}
    }
  };

  // Robust DOM-to-PDF export
  const handleDownloadPDF = async () => {
    if (!coverRef.current) return;

    try {
      const mod = await import("html2pdf.js/dist/html2pdf.bundle.min.js");
      const html2pdf = mod.default || mod;
      const opt = {
        margin: [18, 18, 18, 18],
        filename: `${senderName || "Cover_Letter"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0 },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      };
      await html2pdf().set(opt).from(coverRef.current).save();
    } catch (err) {
      console.error("html2pdf error, fallback to jsPDF:", err);
      try {
        const { jsPDF } = await import("jspdf");
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const margin = 48;
        const pageWidth = doc.internal.pageSize.getWidth();
        const maxWidth = pageWidth - margin * 2;

        const header = "Cover Letter";
        doc.setFont("times", "bold");
        doc.setFontSize(18);
        doc.text(header, pageWidth / 2, margin, { align: "center" });

        doc.setFont("times", "normal");
        doc.setFontSize(11);

        const fromBlock = [
          senderName || "Your Name",
          senderAddress || "Your Address",
          senderCityZip || "City, State, ZIP Code",
          senderEmail || "your@email.com",
          senderPhone || "Your Phone Number",
          todayStr || "",
          "",
        ].join("\n");

        const toBlock = [
          recipientName || (recipientTitle ? recipientTitle : "Hiring Manager"),
          company || "Company Name",
          recipientAddress || "Company Address",
          recipientCityZip || "City, State, ZIP Code",
          "",
        ].join("\n");

        const body = [
          `Dear ${recipientName || "Hiring Manager"},`,
          "",
          ...paragraphs,
          "",
          "Best Regards,",
          senderName || "Your Name",
        ].join("\n");

        let y = margin + 20;
        doc.text(doc.splitTextToSize(fromBlock, maxWidth), margin, y);
        y += 90;
        doc.text(doc.splitTextToSize(toBlock, maxWidth), margin, y);
        y += 90;
        doc.text(doc.splitTextToSize(body, maxWidth), margin, y);

        doc.save(`${senderName || "Cover_Letter"}_fallback.pdf`);
      } catch (fallbackErr) {
        console.error("Fallback jsPDF failed:", fallbackErr);
        alert("Sorry, PDF download failed. Please try again or check the console for details.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 pt-20">
      {/* Sidebar */}
      <aside className="fixed left-0 top-20 w-28 md:w-32 lg:w-40 h-[calc(100vh-5rem)] bg-gradient-to-b from-gray-900 to-gray-700 shadow-xl text-white p-4 md:p-6 border-r border-gray-600 flex flex-col items-center z-40">
        <nav className="flex-1 space-y-6 text-center mt-2">
          <SidebarLink to="/myaccount" img={pro} label="Account" />
          <SidebarLink to="/dashboard" img={resume} label="Dashboard" />
          <SidebarLink to="/riseon-coverletter" img={letter} label="Letter" active />
          <SidebarLink to="/riseon-interview" img={interview} label="Interview" />
          <SidebarLink to="/riseon-job-boards" img={job} label="Jobs" />
          <SidebarLink to="/riseon-quiz" img={quiz} label="Quiz" />
        </nav>
      </aside>

      {/* Main Content */}
      <motion.main
        className="flex-1 p-6 md:p-8 ml-28 md:ml-32 lg:ml-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 text-transparent bg-clip-text">
            Cover Letter Generator
          </h2>
        </div>

        {/* Card */}
        <motion.div
          className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Generate Letter</h1>
            <p className="text-lg opacity-90">Styled like your uploaded sample</p>
          </div>

          {/* Body */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <FormSection
              senderName={senderName}
              senderEmail={senderEmail}
              senderPhone={senderPhone}
              senderWebsite={senderWebsite}
              senderAddress={senderAddress}
              senderCityZip={senderCityZip}
              profile={profile}
              targetRole={targetRole}
              company={company}
              recipientName={recipientName}
              recipientTitle={recipientTitle}
              recipientAddress={recipientAddress}
              recipientCityZip={recipientCityZip}
              jobDescription={jobDescription}
              setSenderName={setSenderName}
              setSenderEmail={setSenderEmail}
              setSenderPhone={setSenderPhone}
              setSenderWebsite={setSenderWebsite}
              setSenderAddress={setSenderAddress}
              setSenderCityZip={setSenderCityZip}
              setProfile={setProfile}
              setTargetRole={setTargetRole}
              setCompany={setCompany}
              setRecipientName={setRecipientName}
              setRecipientTitle={setRecipientTitle}
              setRecipientAddress={setRecipientAddress}
              setRecipientCityZip={setRecipientCityZip}
              setJobDescription={setJobDescription}
              touched={touched}
              setTouched={setTouched}
              isGenerating={isGenerating}
              handleSubmit={handleSubmit}
            />

            {/* Preview (Formatted like your sample) */}
            <motion.div
              className="bg-gray-50 rounded-2xl p-0 border border-gray-200"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between px-6 pt-4">
                <h2 className="text-2xl font-bold text-gray-800">Preview</h2>
                {paragraphs.length > 0 && (
                  <button
                    onClick={handleDownloadPDF}
                    className="mb-2 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-xl shadow-md hover:bg-blue-700 transition-all"
                  >
                    <Download size={16} />
                    Download PDF
                  </button>
                )}
              </div>

              {paragraphs.length > 0 ? (
                <div className="bg-white">
                  {/* A4 canvas to export – mimics yellow bordered sample */}
                  <div
                    ref={coverRef}
                    className="mx-auto my-6 w-full max-w-[900px] bg-white text-gray-900"
                  >
                    {/* Yellow top border */}
                    <div className="h-3 w-full bg-yellow-400" />

                    {/* Title */}
                    <div className="px-10 pt-8 text-center">
                      <div className="text-3xl sm:text-4xl font-extrabold">Cover Letter</div>
                    </div>

                    {/* From/To blocks + body */}
                    <div className="px-10 pt-6 pb-12">
                      {/* From (auto-filled) */}
                      <div className="text-[15px] leading-7 text-gray-800">
                        <div className="whitespace-pre-line">
{`${senderName || "[Your Name]"}
${senderAddress || "[Your Address]"}
${senderCityZip || "[City, State, ZIP Code]"}
${senderEmail || "[Your Email]"}
${senderPhone || "[Your Phone Number]"}
${todayStr || "[Date]"}`}
                        </div>
                      </div>

                      {/* Spacer */}
                      <div className="h-6" />

                      {/* To (auto-filled) */}
                      <div className="text-[15px] leading-7 text-gray-800">
                        <div className="whitespace-pre-line">
{`${recipientName || "[Hiring Manager’s Name]"}
${company || "[Company Name]"}
${recipientAddress || "[Company Address]"}
${recipientCityZip || "[City, State, ZIP Code]"}`}
                        </div>
                      </div>

                      {/* Greeting */}
                      <div className="mt-6 text-[15px] leading-[1.8] text-gray-800 font-serif">
                        <p>
                          Dear {recipientName || "Hiring Manager"},
                        </p>
                      </div>

                      {/* Body paragraphs */}
                      <div className="mt-3 space-y-4 text-[15px] leading-[1.8] text-gray-800 font-serif">
                        {paragraphs.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>

                      {/* Closing */}
                      <div className="mt-6 text-[15px] leading-[1.8] text-gray-800 font-serif">
                        <p>Best Regards,</p>
                        <p className="font-medium">{senderName || "Your Name"}</p>
                      </div>

                      {/* Footer date/time (optional small note) */}
                      {generatedAt && (
                        <div className="mt-4 text-xs text-gray-400 italic">
                          Generated on: {generatedAt}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-200 text-center text-gray-400 m-6">
                  <FileText size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Your cover letter will appear here</p>
                  <p className="text-sm mt-2">Fill out the form and click “Generate Cover Letter”</p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
};

/* ------------- Helper Components ------------- */

const SidebarLink = ({ to, img, label, active }) => (
  <Link
    to={to}
    className={`flex flex-col items-center transition-all duration-300 ${
      active ? "text-yellow-300 scale-110" : "text-white/80 hover:text-yellow-300 hover:scale-105"
    }`}
  >
    <img src={img} alt={label} className="w-10 h-10 rounded-full mb-1" />
    <span className="text-xs">{label}</span>
  </Link>
);

const FormSection = ({
  senderName,
  senderEmail,
  senderPhone,
  senderWebsite,
  senderAddress,
  senderCityZip,
  profile,
  targetRole,
  company,
  recipientName,
  recipientTitle,
  recipientAddress,
  recipientCityZip,
  jobDescription,
  setSenderName,
  setSenderEmail,
  setSenderPhone,
  setSenderWebsite,
  setSenderAddress,
  setSenderCityZip,
  setProfile,
  setTargetRole,
  setCompany,
  setRecipientName,
  setRecipientTitle,
  setRecipientAddress,
  setRecipientCityZip,
  setJobDescription,
  touched,
  setTouched,
  isGenerating,
  handleSubmit,
}) => (
  <motion.div
    className="space-y-6"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    transition={{ delay: 0.2 }}
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Details</h2>

    {/* Sender */}
    <EnhancedInputField
      label="Your Full Name"
      icon={<User size={20} />}
      required
      value={senderName}
      setValue={setSenderName}
      touched={touched}
      setTouched={setTouched}
      fieldName="senderName"
      placeholder="e.g. Your Name"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <EnhancedInputField
        label="Your Email"
        icon={<Mail size={20} />}
        required
        value={senderEmail}
        setValue={setSenderEmail}
        touched={touched}
        setTouched={setTouched}
        fieldName="senderEmail"
        type="email"
        placeholder="e.g. you@example.com"
      />
      <EnhancedInputField
        label="Your Phone"
        icon={<Phone size={20} />}
        value={senderPhone}
        setValue={setSenderPhone}
        touched={touched}
        setTouched={setTouched}
        fieldName="senderPhone"
        placeholder="e.g. 9876543210"
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <EnhancedInputField
        label="Your Address"
        icon={<MapPin size={20} />}
        value={senderAddress}
        setValue={setSenderAddress}
        touched={touched}
        setTouched={setTouched}
        fieldName="senderAddress"
        placeholder="e.g. Gaya"
      />
      <EnhancedInputField
        label="City, State ZIP"
        icon={<MapPin size={20} />}
        value={senderCityZip}
        setValue={setSenderCityZip}
        touched={touched}
        setTouched={setTouched}
        fieldName="senderCityZip"
        placeholder="e.g. Patna, Bihar 45678"
      />
    </div>

    <EnhancedInputField
      label="Your Website (optional)"
      icon={<Globe size={20} />}
      value={senderWebsite}
      setValue={setSenderWebsite}
      touched={touched}
      setTouched={setTouched}
      fieldName="senderWebsite"
      placeholder="e.g. www.example.com"
    />

    {/* Role and company */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <EnhancedInputField
        label="Target Job Role"
        icon={<Briefcase size={20} />}
        required
        value={targetRole}
        setValue={setTargetRole}
        touched={touched}
        setTouched={setTouched}
        fieldName="targetRole"
        placeholder="e.g. Frontend Developer"
      />
      <EnhancedInputField
        label="Company Name"
        icon={<Building size={20} />}
        required
        value={company}
        setValue={setCompany}
        touched={touched}
        setTouched={setTouched}
        fieldName="company"
        placeholder="e.g. Google"
      />
    </div>

    {/* Profile select */}
    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">
        Your Profile <span className="text-red-500">*</span>
      </label>
      <select
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, profile: true }))}
        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
      >
        <option value="">-- Select Profile --</option>
        <option>MERN Stack Developer</option>
        <option>Frontend Developer</option>
        <option>Backend Developer</option>
        <option>Data Scientist</option>
        <option>UI/UX Designer</option>
        <option>Product Manager</option>
        <option>General Practitioner</option>
      </select>
      {!profile && touched.profile && (
        <p className="text-red-500 text-sm mt-1">Please select your profile.</p>
      )}
    </div>

    {/* Recipient block */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <EnhancedInputField
        label="Recipient Name"
        icon={<UserCircle2 size={20} />}
        value={recipientName}
        setValue={setRecipientName}
        touched={touched}
        setTouched={setTouched}
        fieldName="recipientName"
        placeholder="e.g. Sachin Kumar"
      />
      <EnhancedInputField
        label="Recipient Title"
        icon={<Briefcase size={20} />}
        value={recipientTitle}
        setValue={setRecipientTitle}
        touched={touched}
        setTouched={setTouched}
        fieldName="recipientTitle"
        placeholder="e.g. Hiring Manager"
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <EnhancedInputField
        label="Company Address"
        icon={<MapPin size={20} />}
        value={recipientAddress}
        setValue={setRecipientAddress}
        touched={touched}
        setTouched={setTouched}
        fieldName="recipientAddress"
        placeholder="e.g. Gaya Bihar 823001"
      />
      <EnhancedInputField
        label="City, State ZIP"
        icon={<MapPin size={20} />}
        value={recipientCityZip}
        setValue={setRecipientCityZip}
        touched={touched}
        setTouched={setTouched}
        fieldName="recipientCityZip"
        placeholder="e.g. Gaya, Bihar 823001"
      />
    </div>

    {/* JD */}
    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">
        Job Description (Optional)
      </label>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={4}
        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
        placeholder="Paste the job description or leave blank..."
      />
    </div>

    <button
      onClick={handleSubmit}
      disabled={isGenerating}
      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-3"
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          Generating...
        </>
      ) : (
        <>Generate Cover Letter</>
      )}
    </button>
  </motion.div>
);

const EnhancedInputField = ({
  label,
  icon,
  value,
  setValue,
  touched,
  setTouched,
  fieldName,
  placeholder,
  required = false,
  type = "text",
}) => {
  const isInvalid = required && !value && touched[fieldName];
  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">{icon}</div>
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, [fieldName]: true }))}
          placeholder={placeholder}
          className={`w-full border-2 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
            isInvalid ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {isInvalid && <p className="text-red-500 text-sm mt-1">Please enter {label}.</p>}
    </div>
  );
};

export default RiseOnCoverLetter;