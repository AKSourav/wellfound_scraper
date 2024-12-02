import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import JobListing from './components/JobListing';
import Sidebar from './components/Sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async(searchParams) => {
    setIsLoading(true);
    try{
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/v1/jobs/find/${searchParams.role}?location=${searchParams.location}`);
      console.log(data.data);
      setJobs(data.data);
    }catch(error){
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch({role: "backend-developer", location: "remote"});
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between">
          <div className="flex-1 max-w-3xl">
            <div className="mb-6">
              <h1 className="text-xl font-semibold">Remote Backend Engineer Jobs</h1>
              <p className="text-gray-600">{jobs.length} results total</p>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job, index) => (
                  <JobListing key={index} job={job} />
                ))}
              </div>
            )}
          </div>
          
          <Sidebar />
        </div>
      </main>
    </div>
  );
};

export default App;