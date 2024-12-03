import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import JobListing from './components/JobListing';
import Sidebar from './components/Sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsParams, setJobsParams] = useState({
    role: 'Backend Engineer',
    location: 'Remote'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async(searchParams) => {
    setIsLoading(true);
    try{
      setJobsParams({role:searchParams.role_p,location:searchParams.location_p});
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/v1/jobs/find/${searchParams.role}?location=${searchParams.location}`);
      setJobs(data.data);
    }catch(error){
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs. Please try again later.');
      setJobsParams({role:searchParams.role_p,location:searchParams.location_p});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch({role: "backend-engineer", location: "remote", role_p: 'Backend Developer', location_p: 'remote'});
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
              <h1 className="text-xl font-semibold">{jobsParams?.location.toLowerCase()=='remote'?<>Remote {jobsParams?.role} Jobs</>:<>{jobsParams?.role} jobs in {jobsParams?.location}</>}</h1>
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