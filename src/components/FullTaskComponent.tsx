import { useTaskStore } from "@/store/taskStore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import TaskGrid from "./TaskGrid";

interface FilterButtonProps {
  showFilter: boolean;
  handleShowFilter: () => void;
  message: string;
}

function FullTaskComponent() {
  const { sort, setSort, getTasks } = useTaskStore();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showChecked, setShowChecked] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);

  const { data: session } = useSession();
  const toggleMenu = () => {
    setIsTaskMenuOpen(!isTaskMenuOpen);
  };

  const handleShowFavorites = () => {
    setShowChecked(false);
    setShowPending(false);
    setShowFavorites(!showFavorites);
    getTasks(session?.user.id);
  };

  const handleShowChecked = () => {
    setShowFavorites(false);
    setShowPending(false);
    setShowChecked(!showChecked);
    getTasks(session?.user.id);
  };

  const handleShowPending = () => {
    setShowFavorites(false);
    setShowChecked(false);
    setShowPending(!showPending);
    getTasks(session?.user.id);
  };
  const toggleOrder = () => {
    setSort();
  };

  function FilterButton(props: FilterButtonProps) {
    return (
      <button
        className={`border p-1.5 md:p-0.5 lg:p-2 lg:w-max bg-blue-300 rounded-md border-slate-900 btn ${
          props.showFilter ? "bg-blue-600" : ""
        }`}
        onClick={props.handleShowFilter}
      >
        {props.showFilter ? "Show All Tasks" : `${props.message}`}
      </button>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-slate-500 p-2 w-full md:hidden relative ">
        <div className="flex gap-4">
          <h2 className="text-white">Tasks Menu</h2>
          <Bars3Icon
            className="w-6 h-auto"
            color="white"
            onClick={toggleMenu}
          />
        </div>
        {isTaskMenuOpen && (
          <div className="absolute top-0 right-0 left-0 bg-opacity-80 md:w-1/5 h-auto bg-slate-500 z-10">
            <div className="w-full h-full p-4">
              <section className="flex flex-col items-center justify-center gap-6">
                <div className="flex flex-col gap-6 text-xs pt-4">
                  <FilterButton
                    showFilter={showFavorites}
                    handleShowFilter={handleShowFavorites}
                    message="Show Priority Tasks"
                  />
                  <FilterButton
                    showFilter={showChecked}
                    handleShowFilter={handleShowChecked}
                    message="Show Tasks Done"
                  />
                  <FilterButton
                    showFilter={showPending}
                    handleShowFilter={handleShowPending}
                    message="Show Pending Tasks"
                  />
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={toggleOrder}
                      className="border p-1.5 lg:p-2 lg:w-max bg-blue-300 rounded-md border-slate-900 btn"
                    >
                      sort by date
                    </button>
                    <input
                      type="checkbox"
                      name="check"
                      id="check"
                      checked={sort}
                      onChange={toggleOrder}
                      className="w-6 h-6"
                    />
                  </div>
                </div>
                <XCircleIcon
                  className="w-8 h-auto"
                  onClick={toggleMenu}
                  fill="slate"
                  color="white"
                />
              </section>
            </div>
          </div>
        )}
      </div>
      <section className="flex flex-col md:flex-row items-start justify-start md:p-2 lg:p-6 w-1/6 bg-slate-500 h-full max-sm:hidden">
        <div className="flex flex-col gap-6 text-xs pt-4">
          <FilterButton
            showFilter={showFavorites}
            handleShowFilter={handleShowFavorites}
            message="Show Priority Tasks"
          />
          <FilterButton
            showFilter={showChecked}
            handleShowFilter={handleShowChecked}
            message="Show Tasks Done"
          />
          <FilterButton
            showFilter={showPending}
            handleShowFilter={handleShowPending}
            message="Show Pending Tasks"
          />
          <div className="flex gap-4 items-center">
            <button
              onClick={toggleOrder}
              className="border md:p-0.5 lg:p-2 lg:w-max bg-blue-300 rounded-md border-slate-900 btn"
            >
              sort by date
            </button>
            <input
              type="checkbox"
              name="check"
              id="check"
              checked={sort}
              onChange={toggleOrder}
              className="w-6 h-6"
            />
          </div>
        </div>
      </section>
      <section className="w-5/6 flex flex-col">
        <TaskGrid
          showChecked={showChecked}
          showFavorites={showFavorites}
          showPending={showPending}
        />
      </section>
    </>
  );
}

export default FullTaskComponent;
