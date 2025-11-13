import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Activity, Settings, BarChart3 } from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();

  const statsCards = [
    {
      title: 'Total Users',
      value: '1,234',
      description: '+20.1% from last month',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Sessions',
      value: '156',
      description: '+4.2% from last hour',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'Total Revenue',
      value: '$12,345',
      description: '+12.5% from last month',
      icon: BarChart3,
      color: 'text-purple-600'
    },
    {
      title: 'System Health',
      value: '99.9%',
      description: 'All systems operational',
      icon: Settings,
      color: 'text-orange-600'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'User registered', user: 'john@example.com', time: '2 minutes ago' },
    { id: 2, action: 'Payment processed', user: 'jane@example.com', time: '5 minutes ago' },
    { id: 3, action: 'Profile updated', user: 'bob@example.com', time: '10 minutes ago' },
    { id: 4, action: 'New order placed', user: 'alice@example.com', time: '15 minutes ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your application today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest user activities in your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.user}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              Activity Log
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* User Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
          <CardDescription>
            Account information and current session details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Name</p>
              <p className="text-sm text-muted-foreground">{user?.name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Role</p>
              <Badge variant={user?.role === 'ADMIN' ? 'default' : 'secondary'}>
                {user?.role}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Email Verified</p>
              <Badge variant={user?.isEmailVerified ? 'default' : 'destructive'}>
                {user?.isEmailVerified ? 'Verified' : 'Not Verified'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};