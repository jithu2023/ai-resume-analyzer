// home.tsx
import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import ResumeCard from "../components/resumeCard";
import { usePuterStore } from '~/lib/puter';
import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { isLoading, auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes: Resume[] = resumes?.map((resume) =>(
        JSON.parse(resume.value) as Resume
       ) );
      console.log("parsedResumes", parsedResumes);
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track your Application and Resume Ratings</h1>
          {!loadingResumes && resumes.length === 0? (
            <h2>No resumes found. upload your first resume to get feedback.</h2>

          ):(
            <h2>Review your submissions and check AI-powered feedback.</h2>

          )}
        </div>

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col item-center justify-center mt-10 gap-4">
            <Link to="/upload" className=" primary-button w-fit text-xl font-semibold">Upload your first resume</Link>
          </div>
        )}
      </section>
    </main>
  );
}