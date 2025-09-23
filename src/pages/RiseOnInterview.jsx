import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import meta from "../assets/meta.png";
import salesforce from "../assets/salesforce.png";
import adobe from "../assets/adobe.png";
import airind from "../assets/airind.png";
import apolo from "../assets/apolo.png";
import blinkit from "../assets/blinkit.svg";
import delhivery from "../assets/delhivery.png";
import Infosys from "../assets/Infosys.png";
import hcl from "../assets/hcl.webp";
import TechMahindra from "../assets/TechMahindra.png";
import Cognizant from "../assets/Cognizant.png";
import LTIMindtree from "../assets/LTIMindtree.png";
import Mphasis from "../assets/Mphasis.png";
import Accenture from "../assets/Accenture.png";
import Lenskart from "../assets/Lenskart.jpeg";
import MakeMyTrip from "../assets/MakeMyTrip.png";
import Capgemini from "../assets/Capgemini.png";
import Cisco from "../assets/Cisco.png";
import DXCTechnology from "../assets/DXCTechnology.jpeg";
import tcs from "../assets/tcs.png";
import Wipro from "../assets/Wipro.png";
import deloitte from "../assets/deloitte.png";
import facebook from "../assets/facebook.png";
import paytm from "../assets/paytm.png";
import siemens from "../assets/siemens.png";
import zoho from "../assets/zoho.png";
import visa from "../assets/visa.png";
import walmart from "../assets/walmart.png";
import pwc from "../assets/pwc.jpeg";



export default function App() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      const mockData = {
    companies: [
  // --- Original Big Tech ---
  { id: "google", name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { id: "microsoft", name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { id: "amazon", name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { id: "apple", name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { id: "meta", name: "Meta", logo: meta },
  { id: "netflix", name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { id: "ibm", name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { id: "oracle", name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { id: "salesforce", name: "Salesforce", logo: salesforce },
  { id: "adobe", name: "Adobe", logo: adobe },

  // --- Indian / Global Companies (fixed logos) ---
  { id: "air-india", name: "Air India", logo: airind },
  { id: "apollo", name: "Apollo Tyres", logo: apolo },
  { id: "blinkit", name: "Blinkit", logo: blinkit }, // ✅ Transparent version
  { id: "delhivery", name: "Delhivery", logo: delhivery },
  { id: "Infosys", name: "Infosys", logo: Infosys },
  { id: "HCL Technologies", name: "HCL Technologies", logo: hcl }, // ✅ better logo
  { id: "Tech Mahindra", name: "Tech Mahindra", logo:TechMahindra }, // ✅ clear
  { id: "Cognizant", name: "Cognizant", logo: Cognizant }, // ✅ vector
  { id: "LTIMindtree", name: "LTIMindtree", logo: LTIMindtree }, 
  { id: "Mphasis", name: "Mphasis", logo: Mphasis },
  { id: "Accenture", name: "Accenture", logo: Accenture },
  { id: "lenskart", name: "Lenskart", logo: Lenskart }, // ✅ Transparent
  { id: "makemytrip", name: "MakeMyTrip", logo: MakeMyTrip},
  { id: "Capgemini", name: "Capgemini", logo: Capgemini },
  { id: "Cisco ", name: "Cisco ", logo: Cisco },
  { id: "DXC Technology", name: "DXC Technology", logo: DXCTechnology },
  { id: "Tcs", name: "Tcs", logo: tcs },
  { id: "Wipro", name: "Wipro", logo: Wipro },
  { id: "deloitte", name: "deloitte", logo:deloitte },
  { id: "Facebook", name: "Facebook", logo: facebook },
  { id: "paytm", name: "paytm", logo: paytm},
  { id: "siemens", name: "siemens", logo: siemens },
  { id: "zoho", name: "zoho", logo: zoho },
  { id: "visa", name: "visa", logo: visa },
  { id: "pwc", name: "pwc", logo: pwc },
  { id: "walmart", name: "walmart", logo: walmart },
  
]
      };


      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCompanies(mockData.companies);
      setLoading(false);
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-700">
          Loading companies...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* ✅ Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-500 to-indigo-700 shadow-xl text-white p-6 border-r border-indigo-800">
        <h2 className="text-3xl font-bold mb-10">Dashboard</h2>
        <nav className="space-y-6 text-lg font-semibold">
          <Link to="/myaccount" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all">
            Profile
          </Link>
          <Link to="/dashboard" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all">
            Dashboard
          </Link>
          <Link to="/riseon-coverletter" className="block text-yellow-300 font-bold underline">
            Forwarding Letter
          </Link>
          <Link to="/riseon-interview" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all">
            Interview
          </Link>
          <Link to="/riseon-job-boards" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all">
            Job Portals
          </Link>
          <Link to="/riseon-quiz" className="block text-white/80 hover:text-yellow-300 hover:underline transition-all">
            Quiz
          </Link>
          <span className="block text-white/50">Counsellor (Coming Soon)</span>
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <header className="bg-white shadow py-6 sticky top-0 z-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold text-orange-600">
              IT Companies
            </h1>
            <p className="mt-2 text-gray-600 text-lg">
              Browse top IT companies
            </p>

            {/* 🔍 Search Input */}
            <div className="mt-6 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12">
          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center p-6 border border-gray-200"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} Logo`}
                    className="w-28 h-28 mb-4 rounded-full border-2 border-gray-300 object-contain bg-gray-50"
                  />
                  <h2 className="text-xl font-semibold text-gray-900">
                    {company.name}
                  </h2>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg mt-10">
              No companies found.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
