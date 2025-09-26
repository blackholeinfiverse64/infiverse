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
    <div className="h-screen flex flex-col electric-sidebar shadow-electric overflow-hidden relative border-r-0">
      {/* Enhanced Electric Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/95 to-background/98 backdrop-blur-2xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-secondary/6 to-accent/8 opacity-70"></div>
      <div className="absolute inset-0 bg-cyber-grid opacity-15"></div>
      
      {/* Enhanced Electric particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="electric-particles opacity-80"></div>
        <div className="electric-particles-small opacity-60"></div>
      </div>

      {/* Enhanced Cyber Header */}
      <div className="bg-gradient-to-r from-primary/8 to-secondary/8 relative overflow-hidden flex-shrink-0 border-b border-primary/10">
        <div className="absolute inset-0 bg-cyber-grid opacity-25"></div>
        <div className={`flex items-center relative z-10 transition-all duration-700 ${collapsed ? 'px-3 py-5 justify-center' : 'px-5 py-5'}`}>
          <div className={`flex items-center font-bold text-2xl transition-all duration-700 ${collapsed ? 'gap-0' : 'gap-4'}`}>
            <div className="relative">
              <button
                onClick={onToggleCollapse}
                className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center glow-primary animate-glow-pulse transform hover:scale-110 transition-all duration-500 cursor-pointer hover:rotate-12 group shadow-lg"
              >
                <Sparkles className="h-6 w-6 text-primary-foreground group-hover:animate-spin transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl animate-pulse opacity-60"></div>
              </button>
            </div>
            {!collapsed && (
              <span className="text-foreground font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-text tracking-wide">
                Infiverse
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Container */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent relative z-10">
        <div className={`transition-all duration-700 ${collapsed ? 'p-2' : 'p-4'}`}>
          {/* Enhanced Main Navigation */}
          <nav className={`transition-all duration-700 ${collapsed ? 'space-y-1.5' : 'space-y-3'}`}>
            {renderRoutes.map((route) => {
              const isActive = location.pathname === route.href;
              return (
                <Link
                  key={route.href}
                  to={route.href}
                  className={`group flex items-center transition-all duration-500 relative overflow-hidden hover-electric ${
                    collapsed 
                      ? 'justify-center p-3.5 rounded-2xl mx-1' 
                      : 'gap-5 px-5 py-4 rounded-2xl'
                  } ${
                    isActive
                      ? "electric-active text-primary-foreground glow-primary shadow-electric transform scale-[1.02]"
                      : "electric-inactive hover:electric-hover hover:text-primary text-foreground/90 hover:transform hover:scale-[1.01]"
                  }`}
                  title={collapsed ? route.title : undefined}
                >
                  {/* Enhanced Electric Active indicator */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/25 via-secondary/25 to-accent/25 rounded-2xl animate-electric-pulse shadow-inner"></div>
                      <div className="absolute inset-0 bg-cyber-grid opacity-35 rounded-2xl"></div>
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-r-full shadow-glow"></div>
                    </>
                  )}

                  {/* Enhanced Icon with better styling */}
                  <div className={`relative z-10 transition-all duration-500 ${
                    collapsed ? 'p-2.5' : 'p-2'
                  } rounded-xl ${
                    isActive
                      ? 'bg-gradient-to-br from-primary/30 to-secondary/20 text-primary-foreground electric-glow shadow-lg'
                      : 'bg-gradient-to-br from-primary/10 to-secondary/5 text-primary/80 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/15 group-hover:text-primary group-hover:electric-glow group-hover:shadow-md'
                  }`}>
                    <route.icon className={`transition-all duration-500 ${collapsed ? 'h-6 w-6' : 'h-5 w-5'} ${isActive ? 'animate-pulse' : 'group-hover:scale-110 group-hover:rotate-3'}`} />
                  </div>

                  {/* Enhanced Text with cyber styling */}
                  {!collapsed && (
                    <div className="relative z-10 flex-1">
                      <span className="transition-all duration-500 text-sm font-semibold tracking-wide">
                        {route.title}
                      </span>
                      {isActive && (
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-electric-pulse"></div>
                      )}
                    </div>
                  )}

                  {/* Enhanced Electric glow effect */}
                  {isActive && (
                    <>
                      <div className={`absolute ${collapsed ? 'right-1.5 top-1.5' : 'right-4 top-1/2 transform -translate-y-1/2'} w-2.5 h-2.5 bg-gradient-to-r from-accent to-secondary rounded-full animate-electric-pulse shadow-accent-glow`}></div>
                      {!collapsed && (
                        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent opacity-60"></div>
                      )}
                    </>
                  )}
                </Link>
              );
            })}

            {/* Enhanced Workspace Button */}
            <div className={`group flex items-center transition-all duration-500 relative overflow-hidden hover-electric ${
              collapsed 
                ? 'justify-center p-3.5 rounded-2xl mx-1' 
                : 'gap-5 px-5 py-4 rounded-2xl'
            } electric-inactive hover:electric-hover hover:text-primary text-foreground/90 cursor-pointer hover:transform hover:scale-[1.01] border border-primary/5 hover:border-primary/20`}
            title={collapsed ? "Workspace" : undefined}>
              <div className={`relative z-10 transition-all duration-500 ${
                collapsed ? 'p-2.5' : 'p-2'
              } rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 text-primary/80 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/15 group-hover:text-primary group-hover:electric-glow group-hover:shadow-md`}>
                <svg className={`transition-all duration-500 ${collapsed ? 'h-6 w-6' : 'h-5 w-5'} group-hover:scale-110 group-hover:rotate-3`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              {!collapsed && (
                <div className="relative z-10 flex-1">
                  <span className="text-sm font-semibold tracking-wide">Default Workspace</span>
                  <div className="text-xs text-accent/80 font-medium">Active</div>
                </div>
              )}
            </div>

            {/* Enhanced Settings Button */}
            <Link
              to="/settings"
              className={`group flex items-center transition-all duration-500 relative overflow-hidden hover-electric ${
                collapsed 
                  ? 'justify-center p-3.5 rounded-2xl mx-1' 
                  : 'gap-5 px-5 py-4 rounded-2xl'
              } ${
                location.pathname === '/settings' 
                  ? "electric-active text-primary-foreground glow-primary shadow-electric transform scale-[1.02]"
                  : "electric-inactive hover:electric-hover hover:text-primary text-foreground/90 hover:transform hover:scale-[1.01]"
              }`}
              title={collapsed ? "Settings" : undefined}
            >
              {location.pathname === '/settings' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/25 via-secondary/25 to-accent/25 rounded-2xl animate-electric-pulse shadow-inner"></div>
                  <div className="absolute inset-0 bg-cyber-grid opacity-35 rounded-2xl"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-r-full shadow-glow"></div>
                </>
              )}
              <div className={`relative z-10 transition-all duration-500 ${
                collapsed ? 'p-2.5' : 'p-2'
              } rounded-xl ${
                location.pathname === '/settings'
                  ? 'bg-gradient-to-br from-primary/30 to-secondary/20 text-primary-foreground electric-glow shadow-lg'
                  : 'bg-gradient-to-br from-primary/10 to-secondary/5 text-primary/80 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/15 group-hover:text-primary group-hover:electric-glow group-hover:shadow-md'
              }`}>
                <Settings className={`transition-all duration-500 ${collapsed ? 'h-6 w-6' : 'h-5 w-5'} group-hover:rotate-90 ${location.pathname === '/settings' ? 'animate-pulse' : 'group-hover:scale-110'}`} />
              </div>
              {!collapsed && (
                <div className="relative z-10 flex-1">
                  <span className="transition-all duration-500 text-sm font-semibold tracking-wide">
                    Settings
                  </span>
                  {location.pathname === '/settings' && (
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-electric-pulse"></div>
                  )}
                </div>
              )}
              {location.pathname === '/settings' && (
                <>
                  <div className={`absolute ${collapsed ? 'right-1.5 top-1.5' : 'right-4 top-1/2 transform -translate-y-1/2'} w-2.5 h-2.5 bg-gradient-to-r from-accent to-secondary rounded-full animate-electric-pulse shadow-accent-glow`}></div>
                  {!collapsed && (
                    <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent opacity-60"></div>
                  )}
                </>
              )}
            </Link>
          </nav>
        </div>
      </div>

      {/* Enhanced User Section */}
      <div className="bg-gradient-to-r from-primary/8 to-secondary/8 flex-shrink-0 relative z-10 border-t border-primary/10">
        <div className={`transition-all duration-700 ${collapsed ? 'p-3' : 'p-4'}`}>
          {collapsed ? (
            <div className="space-y-3">
              {/* Enhanced Collapsed User Avatar */}
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl flex items-center justify-center text-white font-bold electric-glow animate-glow-pulse shadow-lg ring-2 ring-primary/20">
                  {user?.name?.charAt(0) || "U"}
                </div>
              </div>
              {/* Enhanced Collapsed Sign Out Button */}
              <button
                onClick={logout}
                className="group w-full flex items-center justify-center p-3.5 rounded-2xl transition-all duration-500 relative overflow-hidden hover-electric electric-inactive hover:electric-hover hover:text-destructive text-foreground/90 hover:transform hover:scale-[1.05]"
                title="Sign Out"
              >
                <div className="relative z-10 p-2 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 text-destructive/80 group-hover:bg-gradient-to-br group-hover:from-destructive/20 group-hover:to-destructive/15 group-hover:text-destructive group-hover:electric-glow group-hover:shadow-md">
                  <LogOut className="h-6 w-6 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12" />
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Enhanced User Profile Section */}
              <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/15 electric-profile relative overflow-hidden border border-primary/10 hover:border-primary/20 transition-all duration-500">
                <div className="absolute inset-0 bg-cyber-grid opacity-25"></div>
                <div className="w-12 h-12 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl flex items-center justify-center text-white font-bold electric-glow animate-glow-pulse relative z-10 shadow-lg">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="flex-1 min-w-0 relative z-10">
                  <div className="text-sm font-bold truncate text-foreground tracking-wide">{user?.name || "User"}</div>
                  <div className="text-xs text-accent/80 truncate font-medium">{user?.role || "User"}</div>
                  <div className="mt-1 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                </div>
              </div>

              {/* Enhanced Sign Out Button */}
              <button
                onClick={logout}
                className="group w-full flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-500 relative overflow-hidden hover-electric electric-inactive hover:electric-hover hover:text-destructive text-foreground/90 hover:transform hover:scale-[1.02] border border-destructive/10 hover:border-destructive/20"
              >
                <div className="relative z-10 p-2 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 text-destructive/80 group-hover:bg-gradient-to-br group-hover:from-destructive/20 group-hover:to-destructive/15 group-hover:text-destructive group-hover:electric-glow group-hover:shadow-md">
                  <LogOut className="h-5 w-5 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12" />
                </div>
                <span className="relative z-10 text-sm font-semibold tracking-wide">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}