import {useState, type FormEvent} from 'react'
import Navbar from "../components/Navbar";


const upload = () => {
    const[isUploading, setIsUploading] = useState(false);
    const[isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const handleSubmit =(e:FormEvent<HTMLFormElement>)=>{

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
                        <div>uploader</div>
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