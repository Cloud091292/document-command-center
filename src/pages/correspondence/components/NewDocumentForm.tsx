
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";

// Define the form schema with validation
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Tiêu đề cần có ít nhất 5 ký tự.",
  }),
  classification: z.string().min(1, {
    message: "Vui lòng chọn loại công văn.",
  }),
  referenceCode: z.string().min(3, {
    message: "Số công văn cần có ít nhất 3 ký tự.",
  }),
  destinationUnit: z.string().min(1, {
    message: "Vui lòng chọn đơn vị nhận.",
  }),
  recipient: z.string().min(3, {
    message: "Tên người nhận cần có ít nhất 3 ký tự.",
  }),
  dateSent: z.string().min(1, {
    message: "Vui lòng chọn ngày ban hành.",
  }),
  deadline: z.string().min(1, {
    message: "Vui lòng chọn hạn xử lý.",
  }),
  priority: z.string().min(1, {
    message: "Vui lòng chọn mức độ ưu tiên.",
  }),
  releaseStatus: z.string().min(1, {
    message: "Vui lòng chọn trạng thái phát hành.",
  }),
  content: z.string().min(10, {
    message: "Nội dung cần có ít nhất 10 ký tự.",
  }),
});

export function NewDocumentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      classification: "",
      referenceCode: "",
      destinationUnit: "",
      recipient: "",
      dateSent: format(new Date(), "yyyy-MM-dd"),
      deadline: "",
      priority: "Bình thường",
      releaseStatus: "Bản nháp",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the form data to your backend
    // Show success notification or handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề công văn</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tiêu đề công văn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="classification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại công văn</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại công văn" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Tài chính">Tài chính</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Pháp lý">Pháp lý</SelectItem>
                    <SelectItem value="Nhân sự">Nhân sự</SelectItem>
                    <SelectItem value="Vận hành">Vận hành</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="referenceCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số công văn</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập số công văn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="destinationUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đơn vị nhận</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn đơn vị nhận" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Ban giám đốc">Ban giám đốc</SelectItem>
                    <SelectItem value="Phòng Tài chính">Phòng Tài chính</SelectItem>
                    <SelectItem value="Phòng Marketing">Phòng Marketing</SelectItem>
                    <SelectItem value="Phòng Nhân sự">Phòng Nhân sự</SelectItem>
                    <SelectItem value="Phòng Pháp lý">Phòng Pháp lý</SelectItem>
                    <SelectItem value="Phòng Vận hành">Phòng Vận hành</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Người nhận</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên người nhận" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dateSent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày ban hành</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hạn xử lý</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mức độ ưu tiên</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mức độ ưu tiên" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Bình thường">Bình thường</SelectItem>
                    <SelectItem value="Khẩn">Khẩn</SelectItem>
                    <SelectItem value="Hỏa tốc">Hỏa tốc</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="releaseStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái phát hành</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Chính thức">Chính thức</SelectItem>
                    <SelectItem value="Nội bộ">Nội bộ</SelectItem>
                    <SelectItem value="Bảo mật">Bảo mật</SelectItem>
                    <SelectItem value="Bản nháp">Bản nháp</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nội dung</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Nhập nội dung công văn..." 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="pt-4">
          <Button type="submit">Tạo công văn</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
