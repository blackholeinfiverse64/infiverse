"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Plus, Loader2, Mail, FileText, Target } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { CreateTaskDialog } from "../components/tasks/create-task-dialog"
import { DepartmentStats } from "../components/dashboard/department-stats"
import { DepartmentDetails } from "../components/departments/DepartmentDetails"
import { TasksOverview } from "../components/dashboard/tasks-overview"
import { AIInsights } from "../components/dashboard/ai-insights"
import { api, API_URL } from "../lib/api"
import { useToast } from "../hooks/use-toast"
import { useAuth } from "../context/auth-context"
import { useSidebar } from "../context/sidebar-context"
import axios from "axios"

function Dashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuth()
  const { isHidden } = useSidebar()
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    totalTasksChange: 0,
    completedTasksChange: 0,
    inProgressTasksChange: 0,
    pendingTasksChange: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSendingReminders, setIsSendingReminders] = useState(false)
  const [isGeneratingReports, setIsGeneratingReports] = useState(false)
  const [isSendingAimReminders, setIsSendingAimReminders] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState(null)

  const isAdmin = user && (user.role === "Admin" || user.role === "Manager")

  const handleDepartmentSelect = (department) => setSelectedDepartment(department)
  const handleBackToDashboard = () => setSelectedDepartment(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)
        const dashboardStats = await api.dashboard.getStats()
        setStats(dashboardStats)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchDashboardData()
  }, [toast])

  const handleBroadcastReminders = async () => {
    try {
      setIsSendingReminders(true)
      const result = await api.notifications.broadcastReminders()
      toast({
        title: "Success",
        description: `Sent ${result.emails.length} reminder emails to users`,
        variant: "success",
      })
    } catch (error) {
      console.error("Error sending reminders:", error)
      toast({
        title: "Error",
        description: "Failed to send reminder emails",
        variant: "destructive",
      })
    } finally {
      setIsSendingReminders(false)
    }
  }

  const handleGenerateReports = async () => {
    try {
      setIsGeneratingReports(true)
      const result = await axios.post(`${API_URL}/notifications/generate-reports/${user.id}`)
      toast({
        title: "Success",
        description: `Generated ${result.data.reports.length} department reports and sent to your email`,
        variant: "success",
      })
    } catch (error) {
      console.error("Error generating reports:", error)
      toast({
        title: "Error",
        description: "Failed to generate department reports",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingReports(false)
    }
  }

  const handleBroadcastAimReminders = async () => {
    try {
      setIsSendingAimReminders(true)
      const result = await api.notifications.broadcastAimReminders()
      toast({
        title: "Success",
        description: `Sent ${result.emails.length} aim reminder emails to users`,
        variant: "success",
      })
    } catch (error) {
      console.error("Error sending aim reminders:", error)
      toast({
        title: "Error",
        description: "Failed to send aim reminder emails",
        variant: "destructive",
      })
    } finally {
      setIsSendingAimReminders(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (selectedDepartment) {
    return <DepartmentDetails department={selectedDepartment} onBack={handleBackToDashboard} />
  }

  return (
    <div className={`min-h-screen bg-black space-y-8 font-poppins transition-all duration-700 ${
      isHidden 
        ? 'ml-0 p-4 md:p-6 lg:p-8' 
        : 'ml-80 p-4 md:p-6 lg:p-8'
    }`}>
      <div className="w-full max-w-none">
        {/* Enhanced Header with Glassmorphism */}
        <div className="relative mb-8">
          {/* Electric Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/30 to-purple-600/20 rounded-3xl blur-xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/10 to-transparent rounded-3xl"></div>
          
          {/* Main Header Card */}
          <div className="relative backdrop-blur-xl bg-black/40 border border-white/20 rounded-3xl shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500 hover:border-cyan-400/40 p-8">
            {/* Electric Particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <div className="absolute top-4 left-8 w-2 h-2 bg-cyan-400 rounded-full opacity-75"></div>
              <div className="absolute top-12 right-12 w-1 h-1 bg-blue-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-6 left-16 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-70"></div>
              <div className="absolute bottom-12 right-8 w-1 h-1 bg-cyan-300 rounded-full opacity-50"></div>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
              {/* Dashboard Title Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {/* Dashboard Icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-xl blur-sm"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-md border border-cyan-400/30 rounded-xl flex items-center justify-center shadow-xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-inner">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                      Dashboard
                    </h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xl text-white/90 font-medium">
                    Welcome back, <span className="text-cyan-400 font-semibold">{user?.name}</span>!
                  </p>
                  <p className="text-base text-white/70">
                    Here's an overview of your workflow and system performance.
                  </p>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* Create Task Button - Primary */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400/40 via-pink-500/40 to-red-500/40 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <Button 
                    onClick={() => setIsCreateTaskOpen(true)} 
                    className="relative h-12 px-6 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 border border-rose-400/50 shadow-xl hover:shadow-rose-400/30 transition-all duration-300 hover:scale-105 text-white font-semibold"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Task
                  </Button>
                </div>

                {isAdmin && (
                  <>
                    {/* Broadcast Reminders Button */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-400/30 to-blue-500/30 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                      <Button
                        variant="secondary"
                        onClick={handleBroadcastReminders}
                        disabled={isSendingReminders}
                        className="relative h-12 px-6 bg-gradient-to-r from-sky-500/20 to-blue-500/20 backdrop-blur-md border border-sky-400/40 hover:border-sky-400/60 shadow-lg hover:shadow-sky-400/20 transition-all duration-300 hover:scale-105 text-white font-medium"
                      >
                        {isSendingReminders ? (
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        ) : (
                          <Mail className="h-5 w-5 mr-2" />
                        )}
                        Broadcast Reminders
                      </Button>
                    </div>

                    {/* Generate Reports Button */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-400/30 to-gray-500/30 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                      <Button
                        variant="outline"
                        onClick={handleGenerateReports}
                        disabled={isGeneratingReports}
                        className="relative h-12 px-6 bg-gradient-to-r from-slate-500/20 to-gray-500/20 backdrop-blur-md border border-slate-400/40 hover:border-slate-400/60 shadow-lg hover:shadow-slate-400/20 transition-all duration-300 hover:scale-105 text-white font-medium overflow-hidden"
                      >
                        {isGeneratingReports ? (
                          <Loader2 className="h-5 w-5 mr-2 animate-spin relative z-10" />
                        ) : (
                          <FileText className="h-5 w-5 mr-2 relative z-10" />
                        )}
                        <span className="relative z-10">Generate Reports</span>
                      </Button>
                    </div>

                    {/* Aim Reminders Button */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-500/30 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                      <Button
                        variant="warning"
                        onClick={handleBroadcastAimReminders}
                        disabled={isSendingAimReminders}
                        className="relative h-12 px-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-400/40 hover:border-purple-400/60 shadow-lg hover:shadow-purple-400/20 transition-all duration-300 hover:scale-105 text-white font-medium"
                      >
                        {isSendingAimReminders ? (
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        ) : (
                          <Target className="h-5 w-5 mr-2" />
                        )}
                        Broadcast Aim Reminders
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          {/* Total Tasks */}
          {/* Completed Tasks */}
          {/* In Progress */}
          {/* Pending Tasks */}
          {/* You can copy your existing Card JSX here */}
        </div>

        {/* Enhanced Dashboard Components with Glassmorphism */}
        <div className={`gap-8 relative z-10 transition-all duration-500 ${
          isHidden ? 'grid grid-cols-1 lg:grid-cols-3' : 'grid grid-cols-1 xl:grid-cols-3'
        }`}>
          
          {/* Department Progress Section */}
          <div className="relative group">
            {/* Electric Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 via-indigo-600/20 to-violet-600/25 rounded-2xl blur-xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/15 to-transparent rounded-2xl animate-electric-flow"></div>
            
            {/* Main Card */}
            <div className="relative backdrop-blur-xl bg-black/30 border border-white/20 rounded-2xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:border-blue-500/50 hover:scale-[1.02] p-6 h-full">
              {/* Electric Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute top-3 right-4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute bottom-4 left-6 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-8 left-8 w-1 h-1 bg-violet-400 rounded-full animate-bounce opacity-70"></div>
              </div>
              
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-indigo-600/40 rounded-xl blur-sm"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 backdrop-blur-md border border-blue-500/50 rounded-xl flex items-center justify-center shadow-xl hover:shadow-blue-500/30 transition-all duration-300">
                    <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                    Department Progress
                  </h3>
                  <p className="text-base text-cyan-200/80 font-medium">
                    Team performance metrics & analytics
                  </p>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-70"></div>
                </div>
              </div>
              
              {/* Component Content */}
              <div className="relative z-10">
                <DepartmentStats onDepartmentSelect={handleDepartmentSelect} />
              </div>
            </div>
          </div>

          {/* Tasks Overview Section */}
          <div className="relative group">
            {/* Electric Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/25 via-orange-500/20 to-yellow-500/25 rounded-2xl blur-xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-400/15 to-transparent rounded-2xl animate-electric-flow"></div>
            
            {/* Main Card */}
            <div className="relative backdrop-blur-xl bg-black/30 border border-white/20 rounded-2xl shadow-2xl hover:shadow-amber-400/30 transition-all duration-500 hover:border-amber-400/50 hover:scale-[1.02] p-6 h-full">
              {/* Electric Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute bottom-3 right-5 w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-12 right-8 w-1 h-1 bg-yellow-400 rounded-full animate-bounce opacity-70"></div>
              </div>
              
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/35 to-orange-500/35 rounded-lg blur-sm"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-amber-400/25 to-orange-500/25 backdrop-blur-md border border-amber-400/40 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Tasks Overview</h3>
                  <p className="text-sm text-white/70">Current task status</p>
                </div>
              </div>
              
              {/* Component Content */}
              <div className="relative z-10">
                <TasksOverview />
              </div>
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="relative group">
            {/* Electric Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/25 via-teal-500/20 to-cyan-500/25 rounded-2xl blur-xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-400/15 to-transparent rounded-2xl animate-electric-flow"></div>
            
            {/* Main Card */}
            <div className="relative backdrop-blur-xl bg-black/30 border border-white/20 rounded-2xl shadow-2xl hover:shadow-emerald-400/30 transition-all duration-500 hover:border-emerald-400/50 hover:scale-[1.02] p-6 h-full">
              {/* Electric Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute top-5 right-3 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute bottom-5 left-4 w-1 h-1 bg-teal-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-8 left-12 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-70"></div>
              </div>
              
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/35 to-teal-500/35 rounded-lg blur-sm"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400/25 to-teal-500/25 backdrop-blur-md border border-emerald-400/40 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">AI Insights</h3>
                  <p className="text-sm text-white/70">Smart recommendations</p>
                </div>
              </div>
              
              {/* Component Content */}
              <div className="relative z-10">
                <AIInsights />
              </div>
            </div>
          </div>
        </div>

        <CreateTaskDialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen} />
      </div>
    </div>
  )
}

export default Dashboard
