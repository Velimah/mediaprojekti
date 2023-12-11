import React, { useState } from "react";
import { useChatGPT } from "../hooks/ApiHooks";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { FormValues } from "../utils/Prompts";
import { PromptFunctions } from "../utils/PromptFunctions";
import AlertDialog from "../components/AlertDialog";

const AdvancedHome = () => {
  const { createWebPageTemplate } = PromptFunctions();
  const { loading, setLoading } = useChatGPT();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<FormValues>({
    cssLibrary: "tailwind",
    colors: "#6e9b43",
    mapAddress: "",
    mapCity: "",
    additionalInfo: "",
    imageSrc: "",
    name: "",
  });

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    /* TODO: fix so it doesn't navigate to result page if error occurs */
    try {
      setLoading(true);
      await createWebPageTemplate(formValues);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
      setError((error as Error).message);
      setShowAlertDialog(true);
    } finally {
      navigate("/advancedresult", { state: { formValues } });
    }
  };

  return (
    <>
      {showAlertDialog && <AlertDialog content={error} onClose={() => setShowAlertDialog((prev) => !prev)} />}
      <article className='w-full h-auto md:h-[calc(100vh-11rem)] flex items-center justify-center md:py-4'>
        <section className='overflow-hidden flex flex-col w-[35rem] rounded-md shadow-3xl'>
          <div id='header' className='animate-slide-left relative'>
            <figure className='bg-gray-200 h-36 rounded-t-md overflow-hidden'>
              <img src={"ai-header.png"} alt='headerImg' className='grayscale' />
            </figure>
          </div>
          <section className='flex flex-col'>
            <div className='animate-slide-right relative'>
              <div className='flex items-center px-4 py-8 text-white bg-ai-black-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-[70px] shrink-0 hover:animate-bounce'
                >
                  <rect
                    x='5'
                    y='2'
                    width='14'
                    height='9'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    fill='currentColor'
                  />
                  <rect
                    x='3'
                    y='11'
                    width='18'
                    height='9'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    fill='currentColor'
                  />
                  <rect
                    x='5'
                    y='21'
                    width='4'
                    height='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    fill='currentColor'
                  />
                  <rect
                    x='15'
                    y='21'
                    width='4'
                    height='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    fill='currentColor'
                  />
                  <circle
                    cx='8.5'
                    cy='6.5'
                    r='2.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    fill='#161616'
                    className='animate-pulse'
                  />
                  <circle
                    cx='15.5'
                    cy='6.5'
                    r='2.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    fill='#161616'
                    className='animate-pulse'
                  />
                </svg>
                <div className='ml-4 flex items-center text-ai-primary'>
                  <span className='text-lg pr-4'>:</span>
                  <span className='bg-ai-black p-3 rounded-md shrink font-robot'>
                    Hello! How can I assist you in building your dream webpage today?
                  </span>
                </div>
              </div>
            </div>
            <div className='bg-ai-black-100 p-4 rounded-b-md relative animate-slide-down'>
              <form onSubmit={handleForm} className='text-white'>
                <label className='relative'>
                  <input
                    id='additionalInfo'
                    type='text'
                    placeholder='Give me a topic for website ...'
                    value={formValues.additionalInfo}
                    onChange={(event) => setFormValues({ ...formValues, additionalInfo: event.target.value })}
                    className='rounded-md border-ai-black text-ai-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-ai-primary focus:ring-ai-primary focus:ring-2 w-full'
                  />
                  <span className='absolute left-0 top-0 px-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='nonabsolutee'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                      />
                    </svg>
                  </span>
                </label>
                <div className='flex py-4 md:flex-row flex-col items-stretch md:items-center'>
                  <div>
                    <label className='flex flex-row'>
                      <span className='pr-2 font-bold'>CSS:</span>
                      <select
                        id='userPromptCSS'
                        defaultValue={formValues.cssLibrary}
                        className='w-full rounded-md bg-white pl-1 cursor-pointer text-ai-black'
                        onChange={(event) =>
                          setFormValues({
                            ...formValues,
                            cssLibrary: event.target.value,
                          })
                        }
                      >
                        <option value='Tailwind'>Tailwind</option>
                        <option value='Bootstrap'>Bootstrap</option>
                        <option value='Vanilla'>Vanilla/Default</option>
                        <option value='Materialize'>Materialize</option>
                        <option value='Bulma'>Bulma</option>
                        <option value='Foundation'>Foundation</option>
                      </select>
                    </label>
                    {/* 
                    <label className='flex flex-row items-center'>
                      <span className='pr-2 font-bold'>Primary color:</span>
                      <input
                        type='color'
                        id='userPromptColor'
                        className='grow cursor-pointer bg-transparent'
                        defaultValue={formValues.colors}
                        onChange={(event) =>
                          setFormValues({
                            ...formValues,
                            colors: event.target.value,
                          })
                        }
                      />
                    </label>
                    */}
                  </div>
                  <label className='grow pt-4 md:pl-4 md:pt-0'>
                    <input type='submit' className='primary-btn' value='CREATE TEMPLATE' />
                  </label>
                </div>
              </form>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className='rounded-md p-1 w-full hover:bg-black text-white border-2 border-transparent font-bold cursor-pointer'
              >
                <span className='flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-8 h-8 pr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5'
                    />
                  </svg>
                  Switch to Basic
                </span>
              </button>
            </div>
          </section>
        </section>
        {loading && <Loader />}
      </article>
    </>
  );
};

export default AdvancedHome;
