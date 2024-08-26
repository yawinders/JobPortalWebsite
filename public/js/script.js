import { jobs } from "../../src/modals/user.modal.js";

export function filterSearch() {
    const input = document.getElementById('srch-inp').value;
    return jobs.filter((job) => job.name === input);
}