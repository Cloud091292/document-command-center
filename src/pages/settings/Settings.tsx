
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, Link as LinkIcon, Database } from 'lucide-react';

const Settings = () => {
  const settingsCategories = [
    {
      title: "Thiết lập hệ thống",
      description: "Cấu hình tùy chọn hệ thống và kiểm soát truy cập",
      icon: <SettingsIcon className="h-5 w-5" />,
      link: "#"
    },
    {
      title: "Tích hợp hệ thống",
      description: "Quản lý kết nối với các hệ thống bên ngoài",
      icon: <LinkIcon className="h-5 w-5" />,
      link: "/settings/integrations"
    },
    {
      title: "Cấu hình Database",
      description: "Cấu hình kết nối cơ sở dữ liệu và thiết lập lưu trữ",
      icon: <Database className="h-5 w-5" />,
      link: "#"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Thiết lập hệ thống</h1>
      <p className="text-muted-foreground">Cấu hình tùy chọn hệ thống và tích hợp.</p>
      
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
