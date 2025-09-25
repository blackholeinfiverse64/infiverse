import { useLocation, Link } from "react-router-dom";
import { LayoutDashboard, CheckSquare, Network, Users, Sparkles, Settings, LogOut, CheckCircle, BarChart, Airplay, LayoutDashboardIcon, Target, Monitor, DollarSign, Calendar, Clock, UserCog, UserCheck } from "lucide-react";
import { useAuth } from "../../context/auth-context";

export function DashboardSidebar({ collapsed = false, onToggleCollapse }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const baseRoutes = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Tasks", href: "/tasks", icon: CheckSquare },
    { title: "Dependencies", href: "/dependencies", icon: Network },
    { title: "Departments", href: "/departments", icon: Users },
    { title: "AI Optimization", href: "/optimization", icon: Sparkles },
     { title: "All Aims", href: "/all-aims", icon: Target },
    { title: "Completed Tasks", href: "/completedtask", icon: CheckCircle },
     { title: "Leaderboard", href: "/leaderboard", icon: Sparkles },
  ];

  // Admin-only routes
  const adminRoutes = [
    { title: "Employee Monitoring", href: "/monitoring", icon: Monitor },
    { title: "User Management", href: "/user-management", icon: UserCog },
    // { title: "Live Attendance", href: "/attendance-dashboard", icon: Users },
    // { title: "Attendance Analytics", href: "/attendance-analytics", icon: Clock },
    // { title: "Salary Management", href: "/salary-management", icon: DollarSign },
    // { title: "Individual Salaries", href: "/individual-salary-management", icon: UserCog },
  ];

  // User-specific routes
  const userRoutes = [
    { title: "Dashboard", href: "/userdashboard", icon: LayoutDashboardIcon },
    { title: "Progress", href: "/progress", icon: BarChart },
    { title: "Set Aims", href: "/aims", icon: Airplay },
    // { title: "Leave Requests", href: "/leave-request", icon: Calendar },
    { title: "Leaderboard", href: "/leaderboard", icon: Sparkles },
  ];

  // Determine which routes to show based on user role
  let renderRoutes;
  if (user?.role === "User") {
    renderRoutes = userRoutes;
  } else if (user?.role === "Admin") {
    renderRoutes = [...baseRoutes, ...adminRoutes];
  } else {
    renderRoutes = baseRoutes; // For other roles like Manager, etc.
  }

  return (
    <div className="h-screen flex flex-col electric-sidebar border-r border-primary/20 shadow-electric overflow-hidden relative">
      {/* Electric Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 opacity-60"></div>
      <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
      
      {/* Electric particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="electric-particles"></div>
        <div className="electric-particles-small"></div>
      </div>

      {/* Enhanced Cyber Header */}
      <div className="border-b border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10 relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
        <div className={`flex items-center relative z-10 transition-all duration-500 ${collapsed ? 'px-4 py-6 justify-center' : 'px-6 py-6'}`}>
          <div className={`flex items-center font-bold text-2xl transition-all duration-500 ${collapsed ? 'gap-0' : 'gap-4'}`}>
            <div className="relative">
              <button
                onClick={onToggleCollapse}
                className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center glow-primary animate-glow-pulse transform hover:scale-110 transition-all duration-300 cursor-pointer hover:rotate-12 group"
              >
                <Sparkles className="h-6 w-6 text-primary-foreground group-hover:animate-spin" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl animate-pulse"></div>
              </button>
            </div>
            {!collapsed && (
              <span className="text-foreground font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-text">
                Infiverse
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent relative z-10">
        <div className={`transition-all duration-500 ${collapsed ? 'p-2' : 'p-6'}`}>
          <div className="mb-8">
            {!collapsed && (
              <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-4 animate-fade-in">
                Navigation
              </div>
            )}
            <nav className={`transition-all duration-500 ${collapsed ? 'space-y-2' : 'space-y-3'}`}>
              {renderRoutes.map((route) => {
                const isActive = location.pathname === route.href;
                return (
                  <Link
                    key={route.href}
                    to={route.href}
                    className={`group flex items-center transition-all duration-300 relative overflow-hidden hover-electric ${
                      collapsed 
                        ? 'justify-center p-3 rounded-xl' 
                        : 'gap-4 px-5 py-4 rounded-2xl'
                    } ${
                      isActive
                        ? "electric-active text-primary-foreground glow-primary shadow-electric"
                        : "electric-inactive hover:electric-hover hover:text-primary text-foreground/90"
                    }`}
                    title={collapsed ? route.title : undefined}
                  >
                    {/* Electric Active indicator */}
                    {isActive && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl animate-electric-pulse"></div>
                        <div className="absolute inset-0 bg-cyber-grid opacity-30 rounded-2xl"></div>
                      </>
                    )}

                    {/* Enhanced Icon */}
                    <div className={`relative z-10 transition-all duration-300 ${
                      collapsed ? 'p-2' : 'p-2'
                    } rounded-lg ${
                      isActive
                        ? 'bg-primary-foreground/20 text-primary-foreground electric-glow'
                        : 'bg-primary/10 text-primary/80 group-hover:bg-primary/20 group-hover:text-primary group-hover:electric-glow'
                    }`}>
                      <route.icon className={`transition-all duration-300 ${collapsed ? 'h-6 w-6' : 'h-5 w-5'} ${isActive ? 'animate-pulse' : 'group-hover:scale-110'}`} />
                    </div>

                    {/* Text with cyber styling */}
                    {!collapsed && (
                      <span className="relative z-10 transition-all duration-300 text-sm font-semibold">
                        {route.title}
                      </span>
                    )}

                    {/* Electric glow effect */}
                    {isActive && (
                      <div className={`absolute ${collapsed ? 'right-1 top-1' : 'right-4 top-1/2 transform -translate-y-1/2'} w-2 h-2 bg-accent rounded-full animate-electric-pulse shadow-accent-glow`}></div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Enhanced Workspace Section */}
          {!collapsed && (
            <div className="mt-8">
              <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-4">
                Workspace
              </div>
              <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 border border-primary/20 electric-workspace">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg flex items-center justify-center electric-glow animate-glow-pulse">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Default Workspace</div>
                    <div className="text-xs text-accent animate-pulse">Active</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Footer Section */}
      <div className="border-t border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 flex-shrink-0 relative z-10">
        <div className={`transition-all duration-500 ${collapsed ? 'p-3' : 'p-6'}`}>
          <div className="space-y-2">
            <Link
              to="/settings"
              className={`group flex items-center text-sm font-medium hover:text-primary text-foreground/70 transition-all duration-300 hover-electric rounded-xl ${
                collapsed 
                  ? 'justify-center p-3' 
                  : 'gap-3 px-4 py-3'
              }`}
              title={collapsed ? "Settings" : undefined}
            >
              <Settings className={`transition-all duration-300 group-hover:rotate-90 group-hover:electric-glow ${collapsed ? 'h-6 w-6' : 'h-5 w-5'}`} />
              {!collapsed && <span>Settings</span>}
            </Link>

            {/* Enhanced User Profile Card */}
            <div className={`mt-4 rounded-xl bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/15 border border-primary/30 electric-profile relative overflow-hidden ${
              collapsed ? 'p-2' : 'p-4'
            }`}>
              <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
              
              {collapsed ? (
                <div className="flex justify-center relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary via-secondary to-accent rounded-full flex items-center justify-center text-white font-semibold electric-glow animate-glow-pulse">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary via-secondary to-accent rounded-full flex items-center justify-center text-white font-semibold electric-glow animate-glow-pulse">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate text-foreground">{user?.name || "User"}</div>
                      <div className="text-xs text-accent truncate animate-pulse">{user?.role || "User"}</div>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-destructive/20 text-destructive hover:bg-destructive/30 transition-all duration-300 hover-electric electric-logout relative z-10"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}