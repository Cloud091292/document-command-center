
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, File, FileText, Loader2, Plus, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên tài liệu"),
  category: z.string(),
  permissions: z.object({
    viewerRoles: z.array(z.string()),
    editorRoles: z.array(z.string()),
    adminRoles: z.array(z.string()),
    allUsers: z.boolean()
  }),
  effectiveFrom: z.date().optional(),
  effectiveTo: z.date().optional(),
  status: z.string(),
  physicalStorage: z.string().optional(),
  retentionPeriod: z.string().optional(),
  tags: z.array(z.string()),
  description: z.string().optional(),
  customerId: z.string().optional(),
  contractNumber: z.string().optional(),
  subscriberIds: z.array(z.string()),
  referenceDocs: z.array(z.object({
    name: z.string(),
    link: z.string()
  })),
});

export function DocumentUploadDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      permissions: {
        viewerRoles: [],
        editorRoles: [],
        adminRoles: [],
        allUsers: true
      },
      tags: [],
      subscriberIds: [],
      referenceDocs: []
    },
  });

  const documentStatuses = [
    { value: "not-returned", label: "Chưa hoàn trả" },
    { value: "returned", label: "Đã hoàn trả" },
    { value: "cancelled", label: "Hủy bỏ" },
    { value: "debt", label: "Khoanh nợ hồ sơ" },
    { value: "received", label: "Tiếp nhận" },
    { value: "loaned", label: "Cho mượn" },
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Implement submission logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm tài liệu mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Thêm tài liệu mới</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="upload">
          <TabsList>
            <TabsTrigger value="upload">Upload file</TabsTrigger>
            <TabsTrigger value="template">Tạo từ template</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <input type="file" className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <File className="h-10 w-10 text-muted-foreground" />
                      <h3 className="font-medium">Kéo thả file vào đây hoặc</h3>
                      <Button type="button" variant="secondary" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Chọn file
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Hỗ trợ: PDF, DOCX, XLSX, JPG, PNG (tối đa 50MB)
                      </p>
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên tài liệu</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập tên tài liệu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trạng thái hồ sơ</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {documentStatuses.map(status => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="effectiveFrom"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Hiệu lực từ</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Chọn ngày</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="effectiveTo"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Hiệu lực đến</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Chọn ngày</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contractNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số hợp đồng</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập số hợp đồng" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mã khách hàng</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập mã khách hàng" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Nhập mô tả chi tiết về tài liệu" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" type="button">Lưu nháp</Button>
                  <Button type="submit">Chuyển phê duyệt</Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="template">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormLabel>Chọn template</FormLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Hợp đồng kinh doanh</SelectItem>
                      <SelectItem value="nda">NDA</SelectItem>
                      <SelectItem value="memo">Biên bản ghi nhớ</SelectItem>
                      <SelectItem value="report">Báo cáo định kỳ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border rounded-lg p-4 min-h-[400px] bg-muted/10">
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Vui lòng chọn template để xem trước và chỉnh sửa
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Lưu nháp</Button>
                <Button>Chuyển phê duyệt</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
