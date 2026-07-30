

function Dashboard(){


    
return (

<div className="p-10">


<h1 className="
text-3xl
font-bold
text-[#0F172A]
">
Welcome back, Sreelakshmi...
</h1>


<p className="
mt-2
text-[#64748B]
">
Analyze repositories, detect bugs and get AI-powered code insights.
</p>



<div className="
grid
grid-cols-3
gap-6
mt-10
">


<div className="
bg-white
rounded-2xl
p-6
border
border-[#E2E8F0]
">

<p className="text-[#64748B]">
Repositories
</p>

<h2 className="
text-3xl
font-bold
mt-3
text-[#0F766E]
">
12
</h2>

</div>



<div className="
bg-white
rounded-2xl
p-6
border
border-[#E2E8F0]
">

<p className="text-[#64748B]">
AI Reviews
</p>

<h2 className="
text-3xl
font-bold
mt-3
text-[#D4AF37]
">
48
</h2>

</div>



<div className="
bg-white
rounded-2xl
p-6
border
border-[#E2E8F0]
">

<p className="text-[#64748B]">
Issues Found
</p>

<h2 className="
text-3xl
font-bold
mt-3
text-red-500
">
127
</h2>

</div>


</div>


</div>

)

}


export default Dashboard;