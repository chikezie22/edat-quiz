import { Crown, TriangleIcon } from "lucide-react";

export default async function Summary({
  params,
}: {
  params: Promise<{ roundId: string }>;
}) {
  const { roundId } = await params;

  return (
    <div className=" grid place-items-center gap-[56px]">
      <header className="text-center space-y-[19px]">
        <div>
          <h1 className="text-[44px] font-changa-one text-edat-primary">
            Edat Quiz
          </h1>
          <p className="text-edat-dark/50 font-segoe font-semibold">
            Quiz Challenge Competition
          </p>
        </div>
        <h2 className="text-xl text-edat-dark/50 font-segoe font-semibold">
          Round {roundId?.split("-")[1]}: Global Innovators Summary
        </h2>
      </header>

      <div className="space-y-[52px] max-w-3xl w-full">
        <div className="space-y-7 ">
          <p className="text-[#03B799] font-segoe font-bold">Promotions</p>
          <div className="border-3 border-[#03b799] lg:px-[47px] lg:py-[62px] p-4 font-sf-pro font-semibold lg:text-2xl rounded-4xl space-y-5">
            <div className="flex justify-between text-[#03B799]">
              <p className="flex gap-1 items-center">
                <TriangleIcon className="fill-[#03b799] stroke-none" />
                <span className="text-edat-dark">School Eta - Team Nova</span>
              </p>
              <p>18,453</p>
            </div>
            <div className="flex justify-between text-[#03B799]">
              <p className="flex gap-1 items-center">
                <TriangleIcon className="fill-[#03b799] stroke-none" />
                <span className="text-edat-dark">School Eta - Team Nova</span>
              </p>
              <p>18,453</p>
            </div>
          </div>
        </div>
        <div className="space-y-7">
          <p className="text-[#FF0000] font-segoe font-bold">Rejection</p>
          <div className="border-3 border-[#FF0000] lg:px-[47px] lg:py-[62px] p-4 font-sf-pro font-semibold lg:text-2xl rounded-4xl space-y-5">
            <div className="flex justify-between text-[#FF0000]">
              <p className="flex gap-1 items-center">
                <TriangleIcon className="fill-[#FF0000] stroke-none" />
                <span className="text-edat-dark">School Eta - Team Nova</span>
              </p>
              <p>18,453</p>
            </div>
            <div className="flex justify-between text-[#FF0000]">
              <p className="flex gap-1 items-center">
                <TriangleIcon className="fill-[#FF0000] stroke-none" />
                <span className="text-edat-dark">School Eta - Team Nova</span>
              </p>
              <p>18,453</p>
            </div>
          </div>
        </div>

        <div className="bg-edat-primary lg:px-10 lg:py-4 p-2.5 flex items-center justify-between gap-4 rounded-xl font-sf-pro">
          <div className="space-y-4 ">
            <p className="font-segoe font-bold lg:text-2xl">Round MVP</p>
            <p className="lg:text-3xl font-semibold">
              School Alpha - Team Titans
            </p>
          </div>
          <div className="bg-white lg:p-5 p-2 flex gap-2 items-center font-sf-pro text-edat-primary rounded-xl">
            <Crown />
            890PT
          </div>
        </div>
      </div>
    </div>
  );
}
