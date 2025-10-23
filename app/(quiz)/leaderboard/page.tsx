import TanstackTable from "@/app/components/tanstack-table";

export default function LeaderBoard() {
  return (
    <>
      <header className="text-center space-y-[19px] mb-14">
        <div>
          <h1 className="text-[44px] font-changa-one text-edat-primary">
            Edat Quiz
          </h1>
          <p className="text-edat-dark/50 font-segoe font-semibold">
            Quiz Challenge Competition
          </p>
        </div>
        <h2 className="text-xl text-edat-dark font-segoe font-semibold">
          Edat Quiz Challenge 2026 - Live Leader Board
        </h2>
      </header>
      <div className="flex justify-between mb-4.5 items-center flex-wrap gap-2.5">
        <div className="flex gap-3 items-center">
          <p className="text-nowrap text-edat-primary font-sf-pro lg:text-xl font-bold">
            Top 10
          </p>
          <button className="max-w-[143px] w-full bg-edat-primary text-white rounded-4xl lg:px-6 lg:py-5 p-3">
            23:13:87
          </button>
        </div>
        <div className="font-sf-pro text-center lg:px-10 lg:py-5 p-2 bg-edat-primary space-y-2.5 rounded-xl">
          <p className="lg:text-xl">MACHINE BENCHMARK</p>
          <p className="lg:text-4xl">
            10893 <sub>pts</sub>
          </p>
        </div>
      </div>
      <TanstackTable />
    </>
  );
}
