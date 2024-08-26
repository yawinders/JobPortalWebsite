export const jobs = [
    {
        id: 1,
        company: 'Coding Ninjas',
        role: 'SDE',
        location: 'gurgao HR IND Remote',
        salary: '®️14-20lpa',
        skills: ['REACT', 'NODEjs', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
        applicants: 0,
    },
    {
        id: 2,
        company: 'Go Digit',
        role: 'Angular Developer',
        location: 'Pune IND On-Site',
        salary: '®️6-10lpa',
        skills: ['Angular', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
        applicants: 0,
    },
    {
        id: 3,
        company: 'Juspay',
        role: 'SDE',
        location: 'Banglore IND',
        salary: '®️20-26lpa',
        skills: ['REACT', 'NODEjs', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
        applicants: 0,
    }
]

export function findComp(id) {
    // console.log(id);
    return jobs.find((job) => job.id === Number(id));
}
const recruiters = [];
export function addRecruiter(obj) {
    recruiters.push(obj);
    console.log(recruiters);
    return true;
}

export function recruiterAuthentication(detail) {
    let ans = false;
    recruiters.forEach((recruiter) => {
        if (recruiter.email == detail.email && recruiter.password == detail.password) { ans = recruiter }
    })
    return ans;
}

export function deleteJob(id) {
    const index = jobs.findIndex((job) => job.id === Number(id));

    if (index !== -1) {
        jobs.splice(index, 1);
    }

    return jobs;
}

export function addJobPost(newJobPost) {
    let id = jobs.length + 1;
    let applicants = 0;
    console.log(newJobPost);
    let { company, role, location, salary, skills } = newJobPost
    skills = skills.split(' ');

    let newJob = { id, ...{ company, role, location, salary, skills }, applicants };
    jobs.push(newJob);
    // console.log(jobs);
}


export const candidates = [];
export function storeApplicant(formData, resume, id) {

    let obj = { id, ...formData, resume };
    candidates.push(obj);
    // console.log(candidates);
}

export function editJobPost(updatedData, idd) {

    const post = jobs.find((obj) => obj.id === Number(idd));
    console.log(post);
    let combinedData = {};
    Object.keys(post).forEach(key => {
        // If the updated data has a non-empty value, use it, otherwise use the previous value
        combinedData[key] = updatedData[key] !== '' ? updatedData[key] : post[key];
    });
    combinedData = { id: post.id, ...combinedData, applicants: post.applicants };
    console.log(combinedData);
    return combinedData;
}