import { useState, useRef, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
    const [role, setRole] = useState("Backend Engineer");
    const [location, setLocation] = useState("Remote");
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const roleDropdownRef = useRef(null);
    const locationDropdownRef = useRef(null);

    const jobRoles = [
        "Software Engineer",
        "Engineering Manager",
        "Artificial Intelligence Engineer (AI)",
        "Machine Learning Engineer",
        "Product Manager",
        "Backend Engineer",
        "Mobile Engineer",
        "Product Designer",
        "Frontend Engineer",
        "Full Stack Engineer",
        "Data Scientist",
        "Designer",
        "Software Architect",
        "Devops Engineer"
    ];

    const locations = [
        "Remote",
        "New York",
        "San Francisco",
        "Los Angeles",
        "Austin",
        "Seattle",
        "Boston",
        "Chicago",
        "Denver",
        "India",
        "Canada",
        "United Kingdom",
        "Germany",
        "Australia",
        "Singapore"
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
                setIsRoleDropdownOpen(false);
            }
            if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
                setIsLocationDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const role_q = role.toLowerCase().split('(')[0].trim().split(" ").join("-");
        const location_q = location.toLowerCase().split('(')[0].trim().split(" ").join("-");
        onSearch({ role: role_q, location: location_q ,role_p:role,location_p:location});
    };

    const clearRole = () => setRole("");
    const clearLocation = () => setLocation("");

    const selectRole = (selectedRole) => {
        setRole(selectedRole);
        setIsRoleDropdownOpen(false);
    };

    const selectLocation = (selectedLocation) => {
        setLocation(selectedLocation);
        setIsLocationDropdownOpen(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
            <form onSubmit={handleSearch} className="flex items-center gap-2 text-[15px]">
                <span className="text-wellfound-text">Show me</span>
                <div className="relative" ref={roleDropdownRef}>
                    <div className="flex items-center border rounded-md hover:border-gray-400 transition-colors">
                        <input
                            type="text"
                            className="w-[240px] px-3 py-2.5 rounded-md focus:outline-none cursor-pointer"
                            placeholder="Backend Engineer"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                        />
                        {role && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearRole();
                                }}
                                className="px-2 text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                    
                    {/* Dropdown Menu */}
                    {isRoleDropdownOpen && (
                        <div className="absolute z-10 w-[240px] mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                            {jobRoles
                                .filter(job => job.toLowerCase().includes(role.toLowerCase()))
                                .map((job, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => selectRole(job)}
                                    >
                                        {job}
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
                <span className="text-wellfound-text">roles, that are</span>
                <div className="relative" ref={locationDropdownRef}>
                    <div className="flex items-center border rounded-md hover:border-gray-400 transition-colors">
                        <input
                            type="text"
                            className="w-[240px] px-3 py-2.5 rounded-md focus:outline-none cursor-pointer"
                            placeholder="Remote"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                        />
                        {location && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearLocation();
                                }}
                                className="px-2 text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                    
                    {/* Location Dropdown Menu */}
                    {isLocationDropdownOpen && (
                        <div className="absolute z-10 w-[240px] mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                            {locations
                                .filter(loc => loc.toLowerCase().includes(location.toLowerCase()))
                                .map((loc, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => selectLocation(loc)}
                                    >
                                        {loc}
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="px-6 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;