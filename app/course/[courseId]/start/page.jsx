"use client";
import Skeleton from "react-loading-skeleton"; // Install via: npm install react-loading-skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import default styles
import { HiChevronDoubleLeft } from "react-icons/hi";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import React, { useState, useEffect } from "react";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function CourseStart({ params }) {
  const Params = useParams(params);
  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedChapterContent, setSelectedChapterContent] = useState(null);
  const [handleSidebar, setHandleSidebar] = useState(false);
  const [courseLoading, setCourseLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);
  const { toast } = useToast();

  const handleSideBarFunction = () => {
    setHandleSidebar(!handleSidebar);
  };

  useEffect(() => {
    if (Params) GetCourse();
  }, [Params]);

  useEffect(() => {
    if (course && course?.courseOutput?.Chapters?.length > 0) {
      const firstChapter = course?.courseOutput?.Chapters[0];
      setSelectedChapter(firstChapter);
      GetSelectedChapterContent(0);
    }
  }, [course]);

  useEffect(() => {
    setHandleSidebar(false);
  }, [selectedChapter]);

  const GetCourse = async () => {
    setCourseLoading(true);
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, Params?.courseId));

      if (result.length > 0) {
        const fetchedCourse = result[0];
        setCourse(fetchedCourse);
      }
    } catch (error) {
      // console.error(error);
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setCourseLoading(false);
    }
  };

  const GetSelectedChapterContent = async (chapterId) => {
    setContentLoading(true);
    try {
      const result = await db
        .select()
        .from(Chapters)
        .where(
          and(
            eq(Chapters.courseId, course?.courseId),
            eq(Chapters.chapterId, chapterId)
          )
        );

      if (result.length > 0) {
        setSelectedChapterContent(result[0]);
      }
    } catch (error) {
      // console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setContentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#E1E0CC]">
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-6 py-3 border-b border-neutral-900 bg-black/80 backdrop-blur-md sticky top-0 z-40 h-[60px]">
        <div className="flex items-center gap-2.5">
          <Link
            href={`/course/${Params?.courseId}`}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm font-medium"
            title="Back to Course Overview"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-4 w-[1px] bg-neutral-850 hidden sm:block" />
          <Link href="/">
            <div className="text-xl font-bold text-[#E1E0CC] tracking-wide flex items-center select-none cursor-pointer">
              Prisma<span className="text-primary text-xs ml-0.5 align-super">*</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      <div className="flex relative min-h-[calc(100vh-60px)]">
        {/* Chapter list Side Bar : LHS */}
        <div
          className={`fixed top-[60px] md:w-72 overflow-y-auto bg-black border-r border-neutral-900 ${handleSidebar ? "block w-80 z-50" : "hidden"
            } md:block h-[calc(100vh-60px)] shadow-lg`}
        >
          <div className="flex bg-[#151515] border-b border-neutral-900 text-[#E1E0CC] justify-between p-4 items-center">
            <h2 className="font-medium text-sm sm:text-base tracking-tight line-clamp-1">
              {courseLoading ? (
                <Skeleton width={120} baseColor="#202020" highlightColor="#303030" />
              ) : (
                course?.courseOutput?.CourseName
              )}
            </h2>
            <HiChevronDoubleLeft
              size={20}
              className="cursor-pointer md:hidden hover:text-white transition-colors"
              onClick={() => setHandleSidebar(false)}
            />
          </div>

          <div className="flex flex-col">
            {courseLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="p-4 border-b border-neutral-900">
                  <Skeleton height={40} baseColor="#202020" highlightColor="#303030" />
                </div>
              ))
              : course?.courseOutput?.Chapters.map((chapter, index) => (
                <div
                  key={index}
                  className={`cursor-pointer transition-colors duration-200 border-l-2 group ${selectedChapter?.ChapterName === chapter?.ChapterName
                    ? "bg-[#151515] border-primary text-white"
                    : "bg-transparent border-transparent text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200"
                    }`}
                  onClick={() => {
                    setSelectedChapter(chapter);
                    GetSelectedChapterContent(index);
                  }}
                >
                  <ChapterListCard chapter={chapter} index={index} />
                </div>
              ))}
          </div>
        </div>

        {/* Content Div : RHS */}
        <div className="md:ml-72 p-6 md:p-10 min-h-[calc(100vh-60px)] bg-black w-full">
          {contentLoading ? (
            <div className="max-w-4xl mx-auto px-4 md:px-8 mt-10">
              <Skeleton height={30} width={200} baseColor="#202020" highlightColor="#303030" />
              <Skeleton height={200} className="my-5" baseColor="#202020" highlightColor="#303030" />
              <Skeleton height={150} count={3} className="my-3" baseColor="#202020" highlightColor="#303030" />
            </div>
          ) : (
            <ChapterContent
              chapter={selectedChapter}
              content={selectedChapterContent}
              handleSideBarFunction={() => handleSideBarFunction()}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseStart;
