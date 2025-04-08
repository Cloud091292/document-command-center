
import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Bookmark,
  FolderOpen,
  Trash2,
  Send,
  FileDown,
  FileUp,
  FileCog,
  FileStack,
  CheckSquare,
  Settings,
  ChevronDown
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">DMS</h1>
            <p className="text-xs text-muted-foreground">Document Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Document Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <Collapsible>
              <CollapsibleTrigger className="flex items-center w-full p-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <div className="flex items-center flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Document Library</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/documents/all" className="pl-8">
                        <FolderOpen className="h-4 w-4" />
                        <span>All Documents</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/documents/my-documents" className="pl-8">
                        <FileText className="h-4 w-4" />
                        <span>My Documents</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/documents/bookmarks" className="pl-8">
                        <Bookmark className="h-4 w-4" />
                        <span>Bookmarks</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/documents/trash" className="pl-8">
                        <Trash2 className="h-4 w-4" />
                        <span>Trash</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="flex items-center w-full p-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <div className="flex items-center flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  <span>Correspondence</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/correspondence/incoming" className="pl-8">
                        <FileDown className="h-4 w-4" />
                        <span>Incoming</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/correspondence/outgoing" className="pl-8">
                        <FileUp className="h-4 w-4" />
                        <span>Outgoing</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/correspondence/classification" className="pl-8">
                        <FileCog className="h-4 w-4" />
                        <span>Classification</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/templates">
                  <FileStack className="h-4 w-4" />
                  <span>Templates</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Approval Workflows</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/approval/my-requests">
                    <FileText className="h-4 w-4" />
                    <span>My Requests</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/approval/pending">
                    <CheckSquare className="h-4 w-4" />
                    <span>Pending Approval</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings">
                    <Settings className="h-4 w-4" />
                    <span>System Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-3 border-t">
        <div className="text-xs text-muted-foreground">
          <p>DMS v1.0</p>
          <p>© 2025 All rights reserved</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
