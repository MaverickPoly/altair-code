import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import type { LessonType } from "../types"; // adjust import

interface Props {
  lessons: LessonType[];
  currentId: number;
}

export default function LessonsSidebar({ lessons, currentId }: Props) {
  const [open, setOpen] = useState(false);
  const courseSlug = "utlimate-indtroduction-to-python";

  return (
    <>
      <aside
        className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto
                   pr-2"
      >
        <ul className="space-y-2">
          {lessons.map((l: any) => (
            <li key={l.id}>
              <SidebarLink
                lesson={l}
                active={l.id === currentId}
                courseSlug={courseSlug}
              />
            </li>
          ))}
        </ul>
      </aside>

      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40
                   p-3 rounded-full shadow-lg bg-orange-600 text-white"
      >
        <Menu />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          <div
            className="relative ml-auto w-80 max-w-[90%] h-full overflow-y-auto
                          bg-neutral-900 border-l border-neutral-700 p-6"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg
                         hover:bg-neutral-800"
            >
              <X size={24} />
            </button>

            <h4 className="text-xl font-bold mb-6">Lessons</h4>
            <ul className="space-y-3">
              {lessons.map((l: any) => (
                <li key={l.id} onClick={() => setOpen(false)}>
                  <SidebarLink
                    lesson={l}
                    active={l.id === currentId}
                    courseSlug={courseSlug}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

function SidebarLink({
  lesson,
  active,
  courseSlug,
}: {
  lesson: LessonType;
  active: boolean;
  courseSlug: string;
}) {
  return (
    <Link
      to={`/courses/${courseSlug}/${lesson.number}`} // adjust route
      className={`block px-4 py-3 rounded-lg
                  hover:bg-neutral-800
                  ${active ? "bg-neutral-800 text-white font-semibold" : ""}`}
    >
      <span className="mr-2 text-orange-400 font-mono">#{lesson.number}</span>
      {lesson.title}
    </Link>
  );
}
