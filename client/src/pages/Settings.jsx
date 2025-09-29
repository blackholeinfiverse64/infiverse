import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ProfileSettings } from "../components/settings/profile-settings"
import { WorkspaceSettings } from "../components/settings/workspace-settings"
import { NotificationSettings } from "../components/settings/notification-settings"
import  ConsentSettings  from "../components/settings/ConsentSettings";
import { useSidebar } from "../context/sidebar-context"

function Settings() {
  const { isHidden } = useSidebar()
  
  return (
    <div className={`min-h-screen bg-black space-y-6 electric-dashboard transition-all duration-700 ${
      isHidden 
        ? 'ml-0 p-4' 
        : 'ml-80 p-4'
    }`}>
      {/* Enhanced Black Background with Revolving Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Primary revolving particles */}
        <div className="universe-particles opacity-25 animate-spin-slow"></div>
        <div className="universe-particles-medium opacity-20 animate-reverse-spin"></div>
        <div className="universe-particles-large opacity-15 animate-pulse"></div>
        
        {/* Electric particles with enhanced effects */}
        <div className="electric-particles opacity-30"></div>
        <div className="electric-particles-small opacity-25"></div>
        <div className="electric-particles-blue opacity-20"></div>
        <div className="electric-particles-cyan opacity-15"></div>
        
        {/* Cyber grid overlay */}
        <div className="bg-cyber-grid opacity-10 animate-cyber-grid"></div>
      </div>

      <div className="electric-header p-6 rounded-2xl relative z-10 backdrop-blur-xl bg-black/40 border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl"></div>
        <div className="absolute inset-0 bg-cyber-grid opacity-15 rounded-2xl"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">Settings</h1>
          <p className="text-white/80 mt-2">Manage your account and workspace settings</p>
        </div>
      </div>

      <Card className="electric-card relative z-10 backdrop-blur-xl bg-black/40 border border-white/20 shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/10 to-purple-500/5 rounded-xl"></div>
        <div className="absolute inset-0 bg-cyber-grid opacity-15 rounded-xl"></div>
        
        {/* Electric Particles inside card */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <div className="absolute top-4 right-6 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute bottom-6 left-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-12 left-12 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-70"></div>
        </div>
        
        <CardHeader className="relative z-10">
          <CardTitle className="text-cyan-400 text-2xl font-bold">Settings</CardTitle>
          <CardDescription className="text-white/70">Manage your preferences and account settings</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/60 border border-white/20 backdrop-blur-md">
              <TabsTrigger value="profile" className="text-white/80 data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-400/50">Profile</TabsTrigger>
              <TabsTrigger value="workspace" className="text-white/80 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:border-blue-400/50">Workspace</TabsTrigger>
              <TabsTrigger value="notifications" className="text-white/80 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 data-[state=active]:border-purple-400/50">Notifications</TabsTrigger>
              <TabsTrigger value="consent" className="text-white/80 data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400 data-[state=active]:border-pink-400/50">Consent</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <ProfileSettings />
            </TabsContent>
            <TabsContent value="workspace">
              <WorkspaceSettings />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
            <TabsContent value="consent">
              <ConsentSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default Settings
