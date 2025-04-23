
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import DocumentLibrary from "./pages/documents/DocumentLibrary";
import MyDocuments from "./pages/documents/MyDocuments";
import Bookmarks from "./pages/documents/Bookmarks";
import TrashBin from "./pages/documents/TrashBin";
import IncomingDocuments from "./pages/correspondence/IncomingDocuments";
import OutgoingDocuments from "./pages/correspondence/OutgoingDocuments";
import Classification from "./pages/correspondence/Classification";
import Templates from "./pages/templates/Templates";
import MyRequests from "./pages/approval/MyRequests";
import PendingApproval from "./pages/approval/PendingApproval";
import Settings from "./pages/settings/Settings";
import Integrations from "./pages/settings/Integrations";
import NotFound from "./pages/NotFound";
import FormManagement from "./pages/forms/FormManagement";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/documents/all" element={<DocumentLibrary />} />
            <Route path="/documents/my-documents" element={<MyDocuments />} />
            <Route path="/documents/bookmarks" element={<Bookmarks />} />
            <Route path="/documents/trash" element={<TrashBin />} />
            <Route path="/correspondence/incoming" element={<IncomingDocuments />} />
            <Route path="/correspondence/outgoing" element={<OutgoingDocuments />} />
            <Route path="/correspondence/classification" element={<Classification />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/forms" element={<FormManagement />} />
            <Route path="/approval/my-requests" element={<MyRequests />} />
            <Route path="/approval/pending" element={<PendingApproval />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/integrations" element={<Integrations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
