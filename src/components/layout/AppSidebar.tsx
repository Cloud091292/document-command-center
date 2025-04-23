import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Inbox,
  Send,
  Tag,
  BookMarked,
  FileArchive,
  Trash2,
  ClipboardCheck,
  Clock,
  Settings,
  FileUp,
  FileQuestion,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export function AppSidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const documentMenuItems = [
    {
      title: 'Thư viện tài liệu',
      path: '/documents/all',
      icon: FileText,
    },
    {
      title: 'Tài liệu của tôi',
      path: '/documents/my-documents',
      icon: FileArchive,
    },
    {
      title: 'Đánh dấu',
      path: '/documents/bookmarks',
      icon: BookMarked,
    },
    {
      title: 'Thùng rác',
      path: '/documents/trash',
      icon: Trash2,
    },
  ];

  const correspondenceMenuItems = [
    {
      title: 'Công văn đến',
      path: '/correspondence/incoming',
      icon: Inbox,
    },
    {
      title: 'Công văn đi',
      path: '/correspondence/outgoing',
      icon: Send,
    },
    {
      title: 'Phân loại',
      path: '/correspondence/classification',
      icon: Tag,
    },
  ];

  const approvalMenuItems = [
    {
      title: 'Yêu cầu của tôi',
      path: '/approval/my-requests',
      icon: FileUp,
    },
    {
      title: 'Chờ phê duyệt',
      path: '/approval/pending',
      icon: Clock,
    },
  ];

  const mainMenuItems = [
    {
      title: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
    },
    {
      title: 'Mẫu tài liệu',
      path: '/templates',
      icon: ClipboardCheck,
    },
    {
      title: 'Biểu mẫu',
      path: '/forms',
      icon: FileQuestion,
    },
  ];

  const sidebarMenuClasses =
    'flex items-center gap-2 w-full p-2 hover:bg-accent rounded-md transition-colors text-sm font-medium';

  return (
    <Sidebar className="border-r border-[#E9EBEF] w-[280px]">
      <div className="flex h-14 items-center px-4 border-b">
        <Link to="/" className="font-semibold flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center text-white font-bold">
            D
          </div>
          <span className="text-lg">DocSystem</span>
        </Link>
        {isMobile && (
          <SidebarTrigger className="ml-auto">
            <button className="p-2">
              <span className="sr-only">Toggle Menu</span>
            </button>
          </SidebarTrigger>
        )}
      </div>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.path} className="mb-1">
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={`${sidebarMenuClasses} ${
                        (item.path === '/' && location.pathname === '/') ||
                        (item.path !== '/' && isActive(item.path))
                          ? 'bg-accent text-accent-foreground'
                          : 'transparent'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2">
            Tài liệu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {documentMenuItems.map((item) => (
                <SidebarMenuItem key={item.path} className="mb-1">
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={`${sidebarMenuClasses} ${
                        isActive(item.path)
                          ? 'bg-accent text-accent-foreground'
                          : 'transparent'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2">
            Công văn
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {correspondenceMenuItems.map((item) => (
                <SidebarMenuItem key={item.path} className="mb-1">
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={`${sidebarMenuClasses} ${
                        isActive(item.path)
                          ? 'bg-accent text-accent-foreground'
                          : 'transparent'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2">
            Phê duyệt
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {approvalMenuItems.map((item) => (
                <SidebarMenuItem key={item.path} className="mb-1">
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={`${sidebarMenuClasses} ${
                        isActive(item.path)
                          ? 'bg-accent text-accent-foreground'
                          : 'transparent'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto pt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/settings"
                    className={`${sidebarMenuClasses} ${
                      isActive('/settings')
                        ? 'bg-accent text-accent-foreground'
                        : 'transparent'
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Cài đặt</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
