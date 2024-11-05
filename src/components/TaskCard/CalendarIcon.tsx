import { getDay, getMonth } from "@/utils/dateParser";

const CalendarIcon = ({ date }: { date: string }) => {
  return (
    <section className="my-2 flex select-none flex-col justify-center">
      <div className="h-fit w-10 overflow-hidden rounded-lg shadow">
        <span className="flex h-4 w-full items-center justify-center bg-red-400 text-center text-xs text-white">
          {getMonth(date)}
        </span>
        <span className="flex h-6 w-full items-center justify-center bg-white text-center text-xl font-semibold text-gray-500">
          {getDay(date)}
        </span>
      </div>
    </section>
  );
};

export default CalendarIcon;
