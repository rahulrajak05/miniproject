// src/components/ResumePreview.jsx
import React, { useState } from "react";
import { useProfile } from "../context/ProfileContext";

// Import your different templates
import ModernTemplate from "../components/templates/ModernTemplate";
import MinimalistTemplate from "../components/templates/MinimalistTemplate";
import DataScienceTemplate from "../components/templates/DataScienceTemplate";
import TwoColumnTemplate from "../components/templates/TwoColumnTemplate";
import CompactTemplate from "../components/templates/CompactTemplate";
const ResumePreview = () => {
  const profileData = useProfile();
  const [selectedTemplate, setSelectedTemplate] = useState("ModernTemplate");

  // A mapping of template names to components
  // ADD THE NEW TEMPLATES HERE
  const templates = {
    ModernTemplate: ModernTemplate,
    MinimalistTemplate: MinimalistTemplate,
    DataScienceTemplate: DataScienceTemplate,
    TwoColumnTemplate: TwoColumnTemplate,
    CompactTemplate:CompactTemplate,
  };

  // Get the selected template component
  const TemplateComponent = templates[selectedTemplate];

  return (
    <div className="p-4">
      {/* Template Selector UI */}
      <div className="mb-6 text-center">
        <label htmlFor="template-select" className="text-lg font-medium mr-4">
          Choose a Template:
        </label>
        <select
          id="template-select"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="ModernTemplate">Modern</option>
          <option value="MinimalistTemplate">Minimalist</option>
          {/* ADD THE NEW TEMPLATES' OPTIONS HERE */}
          <option value="DataScienceTemplate">Data Science</option>
          <option value="TwoColumnTemplate">Two-Column</option>
        </select>
      </div>

      {/* Render the selected template and pass all profile data */}
      {TemplateComponent ? (
        <TemplateComponent data={profileData} />
      ) : (
        <p className="text-center text-red-500">Template not found!</p>
      )}
    </div>
  );
};

export default ResumePreview;