import React from "react";

const CoverLetter = ({ letter }) => {
  if (!letter) return null;

  const {
    recipientName,
    recipientPosition,
    companyName,
    companyAddress,
    date,
    greeting,
    body,
    closing,
    senderName,
  } = letter;

  return (
    
    <div className="bg-white shadow-md rounded-xl p-6 leading-relaxed text-gray-800 space-y-4">

            {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 shadow-xl text-white p-6 transition-all duration-300 ease-in-out border-r border-indigo-800">
        <h2 className="text-3xl font-bold mb-10">Dashboard</h2>
        <nav className="space-y-6 text-lg font-semibold">
          <Link 
            to="/myaccount" 
            className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
          >
            Profile
          </Link>
          <Link 
            to="/dashboard" 
            className="block text-yellow-300 font-bold underline"
          >
            Dashboard
          </Link>
          <Link 
            to="/riseon-coverletter" 
            className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
          >
            Forwarding letter
          </Link>
          <Link 
            to="/riseon-interview" 
            className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
          >
            Interview
          </Link>
          <Link 
            to="/riseon-job-boards" 
            className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
          >
            Job Portals
          </Link>
          <Link 
            to="/riseon-quiz" 
            className="block text-white/80 hover:text-yellow-300 hover:underline transition-all duration-300"
          >
            Quiz
          </Link>
          <span className="block text-white/50">Counsellor (Coming Soon)</span>
        </nav>
      </aside>
      
      

      
      <div className="text-right text-sm text-gray-500">{date}</div>
      <div>
        <p className="font-medium">
          {recipientName}
          <br />
          {recipientPosition}
          <br />
          {companyName}
          <br />
          {companyAddress}
        </p>
      </div>

      <div>
        <p>{greeting}</p>
      </div>

      <div className="space-y-4">
        {body?.split("\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div>
        <p>{closing}</p>
        <p className="mt-2 font-semibold">{senderName}</p>
      </div>
    </div>
  );
};

export default CoverLetter;
