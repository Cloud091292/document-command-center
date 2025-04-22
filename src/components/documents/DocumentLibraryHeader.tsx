
import React from 'react';
import { Button } from '@/components/ui/button';
import { DocumentUploadDialog } from './DocumentUploadDialog';
import { FolderPlus, File } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

type FolderFormValues = {
  name: string;
  category: string;
  permissions: {
    admin: boolean;
    editor: boolean;
    viewer: boolean;
  };
  password?: string;
  allUsers: boolean;
};

export const DocumentLibraryHeader = () => {
  const [isCreateFolderOpen, setIsCreateFolderOpen] = React.useState(false);

  const folderForm = useForm<FolderFormValues>({
    defaultValues: {
      name: '',
      category: '',
      permissions: {
        admin: false,
        editor: false,
        viewer: true,
      },
      password: '',
      allUsers: true,
    },
  });

  const handleCreateFolder = (values: FolderFormValues) => {
    console.log('Creating folder:', values);
    toast.success(`Đã tạo thư mục: ${values.name}`);
    setIsCreateFolderOpen(false);
    folderForm.reset();
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Thư viện tài liệu</h1>
        <p className="text-muted-foreground">Duyệt và quản lý tài liệu của bạn</p>
      </div>
      <div className="flex items-center gap-2">
        <DocumentUploadDialog />
        <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
          <DialogTrigger asChild>
            <Button className="h-9">
              <FolderPlus className="mr-2 h-4 w-4" />
              Tạo thư mục
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tạo thư mục mới</DialogTitle>
              <DialogDescription>
                Tạo một thư mục mới để tổ chức tài liệu của bạn.
              </DialogDescription>
            </DialogHeader>
            <Form {...folderForm}>
              <form onSubmit={folderForm.handleSubmit(handleCreateFolder)} className="space-y-4">
                <FormField
                  control={folderForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên thư mục</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên thư mục" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={folderForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="legal">Pháp lý & Cấp phép</SelectItem>
                          <SelectItem value="corporate">Quản trị doanh nghiệp</SelectItem>
                          <SelectItem value="finance">Tài chính - Kế toán</SelectItem>
                          <SelectItem value="hr">Nhân sự & Lao động</SelectItem>
                          <SelectItem value="operations">Vận hành & Giám sát</SelectItem>
                          <SelectItem value="inspection">Kiểm tra & Thanh tra</SelectItem>
                          <SelectItem value="products">Sản phẩm & Dịch vụ</SelectItem>
                          <SelectItem value="admin">Hành chính & Khác</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormItem>
                  <FormLabel>Phân quyền</FormLabel>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="all-users"
                        checked={folderForm.watch("allUsers")}
                        onCheckedChange={(checked) => {
                          folderForm.setValue("allUsers", checked as boolean);
                        }}
                      />
                      <Label htmlFor="all-users">Tất cả người dùng</Label>
                    </div>
                    
                    {!folderForm.watch("allUsers") && (
                      <div className="ml-6 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="perm-admin"
                            checked={folderForm.watch("permissions.admin")}
                            onCheckedChange={(checked) => {
                              folderForm.setValue("permissions.admin", checked as boolean);
                            }}
                          />
                          <Label htmlFor="perm-admin">Quản trị viên</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="perm-editor"
                            checked={folderForm.watch("permissions.editor")}
                            onCheckedChange={(checked) => {
                              folderForm.setValue("permissions.editor", checked as boolean);
                            }}
                          />
                          <Label htmlFor="perm-editor">Biên tập viên</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="perm-viewer"
                            checked={folderForm.watch("permissions.viewer")}
                            onCheckedChange={(checked) => {
                              folderForm.setValue("permissions.viewer", checked as boolean);
                            }}
                          />
                          <Label htmlFor="perm-viewer">Người xem</Label>
                        </div>
                      </div>
                    )}
                  </div>
                </FormItem>
                
                <FormField
                  control={folderForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu (tùy chọn)</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Nhập mật khẩu bảo vệ thư mục" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsCreateFolderOpen(false)}>Hủy</Button>
                  <Button type="submit">Tạo thư mục</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
