import Image from "next/image";
import React from "react";
import { HiOutlineBookOpen, HiEllipsisVertical } from "react-icons/hi2";
import DropDown from "./DropDown";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SpotlightCard from "../../_components/SpotlightCard";

function CourseCard({ course, refreshData, displayUser = false }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleCardClick = (e) => {
    const path = course?.publish
      ? `/course/${course.courseId}`
      : `/create-course/${course?.courseId}`;
    router.push(path);
  };

  const handleOnDelete = async () => {
    try {
      // Delete Banner Image
      if (course?.courseBanner !== "/placeholder.png") {
        const filePath = course?.courseBanner
          .replace(
            "https://firebasestorage.googleapis.com/v0/b/explorer-1844f.firebasestorage.app/o/",
            ""
          );

        const { error: storageError } = await supabase.storage
          .from("your-bucket-name")
          .remove([decodeURIComponent(filePath)]);

        if (storageError) throw storageError;
      }

      // Delete Course
      const courseResponse = await db
        .delete(CourseList)
        .where(eq(CourseList.id, course?.id))
        .returning({ id: CourseList?.id });

      // Delete Chapters
      const chapterResponse = await db
        .delete(Chapters)
        .where(eq(Chapters.courseId, course?.courseId))
        .returning({ id: Chapters?.id });

      if (courseResponse && chapterResponse) {
        refreshData();
        toast({
          variant: "success",
          duration: 3000,
          title: "Course Deleted Successfully!",
          description: "Course has been deleted successfully!",
        });
      }
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
    <SpotlightCard
      onClick={handleCardClick}
      className="bg-[#151515] rounded-2xl p-3 hover:border-primary/35 shadow-lg shadow-black/30 group cursor-pointer"
    >
      <div className="overflow-hidden rounded-lg w-full h-[200px] relative z-20">
        <Image
          src={course?.courseBanner}
          alt="course"
          width={300}
          height={200}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-2 relative z-20">
        <h2 className="font-semibold text-base mt-2 flex justify-between items-center text-[#E1E0CC] line-clamp-1">
          {course?.courseOutput?.CourseName}
          {!displayUser && (
            <div 
              onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation(); 
              }}
              className="relative z-30"
            >
              <DropDown
                courseId={course?.courseId}
                handleOnDelete={() => handleOnDelete()}
              >
                <div className="p-1 rounded-lg hover:bg-neutral-850 transition-colors">
                  <HiEllipsisVertical className="text-gray-400 hover:text-[#E1E0CC] w-4 h-4 transition-colors" />
                </div>
              </DropDown>
            </div>
          )}
        </h2>

        <p className="my-1.5 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{course?.category}</p>
        <div className="flex items-center justify-between mt-3">
          <h2 className="flex gap-1.5 items-center px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-primary text-xs font-medium">
            <HiOutlineBookOpen className="w-3.5 h-3.5" />
            {course?.courseOutput?.NoOfChapters} Chapters
          </h2>

          {!displayUser && course?.publish == false && (
            <h2 className="rounded-full hidden md:block border border-red-500/20 bg-red-500/10 text-red-400 text-[10px] px-2.5 py-0.5 font-medium transition-colors hover:bg-red-500/20">
              Draft
            </h2>
          )}
          <h2 className="rounded-full bg-neutral-900 border border-neutral-800 text-primary text-xs px-2.5 py-1 font-medium">
            {course?.level}
          </h2>
        </div>
      </div>
      {displayUser && (
        <div className="flex items-center gap-2 mt-2 pl-1 pt-2 border-t border-neutral-900 relative z-20">
          <Image
            src={course?.userProfileImage}
            width={20}
            height={20}
            alt="user profile image"
            className="rounded-full"
          />
          <h2 className="text-[11px] text-gray-400">{course?.userName}</h2>
        </div>
      )}

      {!displayUser && course?.publish == false && (
        <div className="flex items-center justify-center mt-2 md:hidden relative z-20">
          <h2 className="rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-[10px] px-2.5 py-0.5 font-medium transition-colors hover:bg-red-500/20">
            Draft
          </h2>
        </div>
      )}
    </SpotlightCard>
  );
}

export default CourseCard;
