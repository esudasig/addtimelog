import fetch from "node-fetch";

const scope = "ZohoProjects.portals.READ,ZohoProjects.projects.ALL,ZohoProjects.tasks.ALL,ZohoProjects.timesheets.ALL";
const grant_token = "1000.6a8228bc79e72d9fb3c622a4e2c74c5b.89b011bf616b18d84aa99816216cf10f";
const client_id = "1000.1MCPSFT6SRB1L7OUP6SW6LNXLXX5BH";
const client_secret = "aec94409471e6134bb7d7551af377451202b1e8899";
const redirect_uri = "https://localhost:4343/";


// INTIAL PART TO GET GRANT TOKEN
// How can I access the redirect url?

// fetch(`https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&access_type=offline`)
//     .then(response => {
//         if(response.redirected)
//             console.log(response.url);
//     });

//Fetch Tree will be in addTimeLog method, only here for testing purposes

//Finds the first portal, project, task
fetch(`https://accounts.zoho.com/oauth/v2/token?code=${grant_token}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&grant_type=authorization_code`, {method : "POST"})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const access_token = data.access_token;
        fetch("https://projectsapi.zoho.com/restapi/portals/", {
            method : "GET",
            headers : {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const portal_id = data.portals[0].id;
                console.log(`Portal ID:${portal_id}`);
                fetch(`https://projectsapi.zoho.com/restapi/portal/${portal_id}/projects/`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        const project_id = data.projects[0].id_string;
                        console.log(`Project ID:${project_id}`);
                        fetch(`https://projectsapi.zoho.com/restapi/portal/${portal_id}/projects/${project_id}/tasks/`, {
                            method: "GET",
                            headers: {
                                'Authorization': `Bearer ${access_token}`
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                const task_id = data.tasks[0].id;
                                console.log(`Task ID:${task_id}`);
                            })
                    })
            });
    });

export const addTimelog = (req, res) => {
    const date = new Date();

    const month = date.getMonth();
    const day = date.getDate(); 
    const year = date.getFullYear();

    // -- Get these from ZOHO API? Get these from req.body?
    // const portal_id = req.body.portalID;
    // const project_id = req.body.projectID;
    // const task_id = req.body.taskID;
    const owner_id = req.body.ownerID;
    const timelog = req.body.timelog; //{HH-MM}

    console.log(`${month+1}-${day}-${year}`);
    // -- GET THESE FROM ZOHO API --
    // console.log(`${portal_id}`);
    // console.log(`${project_id}`);
    // console.log(`${task_id}`);
    console.log(`${owner_id}`);
    console.log(`${timelog}`);

    res.send(`Added timelog`);
}

// Add Time Log for a Task
// POST  /portal/[PORTALID]/projects/[PROJECTID]/tasks/[TASKID]/logs/


