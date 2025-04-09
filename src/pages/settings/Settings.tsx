
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, Link as LinkIcon, Database } from 'lucide-react';

const Settings = () => {
  const settingsCategories = [
    {
      title: "System Settings",
      description: "Configure system preferences and access controls",
      icon: <SettingsIcon className="h-5 w-5" />,
      link: "#"
    },
    {
      title: "Integrations",
      description: "Manage connections with external systems",
      icon: <LinkIcon className="h-5 w-5" />,
      link: "/settings/integrations"
    },
    {
      title: "Database Configuration",
      description: "Configure database connections and storage settings",
      icon: <Database className="h-5 w-5" />,
      link: "#"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">System Settings</h1>
      <p className="text-muted-foreground">Configure system preferences and integrations.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingsCategories.map((category, index) => (
          <Link key={index} to={category.link} className="block">
            <Card className="h-full hover:bg-gray-50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-md">{category.icon}</div>
                <div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Settings;
