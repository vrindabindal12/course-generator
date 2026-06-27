import React, { useState } from "react";
import Image from "next/image";
import { HiOutlinePuzzle } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { supabase } from "@/lib/supabaseClient";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const CourseBasicInfo = ({ course, refreshData, edit = true }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const onFileSelected = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setSelectedFile(URL.createObjectURL(file));
      setUploading(true);

      if (course?.courseBanner && course.courseBanner !== "/placeholder.png") {
        const filePath = course.courseBanner.split("/").pop();
        await supabase.storage.from("ai-course").remove([filePath]);
      }

      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("ai-course")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;
      toast({
        variant: "success",
        duration: 3000,
        title: "Image Uploaded Successfully!",
        description: "Image has been uploaded successfully.",
      });

      const { data: publicUrlData } = supabase.storage
        .from("ai-course")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;
      if (!imageUrl) {
        toast({
          variant: "error",
          duration: 3000,
          title: "Public URL not found.",
          description: "There was a problem with your request.",
        });
        return;
      }

      await db
        .update(CourseList)
        .set({ courseBanner: imageUrl })
        .where(eq(CourseList.id, course?.id));

      refreshData(true);
    } catch (error) {
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <div className="p-8 md:p-10 border border-neutral-800 bg-[#101010] rounded-2xl shadow-lg mt-5 relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-medium text-[#E1E0CC] tracking-tight flex gap-2 items-center">
            {course?.courseOutput?.CourseName}
          </h2>
          {edit && (
            <div className="mt-2">
              <EditCourseBasicInfo course={course} size={50} refreshData={() => refreshData(true)} />
            </div>
          )}
          <p className="text-sm text-neutral-400 mt-4 leading-relaxed">{course?.courseOutput?.Description}</p>
          <h2 className="font-semibold mt-4 flex gap-2 items-center text-primary text-xs uppercase tracking-widest">
            <HiOutlinePuzzle size={18} />
            {course?.category}
          </h2>
          {!edit && (
            <Link href={`/course/${course?.courseId}/start`} className="block w-full mt-6">
              <Button className="w-full py-6 rounded-full bg-primary text-black hover:bg-[#c9c6b3] font-semibold text-sm shadow-md transition-transform duration-200 active:scale-95">
                Start Course
              </Button>
            </Link>
          )}
        </div>

        <div className="overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950">
          <label htmlFor="upload-image" className="cursor-pointer block relative group">
            <Image
              src={selectedFile ? selectedFile : course?.courseBanner || "/placeholder.png"}
              quality={100}
              priority={true}
              alt="Course banner"
              width={300}
              height={300}
              className="w-full object-cover h-[250px] transition-transform duration-500 group-hover:scale-103"
            />
          </label>
          {edit && (
            <input
              type="file"
              accept="image/*"
              id="upload-image"
              className="hidden"
              onChange={onFileSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;

