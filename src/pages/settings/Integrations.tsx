
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, MoreVertical, User, Database, FileText, Cloud, Mail } from "lucide-react";
import { ConnectSystemDialog } from "@/components/settings/ConnectSystemDialog";
import { useToast } from "@/hooks/use-toast";

interface IntegrationFeature {
  id: string;
  name: string;
  enabled: boolean;
}

interface IntegrationSystem {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  icon: React.ElementType;
  lastSync: string;
  features: IntegrationFeature[];
}

const Integrations = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [systems, setSystems] = useState<IntegrationSystem[]>([
    {
      id: "crm",
      name: "CRM System",
      description: "Connect with your CRM to automatically store customer-related documents",
      connected: true,
      icon: User,
      lastSync: "2 hours ago",
      features: [{ id: "auto-sync", name: "Auto-sync", enabled: true }]
    },
    {
      id: "erp",
      name: "ERP System",
      description: "Integrate with your ERP for financial document management",
      connected: true,
      icon: Database,
      lastSync: "1 day ago",
      features: [{ id: "auto-sync", name: "Auto-sync", enabled: true }]
    },
    {
      id: "hrm",
      name: "HRM System",
      description: "Connect with your HR system to manage employee documents",
      connected: false,
      icon: User,
      lastSync: "",
      features: [{ id: "auto-sync", name: "Auto-sync", enabled: false }]
    },
    {
      id: "billing",
      name: "Billing System",
      description: "Automatically store invoices and payment records",
      connected: true,
      icon: FileText,
      lastSync: "3 hours ago",
      features: [{ id: "auto-sync", name: "Auto-sync", enabled: true }]
    },
    {
      id: "email",
      name: "Email Integration",
      description: "Automatically save email attachments as documents",
      connected: false,
      icon: Mail,
      lastSync: "",
      features: [{ id: "auto-sync", name: "Auto-sync", enabled: false }]
    },
    {
      id: "cloud",
      name: "Cloud Storage",
      description: "Connect with cloud storage providers for document backup",
      connected: true,
      icon: Cloud,
      lastSync: "5 hours ago",
      features: [{ id: "auto-sync", name: "Auto-sync", enabled: true }]
    }
  ]);

  const handleToggleFeature = (systemId: string, featureId: string) => {
    setSystems(systems.map(system => {
      if (system.id === systemId) {
        return {
          ...system,
          features: system.features.map(feature => {
            if (feature.id === featureId) {
              return { ...feature, enabled: !feature.enabled };
            }
            return feature;
          })
        };
      }
      return system;
    }));
    
    toast({
      title: "Feature updated",
      description: "Integration feature setting has been updated",
    });
  };

  const handleAddSystem = (system: Partial<IntegrationSystem>) => {
    // In a real implementation, this would connect to the API
    toast({
      title: "System connected",
      description: `${system.name} has been successfully connected`,
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Integrations</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {systems.map((system) => (
          <Card key={system.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <system.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{system.name}</h3>
                      <p className="text-sm text-muted-foreground">{system.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-4">
                  {system.connected ? (
                    <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full inline-flex items-center">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-1.5"></span>
                      Connected
                      {system.lastSync && <span className="ml-2 text-gray-500">Last sync: {system.lastSync}</span>}
                    </div>
                  ) : (
                    <div className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded-full inline-flex items-center">
                      <span className="h-2 w-2 bg-gray-400 rounded-full mr-1.5"></span>
                      Not Connected
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t">
                {system.features.map((feature) => (
                  <div key={`${system.id}-${feature.id}`} className="p-4 flex justify-between items-center">
                    <span className="font-medium">{feature.name}</span>
                    <Switch 
                      checked={feature.enabled}
                      disabled={!system.connected}
                      onCheckedChange={() => handleToggleFeature(system.id, feature.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConnectSystemDialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddSystem}
      />
    </div>
  );
};

export default Integrations;
