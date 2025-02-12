"use client";
import React, { useState } from "react";

const frameworks = [
  {
    id: "jest",
    name: "Jest",
    icon: "🃏",
    description: "JavaScript Testing",
    testTypes: ["Unit Tests", "Integration Tests", "API Tests"],
  },
  {
    id: "pytest",
    name: "PyTest",
    icon: "🐍",
    description: "Python Testing",
    testTypes: ["Unit Tests", "Functional Tests", "API Tests"],
  },
  {
    id: "mocha",
    name: "Mocha",
    icon: "☕",
    description: "Node.js Testing",
    testTypes: ["Unit Tests", "Integration Tests", "E2E Tests"],
  },
];

const ProjectCreation = () => {
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [milestones, setMilestones] = useState([
    {
      title: "",
      description: "",
      dueDate: "",
      testCases: [],
    },
  ]);
  const [projectName, setProjectName] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [hasIssues, setHasIssues] = useState(false);
  const [hasProjects, setHasProjects] = useState(true);
  const [hasWiki, setHasWiki] = useState(false);

  // Function to add a milestone
  const addMilestone = () => {
    setMilestones([
      ...milestones,
      {
        title: "",
        description: "",
        dueDate: "",
        testCases: [],
      },
    ]);
  };

  // Function to remove a milestone
  const removeMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  // Function to handle file upload for test cases
  const handleFileUpload = (milestoneIndex, files) => {
    const newMilestones = [...milestones];
    newMilestones[milestoneIndex].testCases = Array.from(files).map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
    }));
    setMilestones(newMilestones);
  };

  // Function to create the project
  const createProject = async () => {
    try {
      if (!projectName || !projectBudget || !projectDescription || !selectedFramework) {
        alert("Please fill in all required fields.");
        return;
      }

      const payload = {
        framework: frameworks.find((f) => f.id === selectedFramework).name,
        name: projectName,
        amount: projectBudget,
        description: projectDescription,
        private: isPrivate,
        has_issues: hasIssues,
        has_projects: hasProjects,
        has_wiki: hasWiki,
        owner: 1, // Assuming owner ID is fixed for now
        milestones: milestones.map((milestone) => ({
          title: milestone.title,
          description: milestone.description,
          dueDate: milestone.dueDate,
          testCases: milestone.testCases,
        })),
      };

      // Retrieve access token from localStorage
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        alert("Access token not found. Please log in.");
        return;
      }

      const response = await fetch(
        "https://blockchainescrow-production-ed33.up.railway.app/testcases/create-repo/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Add token to headers
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Project created successfully!");
      } else {
        alert("Failed to create project. Please try again.");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("An error occurred while creating the project.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Create New Project</h1>
      <p className="text-gray-600 text-center mb-8">
        Set up your project details, milestones, and test cases
      </p>

      {/* Project Details */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name:</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Budget (USDC):</label>
        <input
          type="number"
          value={projectBudget}
          onChange={(e) => setProjectBudget(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Description:</label>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4 mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Is Private</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={hasIssues}
            onChange={() => setHasIssues(!hasIssues)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Has Issues</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={hasProjects}
            onChange={() => setHasProjects(!hasProjects)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Has Projects</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={hasWiki}
            onChange={() => setHasWiki(!hasWiki)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Has Wiki</span>
        </label>
      </div>

      {/* Testing Framework Selection */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Testing Framework</h2>
        {frameworks.map((framework) => (
          <div
            key={framework.id}
            onClick={() => setSelectedFramework(framework.id)}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedFramework === framework.id
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                : "hover:border-blue-500 hover:bg-blue-50"
            }`}
          >
            <span>{framework.icon}</span>
            <span className="ml-2">{framework.name}</span>
            <span className="block mt-1 text-gray-600">{framework.description}</span>
          </div>
        ))}
      </div>

      {/* Milestones Section */}
      <div>
        <h2 className="text-lg font-medium mb-2">Project Milestones</h2>
        <button
          onClick={addMilestone}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
        >
          Add Milestone
        </button>
        {milestones.map((milestone, milestoneIndex) => (
          <div key={milestoneIndex} className="mb-6 relative">
            <button
              onClick={() => removeMilestone(milestoneIndex)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              Remove Milestone
            </button>
            <input
              type="text"
              placeholder="Milestone Title"
              value={milestone.title}
              onChange={(e) => {
                const newMilestones = [...milestones];
                newMilestones[milestoneIndex].title = e.target.value;
                setMilestones(newMilestones);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
            <input
              type="date"
              value={milestone.dueDate}
              onChange={(e) => {
                const newMilestones = [...milestones];
                newMilestones[milestoneIndex].dueDate = e.target.value;
                setMilestones(newMilestones);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
            <textarea
              value={milestone.description}
              onChange={(e) => {
                const newMilestones = [...milestones];
                newMilestones[milestoneIndex].description = e.target.value;
                setMilestones(newMilestones);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-medium mb-2">Upload Test Cases</h3>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload(milestoneIndex, e.dataTransfer.files);
                }}
                className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500"
              >
                <p className="text-gray-600">Drag and drop files here or click to browse</p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileUpload(milestoneIndex, e.target.files)}
                  className="hidden"
                />
              </div>
              {milestone.testCases.length > 0 && (
                <ul className="mt-4 list-disc list-inside">
                  {milestone.testCases.map((testCase, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {testCase.name} ({testCase.type}, {Math.round(testCase.size / 1024)} KB)
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Project Button */}
      <button
        onClick={createProject}
        className="w-full bg-green-500 text-white px-4 py-3 rounded-md hover:bg-green-600"
      >
        Create Project
      </button>
    </div>
  );
};

export default ProjectCreation;