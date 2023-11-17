import React, { useState } from "react";
import { useChatGPT } from "../hooks/ApiHooks";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { FormValues } from "../utils/Prompts";
import { PromptFunctions } from "../utils/PromptFunctions";
import AlertDialog from "../components/AlertDialog";

const AdvancedHome = () => {
  const { createWebPage, progressCount, errorCount } = PromptFunctions();
  const { loading } = useChatGPT();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);
  const [building, setBuilding] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<FormValues>({
    cssLibrary: "tailwind",
    colors: "blue",
    mapAddress: "Karaportti 2",
    mapCity: "Espoo",
    additionalInfo: "",
  });

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("formValues", formValues);

    try {
      await createWebPage(formValues);
    } catch (error) {
      console.log("error: ", error);
      setError((error as Error).message);
      setShowAlertDialog(true);
    } finally {
      navigate("/advancedresult", { state: { formValues } });
    }
  };

  // Toggle alert dialog on and off
  const handleToggleDialog = () => {
    setShowAlertDialog((prev) => !prev);
  };

  return (
    <>
      {showAlertDialog && <AlertDialog content={error} onClose={handleToggleDialog} />}
      <article className='w-full flex items-center justify-center'>
        <section className='flex flex-col w-[35rem] bg-white rounded-md shadow-lg'>
          <div id='header'>
            <figure className='bg-gray-200 h-36 rounded-t-md'>
              <img src='' alt='headerImg' />
            </figure>
          </div>
          <section className='flex flex-col'>
            <div className='flex items-center px-4 py-8'>
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
                  fill='white'
                  className='animate-pulse'
                />
                <circle
                  cx='15.5'
                  cy='6.5'
                  r='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  fill='white'
                  className='animate-pulse'
                />
              </svg>
              <div className='ml-4 flex items-center'>
                <span className='text-lg pr-4'>:</span>
                <span className='bg-gray-200 p-3 rounded-md shrink'>
                  Hello! How can I assist you in building your dream webpage today?
                </span>
              </div>
            </div>
            <form className='bg-gray-200 p-4 rounded-b-md' onSubmit={handleForm}>
              <label className='relative'>
                {" "}
                Information about the website
                <input
                  id='topic'
                  type='text'
                  placeholder='Give me a topic for website ...'
                  value={formValues.additionalInfo}
                  onChange={(event) => setFormValues({ ...formValues, additionalInfo: event.target.value })}
                  className='rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full'
                />
              </label>
              <label className='relative'>
                {" "}
                Map Adress
                <input
                  id='mapAdress'
                  type='text'
                  placeholder='Give me table section details ...'
                  value={formValues.mapAddress}
                  onChange={(event) =>
                    setFormValues({
                      ...formValues,
                      mapAddress: event.target.value,
                    })
                  }
                  className='rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full'
                />
              </label>
              <label className='relative'>
                {" "}
                Map City
                <input
                  id='mapCity'
                  type='text'
                  placeholder='Give me table section details ...'
                  value={formValues.mapCity}
                  onChange={(event) =>
                    setFormValues({
                      ...formValues,
                      mapCity: event.target.value,
                    })
                  }
                  className='rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full'
                />
              </label>
              <div className='flex py-4 md:flex-row flex-col items-stretch md:items-center'>
                <div>
                  <label className='flex flex-row pb-2'>
                    <span className='pr-2 font-bold'>CSS:</span>
                    <select
                      id='userPromptCSS'
                      className='w-full rounded-md bg-white pl-1'
                      onChange={(event) =>
                        setFormValues({
                          ...formValues,
                          cssLibrary: event.target.value,
                        })
                      }
                    >
                      <option value='Tailwind'>Tailwind</option>
                      <option value='Bootstrap'>Bootstrap</option>
                      <option value='Materialize'>Materialize</option>
                      <option value='Bulma'>Bulma</option>
                      <option value='Foundation'>Foundation</option>
                      <option value='Vanilla'>Vanilla</option>
                    </select>
                  </label>
                  <label className='flex flex-row items-center'>
                    <span className='pr-2 font-bold'>Primary color:</span>
                    <input
                      type='color'
                      id='userPromptColor'
                      className='grow'
                      onChange={(event) =>
                        setFormValues({
                          ...formValues,
                          colors: event.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <label className='grow pt-4 md:pl-4 md:pt-0'>
                  <input
                    type='submit'
                    className='rounded-md bg-black text-white p-3 w-full hover:bg-white hover:text-black hover:border-2 hover:border-black font-bold'
                    value='BUILD!'
                    onClick={() => setBuilding(true)}
                  />
                </label>
              </div>
              {building && (
                <div className='flex items-center gap-2'>
                  <span className='relative flex h-3 w-3'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                  </span>
                  <p className='font-bold'>
                    Building... {progressCount} Failed fetches: {errorCount}
                  </p>
                </div>
              )}
            </form>
          </section>
        </section>
        {loading && <Loader />}
      </article>
    </>
  );
};

export default AdvancedHome;
