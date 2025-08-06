import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import ATS from '~/components/Ats';
import type Details from '~/components/Details';
import Summary from '~/components/summary';
import { usePuterStore } from '~/lib/puter';

export const meta = () => [
  { title: 'Resumind | Review' },
  { name: 'description', content: 'Detailed Overview Of Your Resume' },
];

const Resume = () => {
  const { id } = useParams();
  const { auth, isLoading, fs, kv } = usePuterStore();
  const [imageUrl, setImageUrl] = useState<string>();
  const [resumeUrl, setResumeUrl] = useState<string>();
  const [feedback, setFeedback] = useState<Feedback | null>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate("/auth?next=/resume{id}");
  },[auth.isAuthenticated])

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume); // ✅ Fix: json.parse → JSON.parse

      const resumeBlob: Blob | undefined = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      const generatedResumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(generatedResumeUrl);

      const imageBlob: Blob | undefined = await fs.read(data.imagePath);
      if (!imageBlob) return;

      const generatedImageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(generatedImageUrl);
      setFeedback(data.feedback);
      console.log({resumeUrl, imageUrl, feedback: data.feedback});
    };

    loadResume();
  }, [id]);

  return (
    <main className='!pt-0'>
      <nav className='resume-nav'>
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="Back" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm">Back to Home-Page</span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section
          className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center"
        >
          {imageUrl && resumeUrl && (

            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit">
                <a href={resumeUrl} ></a>
              {/* You can display the image, PDF iframe, or feedback here */}
              <img src={imageUrl} alt="Resume Preview" className="w-full h-full object-contain rounded 2xl" title="resume" />
              <p className="mt-4 text-sm text-gray-700">{feedback}</p>
            </div>
          )}
        </section>
        <section className='feedback-section '>
            <h2 className='text-4xl text-black font-bold'>Resume Review</h2>
            {feedback ? (
                <div className='flex flex-col gap-8 animate-in fade-in duration-1000'>
                        Summary ATS Details
                        <Summary feedback={feedback} />
                        <ATS score={feedback.ATS.score || 0 } suggestions={feedback.ATS.tips || 0}   />
                        <Details feedback={feedback} />

                </div>
            ):(
                <img src="/images/resume-scan-2.gif" className='w-full'/>
            )}

        </section>
      </div>
    </main>
  );
};

export default Resume;
