"use client";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetail from "@/app/create-course/[courseId]/_components/CourseDetail";
import Header from "@/app/dashboard/_components/Header";
import Sidebar from "@/app/dashboard/_components/Sidebar";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useToast } from "@/hooks/use-toast";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "next/navigation";

function Course({ params }) {
  const Params = useParams(params);
  const { toast } = useToast();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    params && GetCourse();
  }, [params]);

  const GetCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, Params?.courseId));

      if (result[0]?.publish == false) {
        router.replace("/dashboard");
        toast({
          variant: "destructive",
          duration: 3000,
          title: "Course is not published yet.",
        });
        return;
      }
      // console.log(result[0]);
      setCourse(result[0]);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setLoading(false);
    }
  };
  return (
    <div className='bg-black min-h-screen relative'>
      {/* Background noise overlay for style unification */}
      <div className="fixed inset-0 bg-noise opacity-[0.04] pointer-events-none z-30" />
      
      <div className='md:w-64 hidden md:block'>
        <Sidebar />
      </div>

      <div className='md:ml-64 bg-black min-h-screen text-[#E1E0CC]'>
        <Header />
        <div className="p-6 md:p-10 max-w-5xl mx-auto">
          {loading && !course ? (
            <div>
              <div className="my-3 border-2 rounded-sm">
                <Skeleton height={50} width="100%" />
                <Skeleton height={50} width="100%" />
              </div>
              <div className="my-3 border-2 rounded-sm">
                <Skeleton height={40} width="100%" />
                <Skeleton height={40} width="100%" />
                <Skeleton height={40} width="100%" />
                <Skeleton height={40} width="100%" />
                <Skeleton height={40} width="100%" />
                <Skeleton height={40} width="100%" />
                <Skeleton height={40} width="100%" />
                <Skeleton height={40} width="100%" />
              </div>
            </div>
          ) : course ? (
            <div>
              <CourseBasicInfo course={course} edit={false} />
              <CourseDetail course={course} />
              <ChapterList course={course} edit={false} />
            </div>
          ) : (
            <div>
              <h2 className="text-center text-2xl text-primary my-3">
                Course not found
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Course;
