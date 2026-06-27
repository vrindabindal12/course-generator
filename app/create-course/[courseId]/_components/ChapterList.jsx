import React from "react";
import { HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi2";
import EditChapters from "./EditChapters";


function ChapterList({ course, refreshData, edit = true }) {
  return (
    <div className="mt-6">
      <h2 className="font-medium text-xl text-[#E1E0CC] tracking-tight">Chapters</h2>
      <div className="mt-3 flex flex-col gap-3">
        {course?.courseOutput?.Chapters.map((chapter, index) => (
          <div
            key={index}
            className="border border-neutral-800 bg-[#101010] p-5 rounded-2xl flex items-center justify-between hover:border-neutral-700 transition-all duration-300 group shadow-md"
          >
            <div className="flex gap-4 items-center">
              <h2 className="bg-primary flex-none h-9 w-9 text-black font-semibold rounded-full text-center flex items-center justify-center text-sm shadow-sm select-none">
                {index + 1}
              </h2>
              <div>
                <h2 className="font-medium text-base text-[#E1E0CC] flex gap-1.5 items-center">
                  {chapter?.ChapterName}
                  {edit && (
                    <EditChapters course={course} index={index} refreshData={() => refreshData(true)} />
                  )}
                </h2>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{chapter?.About}</p>
                <p className="flex items-center gap-1.5 text-primary text-[11px] font-mono mt-1.5 uppercase">
                  <HiOutlineClock className="w-3.5 h-3.5" />
                  {chapter?.Duration}
                </p>
              </div>
            </div>
            <HiOutlineCheckCircle className="text-3xl text-neutral-800 flex-none group-hover:text-primary transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
