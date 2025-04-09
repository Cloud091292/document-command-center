
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar } from '@/components/ui/avatar';
import { 
  FilePlus, 
  Search, 
  MoreHorizontal, 
  FileText, 
  Plus 
} from 'lucide-react';
import { TemplateDialog } from '@/components/templates/TemplateDialog';
import { useToast } from '@/hooks/use-toast';

// Define template data type
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  updatedAt: Date;
  author: {
    name: string;
    avatar?: string;
  };
}

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock template data
  const templates: Template[] = [
    {
      id: '1',
      name: 'Standard Contract',
      description: 'Standard contract template for customer agreements',
      category: 'Contracts & Agreements',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
      author: {
        name: 'John Doe',
      },
    },
    {
      id: '2',
      name: 'NDA Template',
      description: 'Non-disclosure agreement template for external partners',
      category: 'Legal & Compliance Documents',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 1 month ago
      author: {
        name: 'Jane Smith',
      },
    },
    {
      id: '3',
      name: 'Invoice Template',
      description: 'Standard invoice template for billing customers',
      category: 'Financial & Accounting Documents',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21), // 3 weeks ago
      author: {
        name: 'Mike Johnson',
      },
    },
    {
      id: '4',
      name: 'Employee Contract',
      description: 'Standard employment contract for new hires',
      category: 'HR & Employee Records',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60), // 2 months ago
      author: {
        name: 'Sarah Williams',
      },
    },
    {
      id: '5',
      name: 'Project Report',
      description: 'Template for creating project status reports',
      category: 'Operational Reports & Project Documentation',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
      author: {
        name: 'David Brown',
      },
    },
    {
      id: '6',
      name: 'Purchase Order',
      description: 'Standard purchase order template for vendors',
      category: 'Procurement & Vendor Management',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      author: {
        name: 'Emily Clark',
      },
    },
  ];

  // Get unique categories for filter dropdown
  const categories = ['All Categories', ...new Set(templates.map(t => t.category))];
  
  // Filter templates by search query and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sort templates based on selected sort option
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === 'recent') {
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 7) {
      return `Updated ${days} days ago`;
    } else if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `Updated ${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      const months = Math.floor(days / 30);
      return `Updated ${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
  };

  const handleCreateTemplate = () => {
    setIsCreateDialogOpen(true);
  };

  const handlePreview = (templateId: string) => {
    // Preview template implementation
    toast({
      title: "Template Preview",
      description: `Previewing template ID: ${templateId}`,
    });
  };

  const handleTemplateCreated = () => {
    toast({
      title: "Success",
      description: "Template created successfully",
    });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Document Templates</h1>
        <Button onClick={handleCreateTemplate}>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search templates..." 
            className="pl-10" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.filter(c => c !== 'All Categories').map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Recently Updated" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Updated</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-4">
                <div className="text-xs bg-muted inline-block px-2 py-1 rounded-md">{template.category}</div>
                <p className="text-xs text-muted-foreground mt-2">{formatRelativeTime(template.updatedAt)}</p>
              </div>
            </CardContent>
            
            <CardFooter className="bg-muted/50 px-6 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  {template.author.avatar ? (
                    <img src={template.author.avatar} alt={template.author.name} />
                  ) : (
                    <div className="bg-primary h-full w-full flex items-center justify-center text-xs text-white">
                      {template.author.name.charAt(0)}
                    </div>
                  )}
                </Avatar>
                <span className="text-xs">{template.author.name}</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs" 
                onClick={() => handlePreview(template.id)}
              >
                Preview
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Create New Template Card */}
        <Card className="overflow-hidden flex flex-col justify-center items-center text-center p-10">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Create New Template</h3>
          <p className="text-sm text-muted-foreground mb-6">Create a custom document template for your organization</p>
          <Button onClick={handleCreateTemplate} className="mt-auto">Create Template</Button>
        </Card>
      </div>

      <TemplateDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
        onTemplateCreated={handleTemplateCreated}
      />
    </div>
  );
};

export default Templates;
