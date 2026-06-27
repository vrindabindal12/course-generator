import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlinePlayCircle,
} from "react-icons/hi2";

function CourseDetail({ course }) {
  return (
    <div className="border border-neutral-800 bg-[#101010] p-6 rounded-2xl shadow-lg mt-4 relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 relative z-10">
        <div className="flex gap-3 items-center">
          <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-2.5 shrink-0 text-primary">
            <HiOutlineChartBar className="text-2xl" />
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Skill Level</h2>
            <h2 className="font-medium text-sm text-[#E1E0CC] mt-0.5">{course?.level}</h2>
          </div>
        </div>
        
        <div className="flex gap-3 items-center">
          <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-2.5 shrink-0 text-primary">
            <HiOutlineClock className="text-2xl" />
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Duration</h2>
            <h2 className="font-medium text-sm text-[#E1E0CC] mt-0.5">
              {course?.courseOutput?.Duration}
            </h2>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-2.5 shrink-0 text-primary">
            <HiOutlineBookOpen className="text-2xl" />
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Chapters</h2>
            <h2 className="font-medium text-sm text-[#E1E0CC] mt-0.5">
              {course?.courseOutput?.NoOfChapters}
            </h2>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-2.5 shrink-0 text-primary">
            <HiOutlinePlayCircle className="text-2xl" />
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Video Included</h2>
            <h2 className="font-medium text-sm text-[#E1E0CC] mt-0.5">{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
