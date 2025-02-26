import { faCircleQuestion, faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, useMemo } from "react";
import assets from "../../data/assets.json";
import assetsDetails from "../../data/details.json";
import "../../utils/fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAreaOpen, setIsAreaOpen] = useState(false);

  return (
    <header className="absolute z-10 flex flex-wrap items-center justify-between top-3 inset-x-4">
      <div className="flex shadow-md items-center justify-between px-4 py-1.5 rounded-lg w-96 bg-white/95 hover:bg-gray-100">
        <div className="flex items-center -mr-2">
          <img src="/logo.png" className="cursor-pointer" />
          <div className="w-px h-6 ml-4 bg-gray-300" />
        </div>
        <FontAwesomeIcon
          icon="house"
          className="cursor-pointer text-neutral-600 size-5"
        />
        <FontAwesomeIcon
          icon="filter"
          className="cursor-pointer text-neutral-600 size-5"
        />
        <FontAwesomeIcon
          icon="briefcase-clock"
          className="cursor-pointer text-neutral-600 size-6"
        />
        <FontAwesomeIcon
          icon="screwdriver-wrench"
          className="cursor-pointer text-neutral-600 size-5"
        />
        <FontAwesomeIcon
          icon="gear"
          className="cursor-pointer text-neutral-600 size-5"
        />
      </div>

      <button
        type="button"
        class="text-white bg-blue-600 shadow-md flex items-center hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-4 py-2"
      >
        <FontAwesomeIcon icon={faCopy} className="mr-2 size-4" />
        Overview
      </button>

      <button
        type="button"
        class="text-gray-900 shadow-md bg-white border flex items-center border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2"
      >
        <FontAwesomeIcon icon={"rotate"} className="mr-2 size-4" />
        Process Area
      </button>

      <button
        type="button"
        class="text-gray-900 shadow-md bg-white border flex items-center border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2"
      >
        <FontAwesomeIcon icon={"th-large"} className="mr-2 size-4" />
        System
      </button>

      <div className="relative shadow-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white rounded-md px-4 py-1.5 flex items-center gap-6 text-sm hover:bg-gray-100"
        >
          <span className="text-xs font-bold">SITE</span>
          <span className="">ISDAR PLATFORM</span>
          <FontAwesomeIcon
            icon={"chevron-down"}
            className="h-6 text-neutral-600 size-4"
          />{" "}
        </button>
        {isOpen && (
          <div className="absolute left-0 w-48 py-1 mt-1 bg-white rounded-md shadow-lg top-full">
            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
              Platform 1
            </a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
              Platform 2
            </a>
          </div>
        )}
      </div>

      {/* Area Selector */}
      <div className="relative shadow-md">
        <button
          onClick={() => setIsAreaOpen(!isAreaOpen)}
          className="bg-white rounded-md px-4 py-1.5  flex items-center gap-6 text-sm hover:bg-gray-100"
        >
          <span className="text-xs font-bold">AREA</span>
          <span>ALL</span>
          <FontAwesomeIcon
            icon={"chevron-down"}
            className="h-6 text-neutral-600 size-4"
          />
        </button>
        {isAreaOpen && (
          <div className="absolute left-0 z-20 w-24 py-1 mt-1 bg-white rounded-md shadow-lg">
            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
              Area 1
            </a>
            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
              Area 2
            </a>
          </div>
        )}
      </div>

      {/* Navigation Icons */}
      <div className="flex items-center justify-between gap-10 px-4 py-1 text-sm rounded-lg shadow-md bg-white/95 hover:bg-gray-100">
        <div className="flex items-center gap-4">
          <FontAwesomeIcon
            icon={faCircleQuestion}
            className="cursor-pointer text-neutral-600 size-4"
          />
          <FontAwesomeIcon
            icon={"circle-plus"}
            className="cursor-pointer text-neutral-600 size-4"
          />
          <FontAwesomeIcon
            icon={"search"}
            className="cursor-pointer text-neutral-600 size-4"
          />
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="overflow-hidden bg-gray-200 rounded-full w-7 h-7">
            <img
              src="https://avatar.iran.liara.run/public"
              alt="User avatar"
              className="object-cover w-full h-full cursor-pointer"
            />
          </div>
          <span className="text-sm font-medium">Karl Jacob</span>
        </div>
      </div>
    </header>
  );
}
function LeftSidebar({ selectedAsset, setSelectedAsset }) {
  const containerRef = useRef(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "red":
        return "bg-red-500";
      case "yellow":
        return "bg-yellow-400";
      default:
        return "bg-gray-300";
    }
  };

  const onMouseDown = (e) => {
    const container = containerRef.current;
    container.style.cursor = "grabbing";
    container.style.userSelect = "none";

    const startY = e.pageY - container.offsetTop;
    const scrollTop = container.scrollTop;

    const onMouseMove = (e) => {
      const y = e.pageY - container.offsetTop;
      const walk = y - startY;
      container.scrollTop = scrollTop - walk;
    };

    const onMouseUp = () => {
      container.style.cursor = "grab";
      container.style.removeProperty("user-select");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <aside className="absolute z-10 p-4 overflow-hidden bg-white rounded-lg shadow-md left-4 bottom-10 top-20 w-80">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Assets</h2>
        <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800">
          <FontAwesomeIcon icon={"arrow-rotate-right"} className="size-3.5" />{" "}
          <span>Refresh</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative mt-4 mb-3">
        <input
          type="text"
          placeholder="Search Id"
          className="w-full px-4 py-2 text-sm bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <FontAwesomeIcon
          icon={"chevron-down"}
          className="absolute h-6 text-neutral-600 size-4 right-3 top-2"
        />
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-3 px-3 py-2 text-xs font-semibold text-gray-500">
        <span className="text-left">Status</span>
        <span>Name</span>
        <span className="text-right">Score</span>
      </div>
      <hr className="h-[1.5px] bg-neutral-300 border-0" />

      {/* Asset List */}
      <ul
        ref={containerRef}
        onMouseDown={onMouseDown}
        className="space-y-2 overflow-hidden cursor-grab no-scrollbar"
        style={{ maxHeight: "calc(100% - 150px)" }}
      >
        {assets?.map((asset, index) => (
          <li
            key={index}
            onClick={() => setSelectedAsset(asset.name.replace(/ /g, "_"))}
            className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
              selectedAsset === asset.name.replace(/ /g, "_")
                ? "bg-blue-50 border-l-4 border-blue-600"
                : ""
            }`}
          >
            <span
              className={`inline-block w-3 h-3 rounded-sm ${getStatusColor(
                asset.status
              )}`}
            ></span>
            <span className="flex-1 ml-16 text-md">{asset.name}</span>
            <span className="text-sm font-semibold">{asset.score}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
function RightSidebar({ selectedAsset }) {
  const [activeTab, setActiveTab] = useState("details");
  const contentRef = useRef(null);

  const details = useMemo(() => {
    return assetsDetails[selectedAsset] || assetsDetails["Main_Deck"];
  }, [selectedAsset]);

  const headerDetails = useMemo(() => {
    if (!details || details.length === 0)
      return { type: "Unknown", model: "Unknown" };

    const typeDetail = details.find((item) => item.label === "Asset Name");
    const modelDetail = details.find((item) => item.label === "Asset ID");

    return {
      type: typeDetail ? typeDetail.value : "Unknown",
      model: modelDetail ? modelDetail.value : "Unknown",
    };
  }, [details]);

  // Drag Scroll
  const onMouseDown = (e) => {
    const container = contentRef.current;
    container.style.cursor = "grabbing";
    container.style.userSelect = "none";

    const startY = e.pageY - container.getBoundingClientRect().top;
    const scrollTop = container.scrollTop;

    const onMouseMove = (e) => {
      const y = e.pageY - container.getBoundingClientRect().top;
      const walk = y - startY;
      container.scrollTop = scrollTop - walk;
    };

    const onMouseUp = () => {
      container.style.cursor = "grab";
      container.style.removeProperty("user-select");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const tabs = ["details", "docs", "orders", "permits"];

  return (
    <aside className="absolute z-10 flex flex-col p-4 overflow-hidden bg-white rounded-lg shadow-md top-20 bottom-10 right-4 w-80">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0 mb-2">
        <div>
          <h2 className="text-lg font-semibold">{headerDetails.model}</h2>
          <p className="text-sm text-gray-500">{headerDetails.type}</p>
        </div>

        <button className="flex-shrink-0 px-2 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
          <FontAwesomeIcon icon={faArrowRotateRight} className="size-3.5" />{" "}
          <span>Refresh</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-shrink-0 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 text-sm font-semibold text-center uppercase transition-colors duration-200 ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content with Drag Scroll */}
      <div
        ref={contentRef}
        onMouseDown={onMouseDown}
        className="flex-1 mt-4 overflow-hidden cursor-grab no-scrollbar"
      >
        {activeTab === "details" && (
          <ul className="space-y-2">
            {details?.map((item, index) => (
              <li key={index} className="py-2 border-b border-gray-200">
                <span className="block text-xs font-semibold text-gray-800">
                  {item.label}
                </span>
                <span className="block mt-1 text-xs text-gray-600">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        )}

        {activeTab !== "details" && (
          <div className="flex items-center justify-center h-full text-sm text-gray-500">
            No Data Available
          </div>
        )}
      </div>
    </aside>
  );
}

export default function UI({ selectedAsset, setSelectedAsset }) {
  return (
    <>
      <Header />
      <LeftSidebar
        selectedAsset={selectedAsset}
        setSelectedAsset={setSelectedAsset}
      />
      <RightSidebar selectedAsset={selectedAsset} />
    </>
  );
}
