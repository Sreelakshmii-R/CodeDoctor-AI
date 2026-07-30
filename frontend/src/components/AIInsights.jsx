import { useEffect, useState } from "react";
import { getAIInsights } from "../api/dashboard";


function AIInsights(){

const [insights,setInsights] = useState([]);


useEffect(()=>{

    async function loadInsights(){

        try{

            const data = await getAIInsights();
            setInsights(data);

        }catch(error){

            console.error(error);

        }

    }


    loadInsights();

},[]);



return (

<div
className="
bg-white
border
border-slate-200
rounded-2xl
p-6
"
>

<h2 className="text-xl font-semibold mb-5">
AI Insights
</h2>


<div className="space-y-4">


{
insights.length > 0 ?

insights.map((item,index)=>(

<div
key={index}
className="
text-slate-700
"
>
🤖 {item.message}
</div>

))

:

<p className="text-slate-500">
No insights available yet.
</p>

}


</div>


</div>

)

}


export default AIInsights;