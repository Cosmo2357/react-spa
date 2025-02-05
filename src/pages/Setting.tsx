import { useMainStore, useUserDataStore } from "../store/main";
import { Button } from "@/components/ui/button";

export default function Setting() {
  const { user } = useUserDataStore();
  const { count, increase, decrease } = useMainStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      {/* 🎯 Character List in Responsive Grid (Scrollable if Needed) */}
      <div className="w-full max-w-screen-xl overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
        </div>
      </div>

      {/* 🎯 Existing Code (Fixed to Bottom-Left) */}
      <div className="fixed bottom-4 left-4 bg-white p-4 shadow-lg rounded-lg w-72 border border-gray-300 opacity-90">
        <h1 className="text-lg font-bold mb-6 text-red-600">
          Global State!!!!
        </h1>
        <h1 className="text-lg font-semibold">Name: {user?.name}</h1>
        <h2 className="text-sm text-gray-600">Mail: {user?.email}</h2>
        <h2 className="text-sm text-gray-600">ID: {user?.id}</h2>
        <h2 className="text-sm text-gray-600">
          Status:{" "}
          {user?.isAuthenticated ? "Authenticated" : "Not Authenticated"}
        </h2>

        {/* 🎯 Counter UI */}
        <div className="my-4 flex items-center gap-2 ">
          <Button variant="secondary" onClick={decrease}>-</Button>
          <span className="font-bold text-lg">{count}</span>
          <Button variant="secondary" onClick={increase}>+</Button>
        </div>
        <Button
          onClick={() => useUserDataStore.setState({ user: null })}
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
