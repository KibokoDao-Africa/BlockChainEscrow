import React from "react";
import {
  Calendar,
  DollarSign,
  Clock,
  ArrowUpRight,
  Filter,
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "E-commerce Platform API",
    description:
      "Development of RESTful API endpoints for an e-commerce platform with payment integration and inventory management.",
    budget: 5000,
    deadline: "2023-12-15",
    framework: "Jest",
    status: "in-progress",
    completedTests: 12,
    totalTests: 15,
  },
  {
    id: 2,
    name: "Authentication System",
    description:
      "Implementation of secure authentication system with OAuth2 and JWT token management.",
    budget: 3500,
    deadline: "2023-11-30",
    framework: "PyTest",
    status: "pending",
    completedTests: 0,
    totalTests: 8,
  },
  {
    id: 3,
    name: "Data Analytics Dashboard",
    description:
      "Frontend development for real-time data visualization dashboard with multiple chart types.",
    budget: 4200,
    deadline: "2023-12-20",
    framework: "Mocha",
    status: "completed",
    completedTests: 20,
    totalTests: 20,
  },
];

const ProjectsScreen = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-gray-600">
            Manage and monitor your ongoing projects
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4 text-gray-600" />
            Filter
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            New Project
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm border"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                  <p className="text-gray-600">{project.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {project.status === "completed" && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Completed
                    </span>
                  )}
                  {project.status === "in-progress" && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      In Progress
                    </span>
                  )}
                  {project.status === "pending" && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      Pending
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-medium">{project.budget} USDC</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-medium">
                      {new Date(project.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Test Progress</p>
                    <p className="font-medium">
                      {project.completedTests}/{project.totalTests} Tests
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Framework:</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                    {project.framework}
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  View Details
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsScreen;