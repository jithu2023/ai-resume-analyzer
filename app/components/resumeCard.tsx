import React from 'react';
import { Link } from 'react-router';
import ScoreCircle from '../components/scoreCircle';
import { usePuterStore } from '~/lib/puter';
import { useEffect, useState } from 'react';



interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: any;
}

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const { id, companyName, jobTitle,feedback, imagePath } = resume;
    const [resumeUrl,setResumeUrl] = useState("")
  const { fs } = usePuterStore();
  
 useEffect(() => {
    const loadResume = async () => {
      const blob : Blob | undefined = await fs.read(imagePath)

      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    }
    loadResume();
  }, [resume.imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
    <div className="resume-card-header">
            <div className='flex flex-col gap-2'>
          {companyName &&  <h2 className="!text-black font-bold break-words">{companyName}</h2>}
          {jobTitle && <h3 className='text-lg break-words text-gray-500'>{jobTitle}</h3>}
          {!companyName && !jobTitle && <h2 className=' !text-black font-bold'>Resume</h2>}
        </div>
        <div className='flex-shrink-0'>
            <ScoreCircle score={feedback.overallScore} />
        </div>
    </div> 
   {resumeUrl &&(
   
    <div className='gradient-border animate-in fade-in duration-1000'>
        <div className="w-full h-full ">
            <img src={resumeUrl}
            alt="resume"
            className='w-full h-[350px] max-sm:h-[300px] object-cover object-top'
            />
        </div>
    </div>)}
      
    </Link>
  );
};

export default ResumeCard;
