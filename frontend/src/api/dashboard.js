const API_URL = "http://localhost:8000";


export async function getDashboardStats(){

    const response = await fetch(
        `${API_URL}/dashboard/stats`
    );


    if(!response.ok){
        throw new Error("Failed to fetch dashboard stats");
    }


    return response.json();

}



export async function getRecentActivity(){

    const response = await fetch(
        `${API_URL}/dashboard/activity`
    );


    if(!response.ok){
        throw new Error("Failed to fetch activity");
    }


    return response.json();

}


export async function getAIInsights(){

    const response = await fetch(
        `${API_URL}/dashboard/insights`
    );


    if(!response.ok){
        throw new Error("Failed to fetch insights");
    }


    return response.json();

}