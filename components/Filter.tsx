"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { HouseZodSchemaType } from "@/schemas";
import HouseCard from "./housecard";

const Filter = ({ houseData }: { houseData: HouseZodSchemaType[] }) => {
  const [filteredHouses, setFilteredHouses] = useState(houseData);

  const allCities = Array.from(new Set(houseData.map((p) => p.address.city)));
  const bhkOptions = Array.from(
    new Set(houseData.map((p) => p.bedrooms))
  ).sort();
  const allAmenities = Array.from(
    new Set(
      houseData.flatMap((p) => p.amenities.split(",").map((a) => a.trim()))
    )
  );

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedBHK, setSelectedBHK] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const handleBHKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bhk = parseInt(e.target.value);
    if (selectedBHK.includes(bhk)) {
      setSelectedBHK(selectedBHK.filter((el) => el !== bhk));
    } else {
      setSelectedBHK([...selectedBHK, bhk]);
    }
  };

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amenity = e.target.value;
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(
        selectedAmenities.filter((el) => el !== amenity)
      );
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  useEffect(() => {
    filterProperties();
  }, [selectedCity, selectedBHK, selectedAmenities]);

  const filterProperties = () => {
    let tempProperties = houseData;

    if (selectedCity) {
      tempProperties = tempProperties.filter(
        (house) => selectedCity === house.address.city
      );
    }

    if (selectedBHK.length > 0) {
      tempProperties = tempProperties.filter((house) =>
        selectedBHK.includes(house.bedrooms)
      );
    }

    if (selectedAmenities.length > 0) {
      tempProperties = tempProperties.filter((house) =>
        selectedAmenities.every((amenity) =>
          house.amenities
            .split(",")
            .map((a) => a.trim())
            .includes(amenity)
        )
      );
    }

    setCurrentPage(1);
    setFilteredHouses(tempProperties);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredHouses.length / postsPerPage);
  const paginationNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-wrap gap-4 ml-36">
        <div className="flex w-[45%]">
          <div className="w-[50%]">
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Cities</h3>
              <select
                value={selectedCity || ""}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-2 border rounded bg-white text-black border-sky-300"
              >
                <option value="">Select City</option>
                {allCities.map((city, idx) => (
                  <option key={`city-${idx}`} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex">
              <Button
                onClick={() => {
                  setSelectedCity(null);
                  setSelectedBHK([]);
                  setSelectedAmenities([]);
                }}
                className="w-full px-4 p-4 bg-sky-500 text-white rounded-full hover:bg-blue-700"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          <div className="w-[50%] pl-24">
            <h3 className="font-semibold mb-2">BHK</h3>
            <div className="flex flex-col gap-4">
              {bhkOptions.map((bhk, idx) => (
                <div key={`bhk-${idx}`} className="flex items-center">
                  <input
                    type="checkbox"
                    value={bhk}
                    checked={selectedBHK.includes(bhk)}
                    onChange={handleBHKChange}
                    className="form-checkbox h-4 w-4 text-black transition duration-150 ease-in-out bg-white border-gray-600"
                  />
                  <label className="ml-2">{bhk} BHK</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-[45%]">
          <div className="w-full">
            <h3 className="font-semibold mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-4">
              {allAmenities.map((amenity, idx) => (
                <div key={`amenity-${idx}`} className="flex items-center">
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onChange={handleAmenityChange}
                    className="form-checkbox h-4 w-4 text-black transition duration-150 ease-in-out bg-white border-gray-600"
                  />
                  <label className="ml-2">{amenity}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-400 mt-4 pt-4">
        {filteredHouses.length !== 0 ? (
          <div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHouses
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((house: HouseZodSchemaType, index) => (
                  <div key={index} className="p-4">
                    <HouseCard houseData={house} />
                  </div>
                ))}
            </div>
            <div className="flex justify-center items-center space-x-2 mt-4">
              <button
                onClick={() =>
                  handlePagination(currentPage > 1 ? currentPage - 1 : 1)
                }
                className={`px-3 py-1 rounded-full ${
                  currentPage === 1
                    ? "bg-gray-300 text-white cursor-not-allowed"
                    : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-200"
                }`}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              {paginationNumbers.map((pageNumber: number) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePagination(pageNumber)}
                  className={`px-3 py-1 rounded-full ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-200"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={() =>
                  handlePagination(
                    currentPage < paginationNumbers.length
                      ? currentPage + 1
                      : paginationNumbers.length
                  )
                }
                className={`px-3 py-1 rounded-full ${
                  currentPage === paginationNumbers.length
                    ? "bg-gray-300 text-white cursor-not-allowed"
                    : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-200"
                }`}
                disabled={currentPage === paginationNumbers.length}
              >
                {">"}
              </button>
            </div>
          </div>
        ) : (
          <div>No properties to display</div>
        )}
      </div>
    </div>
  );
};

export default Filter;
