"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { useToast } from "@/hooks/use-toast";
import { HiOutlineBookOpen } from "react-icons/hi2";
import Link from "next/link";

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);

  const { user } = useUser();
  useEffect(() => {
    user && getUserCourses();
  }, [user]);

  const getUserCourses = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(CourseList.id));

      setCourseList(result);
      setUserCourseList(result);
      localStorage.setItem("userCourseList", JSON.stringify(result));
    } catch (error) {
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-[#E1E0CC]">
          My <span className="font-serif italic text-primary font-normal">AI Courses</span>
        </h2>
        <span className="text-xs text-neutral-500 font-mono">{courseList?.length || 0} active courses</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="bg-[#151515] border border-neutral-900 rounded-xl p-3 animate-pulse"
            >
              <div className="w-full h-[200px] bg-[#212121] rounded-lg"></div>
              <div className="p-2">
                <div className="h-5 bg-[#212121] rounded w-3/4 mb-3 mt-2"></div>
                <div className="h-3 bg-[#212121] rounded w-1/2 mb-4"></div>
                <div className="flex items-center justify-between">
                  <div className="h-5 bg-[#212121] rounded w-1/3"></div>
                  <div className="h-5 bg-[#212121] rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))
        ) : courseList?.length != 0 ? (
          courseList.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              refreshData={() => getUserCourses()}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center col-span-full py-20 px-6 border border-dashed border-neutral-800 rounded-2xl bg-[#111111]/30">
            <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800 text-neutral-400 mb-4">
              <HiOutlineBookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-[#E1E0CC] font-medium text-lg">No courses generated yet</h3>
            <p className="text-sm text-neutral-500 max-w-sm mt-1 mb-6">
              Ready to learn something new? Build your first custom workspace by running the AI Generator.
            </p>
            <Link href="/create-course">
              <button className="bg-[#DEDBC8] hover:bg-[#E1E0CC] text-black font-semibold text-xs sm:text-sm rounded-full px-5 py-2.5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md">
                Start Generating
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCourseList;
