from apify_client import ApifyClient

# Initialize the ApifyClient with your API token
client = ApifyClient("apify_api_Z1H5O5bnkGIWQHkWfTqooiziCkh33J4qV6Mu")

# Prepare the Actor input
run_input = {
    "url": "https://wellfound.com/role/l/software-engineer/united-states",
    "page_limit": 1,
    "results_limit": 2,
    "only_companies": True,
    "get_company_details": True,
}

# Run the Actor and wait for it to finish
run = client.actor("FAfHRvhkOq5ackS7z").call(run_input=run_input)

# Fetch and print Actor results from the run's dataset (if there are any)
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)