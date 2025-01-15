"use client"

import React, { useState } from "react";
import {
  Shield,
  Code,
  AlertCircle,
  CheckCircle2,
  CircleDollarSign,
  Wallet,
  ArrowUpRight,
  LineChart,
  LogOut,
} from "lucide-react";
const ProjectStatus = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Smart Contract Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Wallet className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Total Deposited</span>
                </div>
                <p className="text-2xl font-semibold">5,000 USDC</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CircleDollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Released</span>
                </div>
                <p className="text-2xl font-semibold">3,750 USDC</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <LineChart className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">Remaining</span>
                </div>
                <p className="text-2xl font-semibold">1,250 USDC</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Contract Address</span>
                <a
                  href="#"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  0x1234...5678
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Network</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Ethereum Mainnet
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Test Results & Payments</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                Auto-releasing
              </span>
            </div>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Backend API Tests</h3>
                      <p className="text-sm text-gray-600">15 test cases</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">1,875 USDC</p>
                    <p className="text-sm text-gray-600">Auto-released</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Passed Tests
                    </span>
                    <span>12/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: "80%",
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    80% completion = 1,500 USDC released
                  </p>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Frontend Integration</h3>
                      <p className="text-sm text-gray-600">10 test cases</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">1,875 USDC</p>
                    <p className="text-sm text-gray-600">In progress</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Passed Tests
                    </span>
                    <span>6/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: "60%",
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    60% completion = 1,125 USDC pending release
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Payment Distribution</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CircleDollarSign className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Auto-Released</p>
                    <p className="text-green-600">3,750 USDC</p>
                  </div>
                  <p className="text-sm text-gray-600">Based on passed tests</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: "75%",
                  }}
                ></div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">
                  Next auto-release in:
                </p>
                <p className="font-medium">
                  ~2 hours (after test verification)
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Dispute Protection</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Protected by Smart Contract</p>
                  <p className="text-sm text-gray-600">
                    Automatic dispute resolution
                  </p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-sm">
                <p className="text-gray-600">
                  Funds are automatically returned for failed test cases after
                  dispute verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProjectStatus