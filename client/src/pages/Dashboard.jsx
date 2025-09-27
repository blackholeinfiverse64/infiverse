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
    <div className={`min-h-screen bg-black space-y-8 font-poppins transition-all duration-500 ${
      isHidden ? 'p-4 md:p-6 lg:p-8' : 'p-4 md:p-6 lg:p-8 pl-4 md:pl-6 lg:pl-8'
    }`}>
      <div className="w-full max-w-none">
        {/* Header */}
        <div className="glass-card hover-lift mb-8 animate-float">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent animate-gradient-shift">
                Dashboard
              </h1>
              <p className="text-lg text-muted-foreground font-inder">
                Welcome back, {user?.name}! Here's an overview of your workflow.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button onClick={() => setIsCreateTaskOpen(true)} className="gap-2 animate-pulse-glow">
                <Plus className="h-5 w-5" /> Create New Task
              </Button>
              {isAdmin && (
                <>
                  <Button
                    variant="secondary"
                    onClick={handleBroadcastReminders}
                    disabled={isSendingReminders}
                    className="gap-2 hover-lift"
                  >
                    {isSendingReminders ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                    Broadcast Reminders
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleGenerateReports}
                    disabled={isGeneratingReports}
                    className="electric-button-outline hover:electric-glow transition-all duration-300 hover:transform hover:scale-105 relative overflow-hidden"
                  >
                    {isGeneratingReports ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin relative z-10" />
                    ) : (
                      <FileText className="mr-2 h-4 w-4 relative z-10" />
                    )}
                    <span className="relative z-10">Generate Reports</span>
                  </Button>
                  <Button
                    variant="warning"
                    onClick={handleBroadcastAimReminders}
                    disabled={isSendingAimReminders}
                    className="gap-2 hover-lift"
                  >
                    {isSendingAimReminders ? <Loader2 className="h-4 w-4 animate-spin" /> : <Target className="h-4 w-4" />}
                    Broadcast Aim Reminders
                  </Button>
                </>
              )}
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

        {/* Dashboard Components */}
        <div className={`gap-6 relative z-10 transition-all duration-500 ${
          isHidden ? 'flex flex-col lg:flex-row lg:space-x-6' : 'flex flex-col xl:flex-row xl:space-x-6'
        }`}>
          <div className="flex-1 electric-section group">
            <DepartmentStats onDepartmentSelect={handleDepartmentSelect} />
          </div>
          <div className="flex-1 electric-section group">
            <TasksOverview />
          </div>
          <div className="flex-1 electric-section group">
            <AIInsights />
          </div>
        </div>

        <CreateTaskDialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen} />
      </div>
    </div>
  )
}

export default Dashboard
