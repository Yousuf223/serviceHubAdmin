import { Suspense } from "react";
import { Loader } from "../custom/Loader";

const SuspenseBoundary = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-row gap-2 h-full w-full justify-center items-center">
          <Loader className={"h-4 w-4 text-white mr-2"} loading={true} />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
export default SuspenseBoundary;
