import {useState, type FormEvent} from 'react'
import Navbar from "../components/Navbar";
import FileUploader from '~/components/FileUploader';


const upload = () => {
    const[isUploading, setIsUploading] = useState(false);
    const[isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }
    const handleSubmit =(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form =e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);
        const companyName = formData.get('company-name') ;
        const jobTitle = formData.get('Job-Ttile') ;
        const jobDescription = formData.get('Job-Description') ;
        console.log({ companyName, jobTitle, jobDescription, file });
    }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
        <div className='page-heading py-16'>
            <h1>Smart Feedback For your Dream Job</h1>
            { isProcessing ? (
                <>
                <h2>{statusText}</h2>
                <img src='/images/resume-scan.gif' className='w-full'/>

                </>
            ):(
                <h2>Drop your resume for ATS score and improvement tips</h2>
            )}
            {!isProcessing && (
                <form id="upload form" onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                    <div className='form-div'>
                        <label htmlFor="company-name">Company Name</label>
                        <input type="text" name="company-name" placeholder='Company Name' id="company-name" />                  </div>
                    <div className='form-div'>
                        <label htmlFor="job-Title">Job Title</label>
                        <input type="text" name="Job-Ttile" placeholder='Job Title' id="Job-Ttile" />                  </div>
                    <div className='form-div'>
                        <label htmlFor="job-Description">Job Description</label>
                        <textarea rows={5} name="Job-Description" placeholder='Job Description' id="Job-Description" />                  </div>
                    <div className='form-div'>
                        <label htmlFor="uploader">Upload Resume</label>
                        <FileUploader onFileSelect={handleFileSelect} />
                        <button className='primary-button' type='submit'>
                          Analyze Resume  
                        </button>
                                      </div>

                </form>
            )}
        </div>
    </section>
    </main>
  )
}

export default upload