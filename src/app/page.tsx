import SigninForm from "@/components/Authentication/SigninForm";
import SailAwayCard from "@/components/SailAwayCard";

export default function Home() {
  return (
    <div className="max-w-7xl py-2 lg:py-5 mx-auto sm:px-4 flex items-center justify-center h-screen">
      <div className="flex gap-12 xl:gap-20">
        <div className="w-full lg:w-[980px] xl:w-[1200px] sm:mx-auto px-4 space-y-6 flex flex-col justify-between">
          <div className="flex-grow flex items-center">
            <div
              className="bg-white w-full px-6 space-y-8"
            >
              <SigninForm />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-end w-full">
          <SailAwayCard />
        </div>
      </div>
    </div>
  );
}
