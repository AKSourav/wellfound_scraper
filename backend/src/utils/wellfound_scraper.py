import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
from datetime import datetime
import re
from utils.custom_thread import ThreadWrapper

class WellfoundJobScraper:
    def __init__(self):
        self.base_url = "https://wellfound.com/role"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
    def get_job_listings_on_page(self, location="seattle", role="devops-engineer", page=1):
        all_jobs = []
        try:
            if location=='remote':
                url = f"{self.base_url}/r/{role}?page={page}"
            else:
                url = f"{self.base_url}/l/{role}/{location}?page={page}"
            print('url',url)
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            # Find all job containers using the correct class
            job_containers = soup.find_all('div', class_='mb-6 w-full rounded border border-gray-400 bg-white')
            for container in job_containers:
                try:
                    # Company Information Section
                    company_info = container.find('div', class_='pl-2 flex flex-col')
                    company_data = {
                        'company_name': self._get_text(company_info.find('h2', class_='inline text-md font-semibold')),
                        'company_description': self._get_text(company_info.find('span', class_='text-xs text-neutral-1000')),
                        'company_size': self._get_text(company_info.find('span', class_='text-xs italic text-neutral-500')),
                        'company_url': self._get_href(container.find('a', class_='content-center')),
                        'company_logo_url': self._get_image_url(container.find('img', class_='rounded-2xl object-contain'))
                    }

                    # Company Tags
                    tags_container = container.find('ul', class_=lambda x: x and 'grid w-full grid-cols-2' in x)
                    tags = []
                    if tags_container:
                        tag_elements = tags_container.find_all('div', class_='line-clamp-1')
                        tags = [self._get_text(tag) for tag in tag_elements]
                    company_data['company_tags'] = ', '.join(filter(None, tags))

                    # Find job listings within the container
                    job_listings_div = container.find('div', class_='mb-4 w-full px-4')
                    if job_listings_div:
                        job_items = job_listings_div.find_all('div', class_='min-h-[50px] items-end justify-between rounded-2xl px-2 py-2 sm:flex')
                        
                        for job in job_items:
                            try:
                                job_data = company_data.copy()
                                
                                # Job title and URL
                                title_element = job.find('a', class_=lambda x: x and 'text-brand-burgandy' in x)
                                job_data.update({
                                    'job_title': self._get_text(title_element),
                                    'job_url': self._get_href(title_element)
                                })

                                # Job type (Full-time, etc.)
                                job_type_element = job.find('span', class_=lambda x: x and 'bg-accent-yellow-100' in x)
                                job_data['job_type'] = self._get_text(job_type_element)

                                # Salary and compensation
                                salary_element = job.find('div', class_='flex items-center text-neutral-500')
                                if salary_element:
                                    salary_text = self._get_text(salary_element)
                                    salary_min, salary_max = self._extract_salary_range(salary_text)
                                    equity_min, equity_max = self._extract_equity_range(salary_text)
                                    job_data.update({
                                        'salary_min': salary_min,
                                        'salary_max': salary_max,
                                        'equity_min': equity_min,
                                        'equity_max': equity_max
                                    })

                                # Location and remote status
                                location_elements = job.find_all('div', class_='flex items-center text-neutral-500')
                                for element in location_elements:
                                    text = self._get_text(element)
                                    if 'Remote' in text or '•' in text:
                                        job_data['locations'] = text.strip()
                                    if 'year' in text.lower():
                                        job_data['required_experience'] = self._extract_years_experience(text)

                                # Posted date
                                posted_date = job.find('span', class_='text-xs lowercase text-dark-a')
                                job_data['posted_date'] = self._get_text(posted_date)

                                # Actively hiring status
                                job_data['actively_hiring'] = bool(container.find('div', class_='mr-1 h-2 w-2 rounded-2xl bg-pop-green'))

                                all_jobs.append(job_data)

                            except Exception as e:
                                print(f"Error processing individual job: {str(e)}")

                except Exception as e:
                    print(f"Error processing company container: {str(e)}")

            print(f"Scraped page {page}")
            time.sleep(2)  # Rate limiting
            
        except Exception as e:
            print(f"Error scraping page {page}: {str(e)}")
        finally:
            return all_jobs
        

    def get_job_listings(self, location="seattle", role="devops-engineer", num_pages=5):
        all_jobs = []
        thread_mapping = {}
        
        for page in range(1, num_pages + 1):
            thread_mapping[page] = ThreadWrapper(target=self.get_job_listings_on_page,args=(location, role, page))
            thread_mapping[page].start()
        
        for page in range(1, num_pages + 1):
            all_jobs.extend(thread_mapping[page].join())
        
        return all_jobs

    def _get_text(self, element):
        """Safely extract text from an element."""
        return element.text.strip() if element else ''

    def _get_image_url(self, img_element):
        """Extract image URL from img element."""
        img_element_src = img_element.get('src', '') if img_element else ''
        img_element_src = img_element_src[img_element_src.find('https://'):]
        return img_element_src

    def _get_href(self, a_element):
        """Extract href from anchor element."""
        return f"https://wellfound.com{a_element['href']}" if a_element and 'href' in a_element.attrs else ''

    def _extract_salary_range(self, text):
        """Extract salary range from text."""
        if not text:
            return None, None
        pattern = r'\$(\d+)k\s*--\s*\$(\d+)k'
        match = re.search(pattern, text)
        if match:
            return int(match.group(1)) * 1000, int(match.group(2)) * 1000
        return None, None

    def _extract_equity_range(self, text):
        """Extract equity range from text."""
        if not text:
            return None, None
        pattern = r'(\d+\.?\d*)%\s*--\s*(\d+\.?\d*)%'
        match = re.search(pattern, text)
        if match:
            return float(match.group(1)), float(match.group(2))
        return None, None

    def _extract_years_experience(self, text):
        """Extract years of experience requirement."""
        if not text:
            return None
        match = re.search(r'(\d+)', text)
        return int(match.group(1)) if match else None

    def save_to_csv(self, jobs, filename=None):
        """Save jobs to CSV file."""
        if not filename:
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f'wellfound_jobs_{timestamp}.csv'
        
        df = pd.DataFrame(jobs)
        df.to_csv(filename, index=False)
        print(f"Saved {len(jobs)} jobs to {filename}")
        return filename

def main():
    scraper = WellfoundJobScraper()
    jobs = scraper.get_job_listings(location="seattle", role="devops-engineer", num_pages=1)
    scraper.save_to_csv(jobs)

# if __name__ == "__main__":
#     main()