"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Plus, Loader2, Mail, FileText ,Target} from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { CreateTaskDialog } from "../components/tasks/create-task-dialog"
import { DepartmentStats } from "../components/dashboard/department-stats"
import { DepartmentDetails } from "../components/departments/DepartmentDetails"
import { TasksOverview } from "../components/dashboard/tasks-overview"
import { AIInsights } from "../components/dashboard/ai-insights"
import { RecentActivity } from "../components/dashboard/recent-activity"
import { api, API_URL } from "../lib/api"
import { useToast } from "../hooks/use-toast"
import { useAuth } from "../context/auth-context"
import axios from "axios"



function Dashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuth()
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

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department)
  }

  const handleBackToDashboard = () => {
    setSelectedDepartment(null)
  }

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

  // Show department details if a department is selected
  if (selectedDepartment) {
    return (
      <DepartmentDetails 
        department={selectedDepartment} 
        onBack={handleBackToDashboard} 
      />
    )
  }

  return (
    <div className="space-y-8 animate-fade-in electric-dashboard">
      {/* Electric Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="electric-particles opacity-30"></div>
        <div className="electric-particles-small opacity-20"></div>
      </div>

      {/* Enhanced Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 electric-header p-6 rounded-2xl relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl"></div>
        <div className="absolute inset-0 bg-cyber-grid opacity-10 rounded-2xl"></div>
        
        <div className="space-y-2 relative z-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-text">
            Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome back! Here's an overview of your workflow.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10">
          <Button
            onClick={() => setIsCreateTaskOpen(true)}
            className="electric-button gradient-primary hover:glow-primary transition-all duration-300 transform hover:scale-105 group hover-electric relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 rounded-lg animate-electric-pulse"></div>
            <Plus className="mr-2 h-5 w-5 transition-all duration-300 group-hover:rotate-90 relative z-10" />
            <span className="relative z-10">Create New Task</span>
          </Button>
          
          {isAdmin && (
            <>
              <Button
                variant="outline"
                onClick={handleBroadcastReminders}
                disabled={isSendingReminders}
                className="electric-button-outline hover:electric-glow transition-all duration-300 hover:transform hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                {isSendingReminders ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin relative z-10" />
                ) : (
                  <Mail className="mr-2 h-4 w-4 relative z-10" />
                )}
                <span className="relative z-10">Broadcast Reminders</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleGenerateReports}
                disabled={isGeneratingReports}
                className="electric-button-outline hover:electric-glow transition-all duration-300 hover:transform hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                {isGeneratingReports ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin relative z-10" />
                ) : (
                  <FileText className="mr-2 h-4 w-4 relative z-10" />
                )}
                <span className="relative z-10">Generate Reports</span>
              </Button>
            </>
          )}

          <Button
            variant="outline"
            onClick={handleBroadcastAimReminders}
            disabled={isSendingAimReminders}
            className="electric-button-outline hover:electric-glow transition-all duration-300 hover:transform hover:scale-105 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            {isSendingAimReminders ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin relative z-10" />
            ) : (
              <Target className="mr-2 h-4 w-4 relative z-10" />
            )}
            <span className="relative z-10">Broadcast Aim Reminders</span>
          </Button>
        </div>
      </div>

      {/* Enhanced Electric Stats Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        <Card className="electric-card group relative overflow-hidden border-primary/30 hover:border-primary/50 transition-all duration-500 hover:transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
          <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
          <div className="absolute inset-0 electric-card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
            <CardTitle className="text-sm font-semibold text-primary/80 uppercase tracking-wider">Total Tasks</CardTitle>
            <div className="p-3 gradient-primary rounded-2xl electric-glow group-hover:animate-electric-pulse transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-6 w-6 text-primary-foreground"
              >
                <path d="M9 11H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2M9 11V9a2 2 0 1 1 4 0v2M9 11h6" />
              </svg>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold text-foreground mb-2">{stats.totalTasks}</div>
            <div className={`flex items-center gap-2 text-sm font-medium ${
              stats.totalTasksChange >= 0 ? 'text-accent' : 'text-destructive'
            }`}>
              <div className={`p-1 rounded-full ${stats.totalTasksChange >= 0 ? 'bg-accent/20' : 'bg-destructive/20'}`}>
                {stats.totalTasksChange >= 0 ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 7l-9.2 9.2M7 7v10h10" />
                  </svg>
                )}
              </div>
              <span>{stats.totalTasksChange >= 0 ? "+" : ""}{stats.totalTasksChange}% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="electric-card group relative overflow-hidden border-accent/30 hover:border-accent/50 transition-all duration-500 hover:transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10"></div>
          <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
          <div className="absolute inset-0 electric-card-glow-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
            <CardTitle className="text-sm font-medium text-accent/80">Completed Tasks</CardTitle>
            <div className="p-2 bg-gradient-to-br from-accent/20 to-accent/30 rounded-lg electric-glow group-hover:animate-electric-pulse transition-all duration-300 transform group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5 text-accent-foreground"
              >
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-foreground mb-1">{stats.completedTasks}</div>
            <p className={`text-sm flex items-center gap-1 ${
              stats.completedTasksChange >= 0 ? 'text-accent' : 'text-destructive'
            }`}>
              {stats.completedTasksChange >= 0 ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                </svg>
              )}
              {stats.completedTasksChange >= 0 ? "+" : ""}{stats.completedTasksChange}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="electric-card group relative overflow-hidden border-secondary/30 hover:border-secondary/50 transition-all duration-500 hover:transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-accent/5 to-primary/10"></div>
          <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
          <div className="absolute inset-0 electric-card-glow-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
            <CardTitle className="text-sm font-medium text-secondary/80">In Progress</CardTitle>
            <div className="p-2 bg-gradient-to-br from-secondary/20 to-secondary/30 rounded-lg electric-glow group-hover:animate-electric-pulse transition-all duration-300 transform group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5 text-secondary-foreground"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-foreground">{stats.inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">
              {stats.inProgressTasksChange > 0 ? "+" : ""}
              {stats.inProgressTasksChange} tasks since yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="electric-card group relative overflow-hidden border-destructive/30 hover:border-destructive/50 transition-all duration-500 hover:transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-primary/5 to-secondary/10"></div>
          <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
          <div className="absolute inset-0 electric-card-glow-destructive opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-destructive/80">Pending Tasks</CardTitle>
            <div className="p-2 bg-gradient-to-br from-destructive/20 to-destructive/30 rounded-lg electric-glow group-hover:animate-electric-pulse transition-all duration-300 transform group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-destructive-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold text-foreground">{stats.pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingTasksChange > 0 ? "+" : ""}
              {stats.pendingTasksChange} tasks since yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="electric-section group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <DepartmentStats onDepartmentSelect={handleDepartmentSelect} />
        </div>
        <div className="electric-section group">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <TasksOverview />
        </div>
        <div className="electric-section group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <AIInsights />
        </div>
      </div>

      <CreateTaskDialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen} />
    </div>
  )
}

export default Dashboard