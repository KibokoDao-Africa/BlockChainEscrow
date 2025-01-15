"use client"

import React, { useState } from "react";


import { Code, Plus, X, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";

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

  const removeMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const addTestCase = (milestoneIndex) => {
    const newMilestones = [...milestones];
    newMilestones[milestoneIndex].testCases.push({
      description: "",
      type: frameworks.find((f) => f.id === selectedFramework)?.testTypes[0] || "",
    });
    setMilestones(newMilestones);
  };

  const removeTestCase = (milestoneIndex, testCaseIndex) => {
    const newMilestones = [...milestones];
    newMilestones[milestoneIndex].testCases.splice(testCaseIndex, 1);
    setMilestones(newMilestones);
  };

  const updateTestCase = (milestoneIndex, testCaseIndex, field, value) => {
    const newMilestones = [...milestones];
    newMilestones[milestoneIndex].testCases[testCaseIndex][field] = value;
    setMilestones(newMilestones);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <p className="text-gray-600 mt-2">
            Set up your project details, milestones, and test cases
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="My Awesome Project"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Budget (USDC)
              </label>
              <input
                type="number"
                className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="5000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testing Framework
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{framework.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-medium">{framework.name}</h3>
                        <p className="text-sm text-gray-600">
                          {framework.description}
                        </p>
                      </div>
                      {selectedFramework === framework.id && (
                        <CheckCircle className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Project Milestones</h2>
            <button
              onClick={addMilestone}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Milestone
            </button>
          </div>
          <div className="space-y-6">
            {milestones.map((milestone, milestoneIndex) => (
              <div
                key={milestoneIndex}
                className="border rounded-lg p-4 relative"
              >
                <button
                  onClick={() => removeMilestone(milestoneIndex)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Milestone Title
                      </label>
                      <input
                        type="text"
                        className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Backend API Implementation"
                        value={milestone.title}
                        onChange={(e) => {
                          const newMilestones = [...milestones];
                          newMilestones[milestoneIndex].title = e.target.value;
                          setMilestones(newMilestones);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Due Date
                      </label>
                      <div className="mt-1 relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={milestone.dueDate}
                          onChange={(e) => {
                            const newMilestones = [...milestones];
                            newMilestones[milestoneIndex].dueDate = e.target.value;
                            setMilestones(newMilestones);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="Describe the milestone and its requirements..."
                      value={milestone.description}
                      onChange={(e) => {
                        const newMilestones = [...milestones];
                        newMilestones[milestoneIndex].description = e.target.value;
                        setMilestones(newMilestones);
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Test Cases
                      </label>
                      <button
                        onClick={() => addTestCase(milestoneIndex)}
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        Add Test Case
                      </button>
                    </div>
                    <div className="space-y-3">
                      {milestone.testCases.map((testCase, testCaseIndex) => (
                        <div
                          key={testCaseIndex}
                          className="flex items-center gap-2"
                        >
                          <Code className="h-4 w-4 text-gray-400" />
                          <select
                            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={testCase.type}
                            onChange={(e) =>
                              updateTestCase(
                                milestoneIndex,
                                testCaseIndex,
                                "type",
                                e.target.value
                              )
                            }
                          >
                            {selectedFramework &&
                              frameworks
                                .find((f) => f.id === selectedFramework)
                                ?.testTypes.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                          </select>
                          <input
                            type="text"
                            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Test case description"
                            value={testCase.description}
                            onChange={(e) =>
                              updateTestCase(
                                milestoneIndex,
                                testCaseIndex,
                                "description",
                                e.target.value
                              )
                            }
                          />
                          <button
                            onClick={() =>
                              removeTestCase(milestoneIndex, testCaseIndex)
                            }
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            <Link href="/project-status">Create Project</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCreation