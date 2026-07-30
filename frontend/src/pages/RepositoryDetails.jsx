import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;


function RepositoryDetails(){

    const { id } = useParams();
    const navigate = useNavigate();

    const [repo,setRepo] = useState(null);
    const [analysis,setAnalysis] = useState(null);
    const [score,setScore] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(()=>{

        async function loadData(){

            try{

                const repoResponse = await fetch(
                    `${API_URL}/repositories/${id}`
                );

                const repoData = await repoResponse.json();

                setRepo(repoData);



                const analysisResponse = await fetch(
                    `${API_URL}/repositories/${id}/latest-analysis`
                );


                if(analysisResponse.ok){

                    const analysisData =
                    await analysisResponse.json();

                    setAnalysis(analysisData);


                    const scoreMatch = analysisData.report.match(
                        /score of (\d+) out of 100/i
                    );

                    if(scoreMatch){
                        setScore(scoreMatch[1]);
                    }

                }


            }catch(error){

                console.log(error);

            }

        }


        loadData();

    },[id]);



    async function handleAnalyze(){

    try{

        setAnalyzing(true);


        const response = await fetch(
            `${API_URL}/repositories/${id}/analyze`,
            {
                method:"POST"
            }
        );


        if(!response.ok){
            throw new Error("Analysis failed");
        }


        const data = await response.json();

        console.log(data);


        alert("Repository analyzed successfully!");

        // reload latest analysis
        window.location.reload();


    }catch(error){

        console.error(error);

        alert("Analysis failed");

    }
    finally{

        setAnalyzing(false);

    }

}

        const issuesCount = analysis?.report.match(
        /SQL Injection|XSS|CSRF|IDOR|Vulnerabilit(y|ies)/gi
        )?.length || 0;

    if(!repo){

        return (
            <div className="p-10">
                Loading repository...
            </div>
        )

    }



    return (

        <div className="max-w-7xl mx-auto px-10 py-8">


            <div className="flex items-center gap-4">


                

    <button
        onClick={() => navigate("/repositories")}
        className="
            px-4
            py-2
            rounded-lg
            border
            border-slate-200
            text-slate-700
            hover:bg-slate-50
            transition
        "
    >
        ← Back
    </button>


    <div>
        <h1 className="text-3xl font-bold text-slate-900">
            {repo.name}
        </h1>

        <p className="text-slate-500 mt-2">
            {repo.language}
        </p>
    </div>

    <button
    onClick={handleAnalyze}
    disabled={analyzing}
    className="
        ml-auto
        px-5
        py-2.5
        rounded-xl
        bg-[#0F766E]
        text-white
        hover:bg-[#115E59]
        transition
    "
>
{
    analyzing 
    ? "Analyzing..."
    : "Run New Analysis"
}

</button>

</div>


           



            <div className="
                grid
                grid-cols-3
                gap-6
                mt-8
            ">


                <div className="
                    bg-white
                    border
                    rounded-2xl
                    p-6
                ">

                    <p className="text-slate-500">
                        Repository Status
                    </p>

                    <h2 className="text-2xl font-bold mt-2">
                        Healthy
                    </h2>

                </div>



                <div className="
                    bg-white
                    border
                    rounded-2xl
                    p-6
                ">

                    <p className="text-slate-500">
                        Security Score
                    </p>

                    <h2 className="text-2xl font-bold mt-2">
                        {score ?? "..."}%
                    </h2>

                </div>



                <div className="
                    bg-white
                    border
                    rounded-2xl
                    p-6
                ">

                    <p className="text-slate-500">
                        Issues Found
                    </p>

                    <h2 className="text-2xl font-bold mt-2">
                        {issuesCount}
                    </h2>

                </div>


            </div>



            <div
  className="
    bg-white
    border
    rounded-2xl
    p-6
    mt-8
    overflow-hidden
  "
>

  <h2 className="text-xl font-semibold">
    Latest AI Review
  </h2>


  {
    analysis ? (

      <div
        className="
          mt-6
          prose
          max-w-none
          text-slate-700
          break-words
        "
      >

        <ReactMarkdown
  components={{
    h1: ({children}) => (
      <h1 className="
        text-2xl
        font-bold
        text-slate-900
        mt-8
        mb-4
      ">
        {children}
      </h1>
    ),

    h2: ({children}) => (
      <h2 className="
        text-xl
        font-semibold
        text-slate-900
        mt-8
        mb-3
      ">
        {children}
      </h2>
    ),

    p: ({children}) => (
      <p className="
        text-slate-600
        leading-7
        mb-4
      ">
        {children}
      </p>
    ),

    li: ({children}) => (
      <li className="
        text-slate-600
        mb-2
        ml-5
      ">
        {children}
      </li>
    ),

    ul: ({children}) => (
      <ul className="
        list-disc
        mb-6
      ">
        {children}
      </ul>
    ),

    ol: ({children}) => (
      <ol className="
        list-decimal
        mb-6
      ">
        {children}
      </ol>
    )
  }}
>
  {analysis.report}
</ReactMarkdown>

      </div>

    )

    :

    (

      <p className="text-slate-500 mt-4">
        No analysis available yet.
      </p>

    )

  }


</div>



        </div>

    )

}


export default RepositoryDetails;