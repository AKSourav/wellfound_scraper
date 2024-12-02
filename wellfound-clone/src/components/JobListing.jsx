const JobListing = ({ job }) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4 hover:shadow-lg transition-shadow">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12 rounded-lg"
              src={job.company_logo_url}
              alt={job.company_name}
            />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {job.company_name}
                  {job.actively_hiring && (
                    <span className="ml-2 text-green-600 text-sm">• Actively Hiring</span>
                  )}
                </h3>
                <p className="text-sm text-gray-500">{job.company_description}</p>
                <p className="text-sm text-gray-500">{job.company_size}</p>
              </div>
              <div className="text-sm text-gray-500">{job.posted_date}</div>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-2">
              {job.company_tags?.split(', ').map((tag, index) => (
                tag && (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                )
              ))}
            </div>
            
            <div className="mt-4">
              <h4 className="text-lg font-medium text-gray-900">{job.job_title}</h4>
              <div className="mt-2 flex items-center space-x-4">
                {job.salary_min && job.salary_max && (
                  <span className="text-sm text-gray-500">
                    ${job.salary_min} - ${job.salary_max}
                  </span>
                )}
                <span className="text-sm text-gray-500">{job.locations}</span>
                {job.required_experience && (
                  <span className="text-sm text-gray-500">{job.required_experience}+ years exp</span>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Save
              </button>
              <a 
                href={job.job_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Apply
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default JobListing;