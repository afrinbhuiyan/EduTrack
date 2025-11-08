import React from "react";
import Spinner from "./Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center z-50 bg-white">
      <Spinner />
    </div>
  );
}
