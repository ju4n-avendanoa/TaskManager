"use client";

import { useTaskStore } from "@/store/taskStore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
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

type Props = {
  className: string;
};

function FilterMenu({ className }: Props) {
  const { sort, setSort } = useTaskStore();
  const { setDone, setFavorite, setPending, favorite, pending, done } =
    useFiltersStore();
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);

  const { data: session } = useSession();
  const toggleMenu = () => {
    setIsTaskMenuOpen(!isTaskMenuOpen);
  };

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
    <section className={className}>
      <div className="flex flex-col gap-6 pt-24 text-xs">
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
    </section>
  );
}

export default FilterMenu;
