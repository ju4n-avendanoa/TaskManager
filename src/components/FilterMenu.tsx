"use client";

import { useTaskStore } from "@/store/taskStore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ArrowLeftCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useFiltersStore } from "@/store/filtersStore";

interface FilterButtonProps {
  showFilter: boolean;
  handleShowFilter: () => void;
  message: string;
}

function FilterButton(props: FilterButtonProps) {
  return (
    <button
      className={`border p-1.5 md:p-0.5 lg:p-2 lg:w-max bg-blue-400 rounded-sm border-slate-900 btn ${
        props.showFilter ? "bg-blue-600" : ""
      }`}
      onClick={props.handleShowFilter}
    >
      {props.showFilter ? "Show All Tasks" : `${props.message}`}
    </button>
  );
}

function FilterMenu() {
  const { sort, setSort } = useTaskStore();
  const { setDone, setFavorite, setPending, favorite, pending, done } =
    useFiltersStore();
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsTaskMenuOpen(!isTaskMenuOpen);
  };

  console.log(isTaskMenuOpen);

  const handleShowFavorites = () => {
    setDone(false);
    setPending(false);
    setFavorite(!favorite);
  };

  const handleShowChecked = () => {
    setFavorite(false);
    setPending(false);
    setDone(!done);
  };

  const handleShowPending: () => void = () => {
    setFavorite(false);
    setDone(false);
    setPending(!pending);
  };

  const toggleOrder = () => {
    setSort();
  };

  return (
    <>
      <div className="fixed z-10 flex flex-col items-center justify-center w-full p-2 top-12 bg-slate-500/90 hidden">
        <div className="flex gap-4">
          <h2 className="text-white">Tasks Menu</h2>
          <Bars3Icon
            className="w-6 h-auto"
            color="white"
            onClick={toggleMenu}
          />
        </div>
        {isTaskMenuOpen && (
          <div className="z-10 h-auto md:w-1/5">
            <div className="w-full h-full p-4">
              <section className="flex flex-col items-center justify-center gap-6">
                <div className="flex flex-col gap-6 pt-4 text-xs">
                  <FilterButton
                    showFilter={favorite}
                    handleShowFilter={handleShowFavorites}
                    message="Show Priority Tasks"
                  />
                  <FilterButton
                    showFilter={done}
                    handleShowFilter={handleShowChecked}
                    message="Show Tasks Done"
                  />
                  <FilterButton
                    showFilter={pending}
                    handleShowFilter={handleShowPending}
                    message="Show Pending Tasks"
                  />
                  <div className="flex items-center gap-4">
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
      <section
        className={`${
          isTaskMenuOpen ? "w-64" : "w-20"
        } sticky top-0 left-0 flex flex-col items-start justify-start h-screen md:flex-row md:p-2 lg:p-6 bg-slate-800 transition-all duration-300 `}
      >
        <div className="flex flex-col gap-6 pt-24 text-xs">
          <div
            className={`${
              !isTaskMenuOpen && "scale-0"
            } origin-left duration-300`}
          >
            <FilterButton
              showFilter={favorite}
              handleShowFilter={handleShowFavorites}
              message="Show Priority Tasks"
            />
          </div>

          <div
            className={`${
              !isTaskMenuOpen && "scale-0"
            } origin-left duration-300`}
          >
            <FilterButton
              showFilter={done}
              handleShowFilter={handleShowChecked}
              message="Show Tasks Done"
            />
          </div>

          <div
            className={`${
              !isTaskMenuOpen && "scale-0"
            } origin-left duration-300`}
          >
            <FilterButton
              showFilter={pending}
              handleShowFilter={handleShowPending}
              message="Show Pending Tasks"
            />
          </div>

          <div
            className={`${
              !isTaskMenuOpen && "scale-0"
            } origin-left duration-300`}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={toggleOrder}
                className="border md:p-0.5 lg:p-2 lg:w-max bg-blue-400 rounded-sm border-slate-900 btn"
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
        </div>
        <div>
          <ArrowLeftCircleIcon
            className={`${
              !isTaskMenuOpen && "rotate-180"
            } w-10 absolute top-20 right-0`}
            onClick={() => setIsTaskMenuOpen(!isTaskMenuOpen)}
          />
        </div>
      </section>
    </>
  );
}

export default FilterMenu;
