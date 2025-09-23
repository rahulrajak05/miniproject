import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { useProfile } from '../context/ProfileContext';

const tabSections = ['Portfolio', 'Skills Learned', 'Testimonials', 'Recognition', 'Tools Used'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const WorkExperienceStep3 = () => {
  const navigate = useNavigate();
  const { addWork } = useProfile();

  // Form state for all fields
  const [employmentType, setEmploymentType] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [current, setCurrent] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState(false);
  const [responsibilities, setResponsibilities] = useState('');
  // Tabs
  const [portfolio, setPortfolio] = useState('');
  const [skills, setSkills] = useState('');
  const [testimonials, setTestimonials] = useState('');
  const [recognition, setRecognition] = useState('');
  const [tools, setTools] = useState('');

  const [selectedTabs] = useState(tabSections);

  const handleSubmit = (e) => {
    e.preventDefault();
    addWork({
      employmentType,
      jobTitle,
      company,
      companyUrl,
      current,
      startDate,
      endDate,
      location,
      remote,
      responsibilities,
      portfolio,
      skills,
      testimonials,
      recognition,
      tools,
    });
    navigate('/myprofile');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow rounded-lg mt-6 mb-10">
      {/* Back Button */}
        <button onClick={() => navigate(-1)} className="mb-4 text-gray-600 hover:text-black">←</button>


      {/* Dynamic Page Heading */}
      <h1 className="text-2xl font-semibold mb-2">
        Edit Work Experience{employmentType ? ` - ${employmentType}` : ''}
      </h1>
      <p className="text-gray-700 mb-6">
        Fill out this page with your work experience details, including your role, responsibilities, and achievements.
      </p>

      {/* Work Experience Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Employment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Employment Type <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-1 border rounded px-3 py-2"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            required
          >
            <option value="">Select employment type</option>
            <option value="Full Time">Full Time</option>
            <option value="Contractual">Contractual</option>
            <option value="Internship">Internship</option>
            <option value="Part-time">Part-time</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Freelancer">Freelancer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title<span className="text-red-500">*</span>
          </label>
          <input type="text" className="w-full mt-1 border rounded px-3 py-2" value={jobTitle} onChange={e => setJobTitle(e.target.value)} required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company<span className="text-red-500">*</span>
            </label>
            <input type="text" className="w-full mt-1 border rounded px-3 py-2" value={company} onChange={e => setCompany(e.target.value)} required />
            <p className="text-xs text-gray-500 mt-1">Enter the full name of the company</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company URL</label>
            <input type="text" className="w-full mt-1 border rounded px-3 py-2" value={companyUrl} onChange={e => setCompanyUrl(e.target.value)} />
            <p className="text-xs text-gray-500 mt-1">
              Include a link to the company’s website or LinkedIn profile
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" checked={current} onChange={e => setCurrent(e.target.checked)} /> I am currently working in this role
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date<span className="text-red-500">*</span>
            </label>
            <input type="date" className="w-full mt-1 border rounded px-3 py-2" value={startDate} onChange={e => setStartDate(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input type="date" className="w-full mt-1 border rounded px-3 py-2" value={endDate} onChange={e => setEndDate(e.target.value)} disabled={current} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" className="w-full mt-1 border rounded px-3 py-2" value={location} onChange={e => setLocation(e.target.value)} />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" checked={remote} onChange={e => setRemote(e.target.checked)} /> I am working remote
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Responsibilities<span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full mt-1 border rounded px-3 py-2"
            rows="6"
            required
            placeholder="Describe your key contributions, achievements, and the impact you had in this role."
            value={responsibilities}
            onChange={e => setResponsibilities(e.target.value)}
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">
            Focus on measurable results and specific projects
          </p>
        </div>

        {/* Tabs for Additional Sections */}
        <div className="mt-8">
          <h2 className="text-md font-semibold mb-4">
            Additional Information Sections (Add up to 3)
          </h2>

          <Tab.Group>
            <Tab.List className="flex space-x-2 border-b">
              {selectedTabs.map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    classNames(
                      'py-2 px-4 text-sm font-medium',
                      selected ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
                    )
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-4 border rounded p-4 bg-gray-50">
              <Tab.Panel>
                <label className="block mb-2 font-medium text-sm">Link Portfolio Items</label>
                <select className="w-full border rounded px-3 py-2" value={portfolio} onChange={e => setPortfolio(e.target.value)}>
                  <option value="">Select Portfolio Items</option>
                </select>
                <p className="text-xs text-blue-700 mt-2">
                  ℹ️ Only existing portfolio items are available to link. To link new work, first add it to your portfolio.
                </p>
              </Tab.Panel>
              <Tab.Panel>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows="4"
                  placeholder="List key skills you learned..."
                  value={skills}
                  onChange={e => setSkills(e.target.value)}
                ></textarea>
              </Tab.Panel>
              <Tab.Panel>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows="4"
                  placeholder="Write any testimonials received..."
                  value={testimonials}
                  onChange={e => setTestimonials(e.target.value)}
                ></textarea>
              </Tab.Panel>
              <Tab.Panel>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows="4"
                  placeholder="Mention any recognition or awards..."
                  value={recognition}
                  onChange={e => setRecognition(e.target.value)}
                ></textarea>
              </Tab.Panel>
              <Tab.Panel>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows="4"
                  placeholder="List tools used..."
                  value={tools}
                  onChange={e => setTools(e.target.value)}
                ></textarea>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Save/Cancel Buttons */}
        <div className="mt-6 flex justify-start gap-4">
          <button
            type="submit"
            className="bg-sky-800 text-white px-6 py-2 rounded hover:bg-sky-900"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate('/myprofile')}
            className="border px-6 py-2 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkExperienceStep3;
