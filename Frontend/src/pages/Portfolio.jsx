import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

const Portfolio = () => {
  const navigate = useNavigate();
  const { addPortfolioItem } = useProfile();

  // Form state
  const [projectType, setProjectType] = useState('Project');
  const [projectName, setProjectName] = useState('');
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  const [multimediaUrl, setMultimediaUrl] = useState('');
  const [multimediaFile, setMultimediaFile] = useState(null);
  const [collaboratorName, setCollaboratorName] = useState('');
  const [collaboratorUrl, setCollaboratorUrl] = useState('');
  const [clientName, setClientName] = useState('');
  const [keyLinks, setKeyLinks] = useState('');
  const [downloadableAsset, setDownloadableAsset] = useState(null);

  const handleSave = () => {
    // Basic validation
    if (!projectName || !summary || !details) {
      alert('Please fill in Project Name, Summary, and Details.');
      return;
    }

    const newItem = {
      projectName,
      summary,
      details,
      multimediaUrl,
      multimediaFile,
      collaboratorName,
      collaboratorUrl,
      clientName,
      keyLinks,
      downloadableAsset,
    };

    addPortfolioItem(newItem);
    navigate('/myprofile');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-white max-w-4xl mx-auto p-8 rounded-xl shadow-md">
        <button onClick={() => navigate(-1)} className="mb-4 text-gray-600 hover:text-black">← Back</button>

        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Edit Portfolio - {projectType}
        </h1>

        {/* Project Type */}
        <div className="mb-5">
          <label className="block font-medium text-gray-700 mb-1">Project Type</label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Project">Project</option>
            <option value="Case Study">Case Study</option>
            <option value="Article">Article</option>
          </select>
        </div>

        {/* Project Name */}
        <div className="mb-5">
          <label className="block font-medium text-gray-700 mb-1">Project Name</label>
          <input
            type="text"
            placeholder="Or paste a multimedia URL (e.g., YouTube, Vimeo)"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Summary */}
        <div className="mb-5">
          <label className="block font-medium text-gray-700 mb-1">Project Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
            placeholder="Craft a concise project summary or headline"
          />
        </div>

        {/* Details */}
        <div className="mb-5">
          <label className="block font-medium text-gray-700 mb-1">Project Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={5}
            placeholder="Describe the project in detail..."
          />
        </div>

        {/* Multimedia */}
        <div className="mb-5">
          <label className="block font-medium text-gray-700 mb-1">Add Multimedia</label>
          <input
            type="file"
            onChange={(e) => setMultimediaFile(e.target.files[0])}
            className="w-full border rounded px-3 py-2 mb-2"
          />
          <input
            type="text"
            placeholder="Or paste a multimedia URL (e.g., YouTube, Vimeo)"
            value={multimediaUrl}
            onChange={(e) => setMultimediaUrl(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Collaborators */}
        <div className="mb-5">
          <label className="block font-medium text-gray-700 mb-1">Collaborators</label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={collaboratorName}
              onChange={(e) => setCollaboratorName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Profile URL"
              value={collaboratorUrl}
              onChange={(e) => setCollaboratorUrl(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Client */}
        <div className="mb-5">
          <label className="block font-medium text-gray-700 mb-1">Client / Company Name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. OpenAI, Freelancer"
          />
        </div>

        {/* Key Links */}
        <div className="mb-5">
          <label className="block font-medium text-gray-700 mb-1">Key Links</label>
          <input
            type="text"
            value={keyLinks}
            onChange={(e) => setKeyLinks(e.target.value)}
            placeholder="e.g. GitHub URL, Dribbble shot, Case study link"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Downloadable Assets */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-1">Add Downloadable Assets</label>
          <input
            type="file"
            onChange={(e) => setDownloadableAsset(e.target.files[0])}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-start gap-4 mt-6">
          <button
            className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            onClick={() => navigate('/myprofile')}
            className="border border-gray-400 text-gray-800 px-5 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
