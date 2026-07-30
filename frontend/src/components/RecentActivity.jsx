import { useEffect, useState } from "react";
import { getRecentActivity } from "../api/dashboard";


function RecentActivity(){

const [activities,setActivities] = useState([]);


useEffect(()=>{

    async function loadActivity(){

        try{

            const data = await getRecentActivity();
            setActivities(data);

        }catch(error){

            console.error(error);

        }

    }


    loadActivity();

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
Recent Activity
</h2>


<div className="space-y-5">


{
activities.length > 0 ?

activities.map((item,index)=>(

<div key={index}>

<h3 className="font-medium text-slate-900">
{item.repository} analyzed
</h3>


<p className="text-slate-500 text-sm">
{item.message}
</p>


<p className="text-xs text-slate-400 mt-1">
{
new Date(item.created_at)
.toLocaleString()
}
</p>


</div>


))

:

<p className="text-slate-500">
No activity yet.
</p>

}


</div>


</div>

)

}


export default RecentActivity;